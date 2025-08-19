<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Patrajasa',
                'username' => 'patrajasa',
                'email' => 'patrajasa@sgpgroup.com',
                'password' => Hash::make('patrajasa1234'),
                'role' => 'venue_user',
                'venue_name' => 'Patrajasa'
            ],
            [
                'name' => 'Slipi',
                'username' => 'slipi',
                'email' => 'slipi@sgpgroup.com',
                'password' => Hash::make('slipi1234'),
                'role' => 'venue_user',
                'venue_name' => 'Slipi'
            ],
            [
                'name' => 'Brin Gatsu',
                'username' => 'bringatsu',
                'email' => 'bringatsu@sgpgroup.com',
                'password' => Hash::make('bringatsu1234'),
                'role' => 'venue_user',
                'venue_name' => 'Brin Gatsu'
            ],
            [
                'name' => 'Lippo',
                'username' => 'lippo',
                'email' => 'lippo@sgpgroup.com',
                'password' => Hash::make('lippo1234'),
                'role' => 'venue_user',
                'venue_name' => 'Lippo'
            ],
            [
                'name' => 'Brin Thamrin',
                'username' => 'brinthamrin',
                'email' => 'brinthamrin@sgpgroup.com',
                'password' => Hash::make('brinthamrin1234'),
                'role' => 'venue_user',
                'venue_name' => 'Brin Thamrin'
            ],
            [
                'name' => 'Dharmagati',
                'username' => 'dharmagati',
                'email' => 'dharmagati@sgpgroup.com',
                'password' => Hash::make('dharmagati1234'),
                'role' => 'venue_user',
                'venue_name' => 'Dharmagati'
            ],
            [
                'name' => 'Seskoad',
                'username' => 'seskoad',
                'email' => 'seskoad@sgpgroup.com',
                'password' => Hash::make('seskoad1234'),
                'role' => 'venue_user',
                'venue_name' => 'Seskoad'
            ],
            [
                'name' => 'Samisara',
                'username' => 'samisara',
                'email' => 'samisara@sgpgroup.com',
                'password' => Hash::make('samisara1234'),
                'role' => 'venue_user',
                'venue_name' => 'Samisara'
            ],
            [
                'name' => 'Bripens',
                'username' => 'bripens',
                'email' => 'bripens@sgpgroup.com',
                'password' => Hash::make('bripens1234'),
                'role' => 'venue_user',
                'venue_name' => 'Bripens'
            ],
            [
                'name' => 'Paramita',
                'username' => 'paramita',
                'email' => 'paramita@sgpgroup.com',
                'password' => Hash::make('paramita1234'),
                'role' => 'venue_user',
                'venue_name' => 'Paramita'
            ],
            [
                'name' => 'Super Admin',
                'username' => 'moonbeam',
                'email' => 'admin@sgpgroup.com',
                'password' => Hash::make('moonbeam1234'),
                'role' => 'super_admin',
                'venue_name' => null
            ]
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}