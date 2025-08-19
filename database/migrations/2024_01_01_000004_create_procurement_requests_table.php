<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procurement_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('tanggal_permintaan')->comment('Request date');
            $table->string('nama_venue')->comment('Venue name');
            $table->string('nama_barang')->comment('Item name');
            $table->integer('jumlah_barang')->comment('Quantity');
            $table->string('sisa_barang')->nullable()->comment('Remaining stock');
            $table->text('penggunaan')->comment('Usage description');
            $table->string('pic_penerima')->comment('Recipient PIC');
            $table->string('link_barang')->nullable()->comment('Item link');
            $table->text('note')->nullable()->comment('Additional notes');
            $table->text('keterangan')->nullable()->comment('Description');
            $table->enum('status', ['Tertunda', 'Disetujui', 'Ditolak', 'Terkirim'])->default('Tertunda')->comment('Request status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('nama_venue');
            $table->index('status');
            $table->index('tanggal_permintaan');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_requests');
    }
};