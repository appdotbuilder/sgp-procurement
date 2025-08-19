<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProcurementRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tanggal_permintaan' => 'required|date',
            'nama_venue' => 'required|string|max:255',
            'nama_barang' => 'required|string|max:255',
            'jumlah_barang' => 'required|integer|min:1',
            'sisa_barang' => 'nullable|string|max:255',
            'penggunaan' => 'required|string',
            'pic_penerima' => 'required|string|max:255',
            'link_barang' => 'nullable|url|max:500',
            'note' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'status' => 'sometimes|in:Tertunda,Disetujui,Ditolak,Terkirim',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'tanggal_permintaan.required' => 'Tanggal permintaan wajib diisi.',
            'tanggal_permintaan.date' => 'Tanggal permintaan harus berformat tanggal yang valid.',
            'nama_venue.required' => 'Nama venue wajib diisi.',
            'nama_barang.required' => 'Nama barang wajib diisi.',
            'jumlah_barang.required' => 'Jumlah barang wajib diisi.',
            'jumlah_barang.integer' => 'Jumlah barang harus berupa angka.',
            'jumlah_barang.min' => 'Jumlah barang minimal 1.',
            'penggunaan.required' => 'Penggunaan barang wajib diisi.',
            'pic_penerima.required' => 'PIC penerima wajib diisi.',
            'link_barang.url' => 'Link barang harus berupa URL yang valid.',
        ];
    }
}