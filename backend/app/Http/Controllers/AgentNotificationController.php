<?php

namespace App\Http\Controllers;

use App\Models\AgentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class AgentNotificationController extends Controller
{
    /**
     * Display a listing of all agent notifications (optional admin use).
     */
    public function index()
    {
        try {
            $notifications = AgentNotification::orderBy('created_at', 'desc')->get();
            return response()->json($notifications);
        } catch (\Exception $e) {
            Log::error('Error fetching all agent notifications: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch notifications.'], 500);
        }
    }

    /**
     * Display notifications specific to an agent by user ID.
     */
    public function agentNotifications($user_id)
    {
        try {
            $notifications = AgentNotification::where('user_id', $user_id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($notifications);
        } catch (\Exception $e) {
            Log::error('Error fetching notifications for user ' . $user_id . ': ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch notifications for the user.'], 500);
        }
    }

    /**
     * Store a newly created agent notification.
     */
    public function store(Request $request)
    {
        Log::info('AgentNotification store request received', $request->all());

        try {
            $validated = $request->validate([
                'ticket_id' => 'required|integer|exists:tickets,id',
                'user_ID'   => 'required|integer|exists:users,id',
                'title'     => 'required|string|max:255',
                'name'      => 'required|string|max:255',
                'message'   => 'required|string',
            ]);

            $notification = AgentNotification::create($validated);

            Log::info('AgentNotification created successfully', ['notification_id' => $notification->id]);

            return response()->json([
                'message' => 'Notification created successfully.',
                'data'    => $notification,
            ], 201);
        } catch (ValidationException $e) {
            Log::error('AgentNotification validation failed', $e->errors());

            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('AgentNotification store error: ' . $e->getMessage());

            return response()->json([
                'message' => 'An unexpected error occurred.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $notification = AgentNotification::findOrFail($id);
            return response()->json($notification);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Notification not found.',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error fetching notification ID ' . $id . ': ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch notification.'], 500);
        }
    }

    /**
     * Update an agent notification (e.g., mark as read).
     */
 public function update(Request $request, $id)
{
    try {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification = AgentNotification::findOrFail($id);
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

public function getUnreadCount($agentId)
{
    $count = AgentNotification::where('user_id', $agentId)
                         ->where('is_read', false)
                         ->count();

    return response()->json(['unread_count' => $count]);
}

public function markAllAsRead($userId)
{
    AgentNotification::where('user_id', $userId)
                ->where('is_read', false)
                ->update(['is_read' => true]);

    return response()->json(['message' => 'All notifications marked as read']);
}

    /**
     * Remove a specific notification by ID.
     */
    public function destroy($id)
    {
        try {
            $notification = AgentNotification::findOrFail($id);
            $notification->delete();

            return response()->json([
                'message' => 'Notification deleted successfully.',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Notification not found.',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting notification ID ' . $id . ': ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete notification.'], 500);
        }
    }
}
