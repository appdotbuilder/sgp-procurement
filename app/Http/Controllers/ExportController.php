<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ProcurementExportService;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    /**
     * Export procurement requests data.
     */
    public function index(Request $request, ProcurementExportService $exportService)
    {
        // Only super admin can export
        if (!auth()->user()->isSuperAdmin()) {
            abort(403, 'Unauthorized action.');
        }
        
        $data = $exportService->getExportData($request);
        
        return response()->json($data);
    }
}