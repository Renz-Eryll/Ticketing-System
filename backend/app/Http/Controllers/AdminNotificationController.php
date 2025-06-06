<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminNotification;
use App\Models\Tickets;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;


class AdminNotificationController extends Controller
{
    // Show all notifications
    public function index()
    {
        $notifications = AdminNotification::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    // Store new notification
   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'ticket_id' => 'required|integer|exists:tickets,id',
            'title' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = AdminNotification::create($validated);

        return response()->json([
            'message' => 'Notification created successfully.',
            'data' => $notification,
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'errors' => $e->errors(),
            'message' => 'Validation failed',
        ], 422);
    }
}


    // Show single notification
    public function show($id)
    {
        $notification = AdminNotification::findOrFail($id);
        return response()->json($notification);
    }

     public function update(Request $request, $id)
{
    try {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification = AdminNotification::findOrFail($id);
        $notification->is_read = $validated['is_read'];
        $notification->save();

        return response()->json([
            'message' => 'Notification updated successfully.',
            'data'    => $notification,
        ]);
    } catch (ModelNotFoundException $e) {
        return response()->json([
            'message' => 'Notification not found.',
        ], 404);
    } catch (ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed.',
            'errors'  => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error updating notification ID ' . $id . ': ' . $e->getMessage());
        return response()->json(['message' => 'Failed to update notification.'], 500);
    }
}

public function getUnreadCount()
{
    $count = AdminNotification::where('is_read', false)->count();

    return response()->json(['unread_count' => $count]);
}

public function markAllAsRead()
{
    AdminNotification::where('is_read', false)
        ->update(['is_read' => true]);

    return response()->json(['message' => 'All notifications marked as read']);
}


    // Delete a notification
    public function destroy($id)
    {
        $notification = AdminNotification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}
