import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { AppShell } from '@/components/app-shell';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
            venue_name?: string;
        };
    };
    venues: string[];
    statusOptions: Record<string, string>;
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

interface ProcurementFormData {
    tanggal_permintaan: string;
    nama_venue: string;
    nama_barang: string;
    jumlah_barang: string;
    sisa_barang: string;
    penggunaan: string;
    pic_penerima: string;
    link_barang: string;
    note: string;
    keterangan: string;
    [key: string]: string;
}

export default function ProcurementCreate({ auth, venues, flash }: Props) {
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<ProcurementFormData>({
        tanggal_permintaan: new Date().toISOString().split('T')[0],
        nama_venue: auth.user.venue_name || '',
        nama_barang: '',
        jumlah_barang: '',
        sisa_barang: '',
        penggunaan: '',
        pic_penerima: '',
        link_barang: '',
        note: '',
        keterangan: '',
    });

    React.useEffect(() => {
        if (flash?.success) {
            setShowSuccessModal(true);
            // Reset form after successful submission
            reset();
            setData('tanggal_permintaan', new Date().toISOString().split('T')[0]);
            setData('nama_venue', auth.user.venue_name || '');
        }
    }, [flash, reset, setData, auth.user.venue_name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowLoadingModal(true);
        
        post('/procurement', {
            onSuccess: () => {
                setShowLoadingModal(false);
            },
            onError: () => {
                setShowLoadingModal(false);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Buat Pengajuan - Pengadaan Barang SGP GROUP" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        📝 Buat Pengajuan Baru
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Lengkapi form di bawah untuk membuat pengajuan pengadaan barang
                    </p>
                </div>

                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            📋 Form Pengajuan Pengadaan Barang
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Tanggal Permintaan */}
                                <div>
                                    <Label htmlFor="tanggal_permintaan">
                                        Tanggal Permintaan <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="tanggal_permintaan"
                                        type="date"
                                        value={data.tanggal_permintaan}
                                        onChange={(e) => setData('tanggal_permintaan', e.target.value)}
                                        className="mt-2"
                                        required
                                    />
                                    <InputError message={errors.tanggal_permintaan} />
                                </div>

                                {/* Nama Venue */}
                                <div>
                                    <Label htmlFor="nama_venue">
                                        Nama Venue <span className="text-red-500">*</span>
                                    </Label>
                                    {auth.user.role === 'super_admin' ? (
                                        <Select 
                                            value={data.nama_venue} 
                                            onValueChange={(value) => setData('nama_venue', value)}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Pilih Venue" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {venues.map((venue) => (
                                                    <SelectItem key={venue} value={venue}>
                                                        {venue}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            id="nama_venue"
                                            value={data.nama_venue}
                                            readOnly
                                            className="mt-2 bg-gray-50"
                                        />
                                    )}
                                    <InputError message={errors.nama_venue} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Nama Barang */}
                                <div>
                                    <Label htmlFor="nama_barang">
                                        Nama Barang <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nama_barang"
                                        value={data.nama_barang}
                                        onChange={(e) => setData('nama_barang', e.target.value)}
                                        className="mt-2"
                                        placeholder="Masukkan nama barang yang dibutuhkan"
                                        required
                                    />
                                    <InputError message={errors.nama_barang} />
                                </div>

                                {/* Jumlah Barang */}
                                <div>
                                    <Label htmlFor="jumlah_barang">
                                        Jumlah Barang <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jumlah_barang"
                                        type="number"
                                        min="1"
                                        value={data.jumlah_barang}
                                        onChange={(e) => setData('jumlah_barang', e.target.value)}
                                        className="mt-2"
                                        placeholder="Masukkan jumlah barang"
                                        required
                                    />
                                    <InputError message={errors.jumlah_barang} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Sisa Barang */}
                                <div>
                                    <Label htmlFor="sisa_barang">
                                        Sisa Barang (Opsional)
                                    </Label>
                                    <Input
                                        id="sisa_barang"
                                        value={data.sisa_barang}
                                        onChange={(e) => setData('sisa_barang', e.target.value)}
                                        className="mt-2"
                                        placeholder="Jika ada sisa barang sebelumnya"
                                    />
                                    <InputError message={errors.sisa_barang} />
                                </div>

                                {/* PIC Penerima */}
                                <div>
                                    <Label htmlFor="pic_penerima">
                                        PIC Penerima <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pic_penerima"
                                        value={data.pic_penerima}
                                        onChange={(e) => setData('pic_penerima', e.target.value)}
                                        className="mt-2"
                                        placeholder="Nama PIC yang akan menerima barang"
                                        required
                                    />
                                    <InputError message={errors.pic_penerima} />
                                </div>
                            </div>

                            {/* Penggunaan */}
                            <div>
                                <Label htmlFor="penggunaan">
                                    Penggunaan <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="penggunaan"
                                    value={data.penggunaan}
                                    onChange={(e) => setData('penggunaan', e.target.value)}
                                    className="mt-2"
                                    placeholder="Jelaskan untuk apa barang ini akan digunakan"
                                    rows={3}
                                    required
                                />
                                <InputError message={errors.penggunaan} />
                            </div>

                            {/* Link Barang */}
                            <div>
                                <Label htmlFor="link_barang">
                                    Link Barang (Opsional)
                                </Label>
                                <Input
                                    id="link_barang"
                                    type="url"
                                    value={data.link_barang}
                                    onChange={(e) => setData('link_barang', e.target.value)}
                                    className="mt-2"
                                    placeholder="https://contoh.com/link-barang"
                                />
                                <InputError message={errors.link_barang} />
                            </div>

                            {/* Note */}
                            <div>
                                <Label htmlFor="note">
                                    Note (Opsional)
                                </Label>
                                <Textarea
                                    id="note"
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    className="mt-2"
                                    placeholder="Catatan tambahan jika diperlukan"
                                    rows={2}
                                />
                                <InputError message={errors.note} />
                            </div>

                            {/* Keterangan */}
                            <div>
                                <Label htmlFor="keterangan">
                                    Keterangan (Opsional)
                                </Label>
                                <Textarea
                                    id="keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    className="mt-2"
                                    placeholder="Keterangan detail mengenai pengajuan"
                                    rows={3}
                                />
                                <InputError message={errors.keterangan} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => window.history.back()}
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2"
                                >
                                    {processing && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                    🚀 Kirim Pengajuan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Loading Modal */}
            <Dialog open={showLoadingModal} onOpenChange={setShowLoadingModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            Mengirim Data
                        </DialogTitle>
                        <DialogDescription>
                            Sedang mengirim data pengajuan, mohon menunggu...
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-600">
                            ✅ Berhasil!
                        </DialogTitle>
                        <DialogDescription>
                            Pengajuan berhasil dikirim! Data telah tersimpan dalam sistem dan akan segera diproses.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setShowSuccessModal(false)}>
                            OK
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppShell>
    );
}