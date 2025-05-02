<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user with known credentials
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin Sistem',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create regular test user
        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Pengguna Biasa',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
    }
}
