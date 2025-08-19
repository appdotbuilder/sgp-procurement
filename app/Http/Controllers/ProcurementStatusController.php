<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ProcurementRequest;
use Illuminate\Http\Request;

class ProcurementStatusController extends Controller
{
    /**
     * Update status of a procurement request.
     */
    public function store(Request $request, ProcurementRequest $procurementRequest)
    {
        $request->validate([
            'status' => 'required|in:Tertunda,Disetujui,Ditolak,Terkirim'
        ]);
        
        $procurementRequest->update([
            'status' => $request->status
        ]);
        
        return back()->with('success', 'Status berhasil diperbarui.');
    }
}