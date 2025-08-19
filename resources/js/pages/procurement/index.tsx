import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/app-shell';

interface ProcurementRequest {
    id: number;
    tanggal_permintaan: string;
    nama_venue: string;
    nama_barang: string;
    jumlah_barang: number;
    sisa_barang?: string;
    penggunaan: string;
    pic_penerima: string;
    link_barang?: string;
    note?: string;
    keterangan?: string;
    status: 'Tertunda' | 'Disetujui' | 'Ditolak' | 'Terkirim';
    created_at: string;
    user: {
        name: string;
        venue_name: string;
    };
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
            venue_name?: string;
        };
    };
    requests: {
        data: ProcurementRequest[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            links: Array<{
                url: string | null;
                label: string;
                active: boolean;
            }>;
            total: number;
            per_page: number;
            current_page: number;
        };
    };
    venues: string[];
    statusOptions: Record<string, string>;
    filters: {
        venue?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function ProcurementIndex({ auth, requests, venues, statusOptions, filters }: Props) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            'Tertunda': 'outline',
            'Disetujui': 'default',
            'Ditolak': 'destructive',
            'Terkirim': 'secondary'
        };
        
        const colors: Record<string, string> = {
            'Tertunda': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
            'Disetujui': 'bg-green-100 text-green-800 hover:bg-green-200',
            'Ditolak': 'bg-red-100 text-red-800 hover:bg-red-200',
            'Terkirim': 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };

        return (
            <Badge variant={variants[status]} className={colors[status]}>
                {status}
            </Badge>
        );
    };

    const handleFilter = (key: string, value: string) => {
        router.get('/procurement', {
            ...filters,
            [key]: value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleStatusChange = (requestId: number, newStatus: string) => {
        router.post(`/procurement/${requestId}/status`, {
            status: newStatus
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <AppShell>
            <Head title="Daftar Pengajuan - Pengadaan Barang SGP GROUP" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            📋 Daftar Pengajuan
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {auth.user.role === 'super_admin' 
                                ? 'Kelola semua pengajuan dari seluruh venue'
                                : 'Pengajuan pengadaan barang Anda'
                            }
                        </p>
                    </div>
                    <Link href="/procurement/create">
                        <Button size="lg" className="flex items-center gap-2">
                            <span>➕</span> Buat Pengajuan
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="mb-6 border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🔍 Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            {auth.user.role === 'super_admin' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue
                                    </label>
                                    <Select 
                                        value={filters.venue || ''} 
                                        onValueChange={(value) => handleFilter('venue', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua Venue" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Venue</SelectItem>
                                            {venues.map((venue) => (
                                                <SelectItem key={venue} value={venue}>
                                                    {venue}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <Select 
                                    value={filters.status || ''} 
                                    onValueChange={(value) => handleFilter('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Status</SelectItem>
                                        {Object.entries(statusOptions).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {auth.user.role === 'super_admin' && (
                                <div className="flex items-end">
                                    <Link href={route('export.procurement')} className="w-full">
                                        <Button variant="outline" className="w-full flex items-center gap-2">
                                            📊 Export Excel
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-4">
                    {requests.data.length === 0 ? (
                        <Card className="border-0 shadow-lg">
                            <CardContent className="text-center py-12">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Belum Ada Pengajuan
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {auth.user.role === 'super_admin' 
                                        ? 'Belum ada pengajuan dari venue mana pun.'
                                        : 'Anda belum membuat pengajuan pengadaan barang.'
                                    }
                                </p>
                                <Link href="/procurement/create">
                                    <Button>
                                        Buat Pengajuan Pertama
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        requests.data.map((request) => (
                            <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {request.nama_barang}
                                                </h3>
                                                {getStatusBadge(request.status)}
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">🏢 Venue:</span> {request.nama_venue}
                                                </div>
                                                <div>
                                                    <span className="font-medium">📦 Jumlah:</span> {request.jumlah_barang}
                                                </div>
                                                <div>
                                                    <span className="font-medium">👤 PIC:</span> {request.pic_penerima}
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <span className="font-medium">📅 Tanggal Permintaan:</span> {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID')}
                                            </div>
                                            {request.penggunaan && (
                                                <div className="mt-2 text-sm text-gray-600">
                                                    <span className="font-medium">🎯 Penggunaan:</span> {request.penggunaan}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2 ml-4">
                                            {/* Status Change for Admin */}
                                            {auth.user.role === 'super_admin' && (
                                                <Select 
                                                    value={request.status} 
                                                    onValueChange={(value) => handleStatusChange(request.id, value)}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(statusOptions).map(([key, label]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            
                                            <Link href={`/procurement/${request.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination would go here */}
                {requests.meta.links && requests.meta.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-2">
                            {requests.meta.links.map((link, index: number) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}