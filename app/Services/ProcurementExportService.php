<?php

namespace App\Services;

use App\Models\ProcurementRequest;
use Illuminate\Http\Request;

class ProcurementExportService
{
    /**
     * Get procurement requests data for export.
     */
    public function getExportData(Request $request): array
    {
        $query = ProcurementRequest::with('user')->latest();
        
        // Apply filters
        if ($request->has('venue') && $request->venue) {
            $query->forVenue($request->venue);
        }
        
        if ($request->has('status') && $request->status) {
            $query->withStatus($request->status);
        }
        
        $requests = $query->get();
        
        $data = [
            'headers' => [
                'ID',
                'Tanggal Permintaan',
                'Nama Venue',
                'Nama Barang',
                'Jumlah Barang',
                'Sisa Barang',
                'Penggunaan',
                'PIC Penerima',
                'Link Barang',
                'Note',
                'Keterangan',
                'Status',
                'Dibuat Oleh',
                'Tanggal Dibuat',
                'Terakhir Diperbarui'
            ],
            'rows' => []
        ];
        
        foreach ($requests as $procurementRequest) {
            $data['rows'][] = [
                $procurementRequest->id,
                $procurementRequest->tanggal_permintaan->format('d/m/Y'),
                $procurementRequest->nama_venue,
                $procurementRequest->nama_barang,
                $procurementRequest->jumlah_barang,
                $procurementRequest->sisa_barang ?? '',
                $procurementRequest->penggunaan,
                $procurementRequest->pic_penerima,
                $procurementRequest->link_barang ?? '',
                $procurementRequest->note ?? '',
                $procurementRequest->keterangan ?? '',
                $procurementRequest->status,
                $procurementRequest->user->name,
                $procurementRequest->created_at->format('d/m/Y H:i'),
                $procurementRequest->updated_at->format('d/m/Y H:i'),
            ];
        }
        
        return $data;
    }
}