<?php

namespace App\Http\Controllers;

use App\Models\CustomerNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class CustomerNotificationController extends Controller
{
     // Show all notifications
    public function index()
    {
        $notifications = CustomerNotification::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

   public function getCustomerNotifications($customer_id)
    {
        try {
            $notifications = CustomerNotification::where('customer_id', $customer_id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($notifications);
        } catch (\Exception $e) {
            Log::error('Error fetching notifications for user ' . $customer_id . ': ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch notifications for the user.'], 500);
        }
    }


    // Store new notification
   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'ticket_id' => 'required|integer|exists:tickets,id',
            'customer_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = CustomerNotification::create($validated);

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


   public function show($id)
    {
        try {
            $notification = CustomerNotification::findOrFail($id);
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


   
     public function update(Request $request, $id)
{
    try {
        $validated = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification = CustomerNotification::findOrFail($id);
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

public function getUnreadCount($customer_id)
{
    $count = CustomerNotification ::where('customer_id', $customer_id)
                         ->where('is_read', false)
                         ->count();

    return response()->json(['unread_count' => $count]);
}

public function markAllAsRead($customer_id)
{
    CustomerNotification::where('user_id', $customer_id)
                ->where('is_read', false)
                ->update(['is_read' => true]);

    return response()->json(['message' => 'All notifications marked as read']);
}


    // Delete a notification
    public function destroy($id)
    {
        $notification = CustomerNotification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted.']);
    }
}
