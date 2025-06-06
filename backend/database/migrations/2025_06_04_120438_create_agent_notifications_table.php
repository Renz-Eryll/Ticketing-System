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
        Schema::create('agent_notifications', function (Blueprint $table) {
            $table->id();

            // Foreign key to tickets table
            $table->foreignId('ticket_id')
                ->constrained()
                ->onDelete('cascade');

            // Foreign key to users table (agent user)
            $table->foreignId('user_id') // use snake_case 'user_id' for consistency
                ->constrained()
                ->onDelete('cascade');

            // Notification details
            $table->string('name');    // Who posted the ticket / sender
            $table->string('title');   // Notification title
            $table->text('message');   // Full notification message

            // Read status
            $table->boolean('is_read')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_notifications');
    }
};
