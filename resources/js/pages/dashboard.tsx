import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppShell } from '@/components/app-shell';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            username: string;
            role: string;
            venue_name?: string;
        };
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth }: Props) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date: Date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        return {
            date: `${dayName}, ${day} ${month} ${year}`,
            time: `${hours}:${minutes}:${seconds} WIB`
        };
    };

    const { date, time } = formatDateTime(currentTime);

    return (
        <AppShell>
            <Head title="Dashboard - Pengadaan Barang SGP GROUP" />
            
            {/* Header with Time */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                📦 Pengadaan Barang SGP GROUP
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {auth.user.role === 'super_admin' ? 'Super Admin Panel' : `Venue: ${auth.user.venue_name}`}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold text-blue-600">{time}</div>
                            <div className="text-sm text-gray-600">{date}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            👋 Selamat datang, {auth.user.name}!
                        </CardTitle>
                        <CardDescription className="text-blue-100 text-base">
                            {auth.user.role === 'super_admin' 
                                ? 'Kelola semua pengajuan pengadaan barang dari seluruh venue'
                                : `Kelola pengajuan pengadaan barang untuk venue ${auth.user.venue_name}`
                            }
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📝</span>
                                Buat Pengajuan
                            </CardTitle>
                            <CardDescription>
                                Submit pengajuan pengadaan barang baru
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/procurement/create">
                                <Button className="w-full">
                                    Buat Pengajuan Baru
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📋</span>
                                Lihat Pengajuan
                            </CardTitle>
                            <CardDescription>
                                {auth.user.role === 'super_admin' 
                                    ? 'Kelola semua pengajuan dari venue'
                                    : 'Lihat pengajuan yang sudah dibuat'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/procurement">
                                <Button variant="outline" className="w-full">
                                    Lihat Semua Pengajuan
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {auth.user.role === 'super_admin' && (
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Export Data
                                </CardTitle>
                                <CardDescription>
                                    Export dan cetak laporan pengajuan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={route('export.procurement')}>
                                    <Button variant="secondary" className="w-full">
                                        Export ke Excel
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* System Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">ℹ️</span>
                                Informasi Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                    Tertunda
                                </span>
                                <span className="text-sm text-gray-600">Menunggu review</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    Disetujui
                                </span>
                                <span className="text-sm text-gray-600">Pengajuan disetujui</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    Ditolak
                                </span>
                                <span className="text-sm text-gray-600">Pengajuan ditolak</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                    Terkirim
                                </span>
                                <span className="text-sm text-gray-600">Barang sudah dikirim</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">🏢</span>
                                Venue Terdaftar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {[
                                    'Patrajasa', 'Slipi', 'Brin Gatsu', 'Lippo', 'Brin Thamrin',
                                    'Dharmagati', 'Seskoad', 'Samisara', 'Bripens', 'Paramita'
                                ].map((venue) => (
                                    <div key={venue} className="p-2 bg-gray-50 rounded text-center">
                                        {venue}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
