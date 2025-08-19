<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProcurementRequest
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $tanggal_permintaan
 * @property string $nama_venue
 * @property string $nama_barang
 * @property int $jumlah_barang
 * @property string|null $sisa_barang
 * @property string $penggunaan
 * @property string $pic_penerima
 * @property string|null $link_barang
 * @property string|null $note
 * @property string|null $keterangan
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereTanggalPermintaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNamaVenue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNamaBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereJumlahBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereSisaBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest wherePenggunaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest wherePicPenerima($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereLinkBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProcurementRequest whereUpdatedAt($value)
 * @method static \Database\Factories\ProcurementRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ProcurementRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'tanggal_permintaan',
        'nama_venue',
        'nama_barang',
        'jumlah_barang',
        'sisa_barang',
        'penggunaan',
        'pic_penerima',
        'link_barang',
        'note',
        'keterangan',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_permintaan' => 'date',
        'jumlah_barang' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the procurement request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the available status options.
     *
     * @return array<string>
     */
    public static function getStatusOptions(): array
    {
        return [
            'Tertunda' => 'Tertunda',
            'Disetujui' => 'Disetujui',
            'Ditolak' => 'Ditolak',
            'Terkirim' => 'Terkirim',
        ];
    }

    /**
     * Scope a query to only include requests for a specific venue.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $venue
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForVenue($query, $venue)
    {
        return $query->where('nama_venue', $venue);
    }

    /**
     * Scope a query to only include requests with a specific status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}