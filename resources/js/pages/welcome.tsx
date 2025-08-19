import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth?: {
        user?: {
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Pengadaan Barang SGP GROUP" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📦</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Pengadaan Barang SGP GROUP
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <>
                                        <span className="text-gray-600">
                                            Halo, {auth.user.name}
                                        </span>
                                        <Link href="/dashboard">
                                            <Button>Dashboard</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <Button>Login</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            🏢 Sistem Pengadaan Barang Terpadu
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Platform digital modern untuk mengelola pengajuan pengadaan barang 
                            di seluruh venue SGP Group dengan efisien dan transparan
                        </p>
                        {!auth?.user && (
                            <Link href="/login">
                                <Button size="lg" className="text-lg px-8 py-4">
                                    Mulai Sekarang →
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <CardTitle>Pengajuan Digital</CardTitle>
                                <CardDescription>
                                    Submit pengajuan pengadaan barang secara online dengan form yang lengkap dan mudah digunakan
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">⏱️</span>
                                </div>
                                <CardTitle>Real-time Tracking</CardTitle>
                                <CardDescription>
                                    Pantau status pengajuan secara real-time dari pending hingga terkirim dengan notifikasi instant
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <CardTitle>Dashboard Analytics</CardTitle>
                                <CardDescription>
                                    Laporan komprehensif dan export data dalam format Excel untuk analisis mendalam
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Venues */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                        <h3 className="text-2xl font-bold text-center mb-8">🏪 Venue yang Terdaftar</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
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
                            ].map((venue) => (
                                <div
                                    key={venue}
                                    className="bg-gray-50 rounded-lg p-4 text-center border hover:bg-blue-50 transition-colors"
                                >
                                    <div className="text-2xl mb-2">🏢</div>
                                    <div className="font-medium text-gray-900">{venue}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Features */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>👥</span> Untuk Venue Users
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Submit pengajuan pengadaan barang</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Kelola data pengajuan sendiri</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Update status pengajuan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Notifikasi real-time</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>👑</span> Untuk Super Admin
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Kelola semua data pengajuan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Dashboard analytics lengkap</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Export data ke Excel</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Cetak laporan komprehensif</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    {!auth?.user && (
                        <div className="text-center mt-16">
                            <div className="bg-blue-600 rounded-lg p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">
                                    Siap Memulai? 🚀
                                </h3>
                                <p className="text-lg mb-6 opacity-90">
                                    Login dengan akun venue Anda atau sebagai Super Admin untuk mulai menggunakan sistem
                                </p>
                                <Link href="/login">
                                    <Button 
                                        size="lg" 
                                        variant="secondary"
                                        className="text-lg px-8 py-4"
                                    >
                                        Login Sekarang
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <p className="text-gray-400">
                                © 2024 SGP Group. Sistem Pengadaan Barang Digital.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}