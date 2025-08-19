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
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->after('name');
            $table->enum('role', ['venue_user', 'super_admin'])->default('venue_user')->after('username');
            $table->string('venue_name')->nullable()->after('role');
        });
        
        // Update existing users with temporary usernames
        $users = \App\Models\User::whereNull('username')->get();
        foreach ($users as $user) {
            $user->update([
                'username' => 'temp_' . $user->id,
                'role' => 'venue_user'
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'role', 'venue_name']);
        });
    }
};