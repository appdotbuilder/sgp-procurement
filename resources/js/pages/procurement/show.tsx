import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    updated_at: string;
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
    request: ProcurementRequest;
    statusOptions: Record<string, string>;
    [key: string]: unknown;
}

export default function ProcurementShow({ auth, request, statusOptions }: Props) {
    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            'Tertunda': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
            'Disetujui': 'bg-green-100 text-green-800 hover:bg-green-200',
            'Ditolak': 'bg-red-100 text-red-800 hover:bg-red-200',
            'Terkirim': 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };

        return (
            <Badge className={colors[status]}>
                {status}
            </Badge>
        );
    };

    const handleStatusChange = (newStatus: string) => {
        router.post(`/procurement/${request.id}/status`, {
            status: newStatus
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus pengajuan ini?')) {
            router.delete(`/procurement/${request.id}`);
        }
    };

    return (
        <AppShell>
            <Head title={`Detail Pengajuan - ${request.nama_barang}`} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            📋 Detail Pengajuan
                        </h1>
                        <p className="text-gray-600 mt-2">
                            ID: #{request.id} • {request.nama_barang}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {getStatusBadge(request.status)}
                        {auth.user.role === 'super_admin' && (
                            <Select 
                                value={request.status} 
                                onValueChange={handleStatusChange}
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
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ℹ️ Informasi Dasar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Permintaan
                                    </label>
                                    <p className="text-gray-900">
                                        {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Venue
                                    </label>
                                    <p className="text-gray-900">{request.nama_venue}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Barang
                                    </label>
                                    <p className="text-gray-900 font-semibold">{request.nama_barang}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jumlah Barang
                                    </label>
                                    <p className="text-gray-900">{request.jumlah_barang}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        PIC Penerima
                                    </label>
                                    <p className="text-gray-900">{request.pic_penerima}</p>
                                </div>
                                {request.sisa_barang && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sisa Barang
                                        </label>
                                        <p className="text-gray-900">{request.sisa_barang}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📝 Detail Pengajuan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Penggunaan
                                    </label>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-900">{request.penggunaan}</p>
                                    </div>
                                </div>
                                
                                {request.link_barang && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Link Barang
                                        </label>
                                        <a 
                                            href={request.link_barang} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline break-all"
                                        >
                                            {request.link_barang}
                                        </a>
                                    </div>
                                )}
                                
                                {request.note && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Note
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-900">{request.note}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {request.keterangan && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Keterangan
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-900">{request.keterangan}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Actions */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ⚡ Aksi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/procurement" className="block">
                                    <Button variant="outline" className="w-full">
                                        ← Kembali ke Daftar
                                    </Button>
                                </Link>
                                
                                {(auth.user.role === 'super_admin' || request.user.venue_name === auth.user.venue_name) && (
                                    <>
                                        <Link href={`/procurement/${request.id}/edit`} className="block">
                                            <Button variant="default" className="w-full">
                                                ✏️ Edit Pengajuan
                                            </Button>
                                        </Link>
                                        
                                        <Button 
                                            variant="destructive" 
                                            className="w-full"
                                            onClick={handleDelete}
                                        >
                                            🗑️ Hapus Pengajuan
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Meta Info */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📊 Informasi Meta
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Dibuat Oleh
                                    </label>
                                    <p className="text-gray-900">{request.user.name}</p>
                                    <p className="text-sm text-gray-500">{request.user.venue_name}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Dibuat
                                    </label>
                                    <p className="text-gray-900 text-sm">
                                        {new Date(request.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} WIB
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Terakhir Diperbarui
                                    </label>
                                    <p className="text-gray-900 text-sm">
                                        {new Date(request.updated_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} WIB
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    {getStatusBadge(request.status)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}