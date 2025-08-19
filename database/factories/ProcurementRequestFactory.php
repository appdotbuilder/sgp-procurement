<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementRequest>
 */
class ProcurementRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
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

        $statuses = ['Tertunda', 'Disetujui', 'Ditolak', 'Terkirim'];

        return [
            'user_id' => User::factory(),
            'tanggal_permintaan' => fake()->dateTimeBetween('-30 days', '+7 days'),
            'nama_venue' => fake()->randomElement($venues),
            'nama_barang' => fake()->words(3, true),
            'jumlah_barang' => fake()->numberBetween(1, 100),
            'sisa_barang' => fake()->optional()->words(2, true),
            'penggunaan' => fake()->sentence(),
            'pic_penerima' => fake()->name(),
            'link_barang' => fake()->optional()->url(),
            'note' => fake()->optional()->sentence(),
            'keterangan' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement($statuses),
        ];
    }
}