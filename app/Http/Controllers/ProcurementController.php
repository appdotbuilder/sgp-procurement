<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProcurementRequestRequest;
use App\Http\Requests\UpdateProcurementRequestRequest;
use App\Models\ProcurementRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ProcurementExportService;

class ProcurementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $query = ProcurementRequest::with('user')->latest();
        
        // If venue user, only show their own requests
        if ($user->isVenueUser()) {
            $query->where('user_id', $user->id);
        }
        
        // Apply filters
        if ($request->has('venue') && $request->venue) {
            $query->forVenue($request->venue);
        }
        
        if ($request->has('status') && $request->status) {
            $query->withStatus($request->status);
        }
        
        $requests = $query->paginate(10);
        
        $venues = [
            'Patrajasa',
            'Slipi',
            'Brin Gatsu',
            'Lippo',
            'Brin Thamrin',
            'Dharmagati',
            'Seskoad',
            'Samisara',
            'Bripens',
            'Paramita'
        ];
        
        return Inertia::render('procurement/index', [
            'requests' => $requests,
            'venues' => $venues,
            'statusOptions' => ProcurementRequest::getStatusOptions(),
            'filters' => $request->only(['venue', 'status']),
            'user' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        
        $venues = [
            'Patrajasa',
            'Slipi',
            'Brin Gatsu',
            'Lippo',
            'Brin Thamrin',
            'Dharmagati',
            'Seskoad',
            'Samisara',
            'Bripens',
            'Paramita'
        ];
        
        return Inertia::render('procurement/create', [
            'venues' => $venues,
            'statusOptions' => ProcurementRequest::getStatusOptions(),
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcurementRequestRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        
        $procurementRequest = ProcurementRequest::create($data);

        return Inertia::render('procurement/create', [
            'venues' => [
                'Patrajasa',
                'Slipi',
                'Brin Gatsu',
                'Lippo',
                'Brin Thamrin',
                'Dharmagati',
                'Seskoad',
                'Samisara',
                'Bripens',
                'Paramita'
            ],
            'statusOptions' => ProcurementRequest::getStatusOptions(),
            'user' => auth()->user(),
            'flash' => [
                'success' => 'Pengajuan berhasil dikirim!'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProcurementRequest $procurementRequest)
    {
        // Check if user can view this request
        $user = auth()->user();
        if ($user->isVenueUser() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }
        
        $procurementRequest->load('user');
        
        return Inertia::render('procurement/show', [
            'request' => $procurementRequest,
            'statusOptions' => ProcurementRequest::getStatusOptions(),
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProcurementRequest $procurementRequest)
    {
        // Check if user can edit this request
        $user = auth()->user();
        if ($user->isVenueUser() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }
        
        $venues = [
            'Patrajasa',
            'Slipi',
            'Brin Gatsu',
            'Lippo',
            'Brin Thamrin',
            'Dharmagati',
            'Seskoad',
            'Samisara',
            'Bripens',
            'Paramita'
        ];
        
        return Inertia::render('procurement/edit', [
            'request' => $procurementRequest,
            'venues' => $venues,
            'statusOptions' => ProcurementRequest::getStatusOptions(),
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProcurementRequestRequest $request, ProcurementRequest $procurementRequest)
    {
        // Check if user can update this request
        $user = auth()->user();
        if ($user->isVenueUser() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }
        
        $procurementRequest->update($request->validated());

        return redirect()->route('procurement.show', $procurementRequest)
            ->with('success', 'Pengajuan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProcurementRequest $procurementRequest)
    {
        // Check if user can delete this request
        $user = auth()->user();
        if ($user->isVenueUser() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }
        
        $procurementRequest->delete();

        return redirect()->route('procurement.index')
            ->with('success', 'Pengajuan berhasil dihapus.');
    }


}