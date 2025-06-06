<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tickets; 
use App\Models\User;

class AgentNotification extends Model
{
    protected $fillable = [
        'ticket_id',
        'user_ID',
        'title',
        'name',
        'message',
        'is_read',
    ];

    public function ticket()
    {
        return $this->belongsTo(Tickets::class, 'ticket_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
