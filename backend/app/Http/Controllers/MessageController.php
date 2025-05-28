<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class MessageController extends Controller
{
    // Retrieve messages between authenticated user and another user
    public function index($userId)
    {
        $authId = Auth::id();

        $messages = Message::where(function ($query) use ($authId, $userId) {
            $query->where('sender_id', $authId)
                  ->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($authId, $userId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $authId);
        })->orderBy('created_at')
          ->get();

        return response()->json($messages);
    }

    // Store a new message
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'receiver_id' => 'required|integer|exists:users,id',
                'customer_ticket_id' => 'required|integer|exists:tickets,id',
                'content' => 'required|string',
            ]);

            $message = Message::create([
                'sender_id' => Auth::id(),
                'receiver_id' => $validated['receiver_id'],
                'customer_ticket_id' => $validated['customer_ticket_id'],
                'content' => $validated['content'],
            ]);

            return response()->json($message, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Message sending failed',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
