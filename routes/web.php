<?php

use App\Http\Controllers\ExportController;
use App\Http\Controllers\ProcurementController;
use App\Http\Controllers\ProcurementStatusController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Procurement routes
    Route::resource('procurement', ProcurementController::class)->names('procurement');
    Route::post('procurement/{procurementRequest}/status', [ProcurementStatusController::class, 'store'])->name('procurement.status');
    Route::get('export/procurement', [ExportController::class, 'index'])->name('export.procurement');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
