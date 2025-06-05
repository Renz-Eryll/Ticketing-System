<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\AgentNotificationController;
use App\Http\Controllers\CustomerNotificationController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MessageController;

// 🧾 Authenticated User Info
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 🔐 Authentication Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/addAgent', [RegisteredUserController::class, 'store']);

// 👥 User Management
Route::get('/agents', [RegisteredUserController::class, 'getAllAgents']);
Route::get('/admin', [RegisteredUserController::class, 'getAdmin']);
Route::get('/agentsByCategory/{category}', [RegisteredUserController::class, 'getAgentsByCategory']);
Route::put('/agents/{id}', [RegisteredUserController::class, 'updateAgent']);
Route::delete('/agents/{id}', [RegisteredUserController::class, 'deleteAgent']);

Route::get('/users/{id}', [RegisteredUserController::class, 'getUserById']);
Route::put('/users/{id}/update-name-email', [RegisteredUserController::class, 'updateUserNameAndEmail']);
Route::middleware('auth:sanctum')->put('/update-password/{id}', [RegisteredUserController::class, 'updatePassword']);

// 🎫 Ticket Routes (public)
Route::get('/pos', [TicketController::class, 'pos']);
Route::get('/iss', [TicketController::class, 'iss']);
Route::get('/qsa', [TicketController::class, 'qsa']);
Route::get('/ubs', [TicketController::class, 'ubs']);
Route::get('/payroll', [TicketController::class, 'payroll']);
Route::get('/allTickets', [TicketController::class, 'allTickets']);

// Ticket Status Counts (public)
Route::get('/tickets/open-count', [TicketController::class, 'countOpenTickets']);
Route::get('/tickets/pending-count', [TicketController::class, 'countPendingTickets']);
Route::get('/tickets/resolved-count', [TicketController::class, 'countResolvedTickets']);
Route::get('/tickets/closed-count', [TicketController::class, 'countClosedTickets']);

Route::get('/agent/{id}/countInProgressTicketsByAgent', [TicketController::class, 'countInProgressTicketsByAgent']);
Route::get('/agent/{id}/resolve-ticket-count', [TicketController::class, 'countResolveTicketsByAgent']);
Route::get('/agent/{id}/close-ticket-count', [TicketController::class, 'countCloseTicketsByAgent']);

// 🎟️ Authenticated Ticket Management
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/notif', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/ticket/{id}', [TicketController::class, 'show']);
    Route::put('/tickets/{id}/status', [TicketController::class, 'updateStatus']);
    Route::put('/tickets/{id}/priority', [TicketController::class, 'updatePriority']);
    Route::get('/tickets/agent/{id}', [TicketController::class, 'getTicketsByAgent']);
    Route::get('/agentTickets', [TicketController::class, 'agentTickets']);
    Route::put('/assignAgent/{id}', [TicketController::class, 'assignAgent']);
});

// 🔁 Messages (authenticated)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/{ticketId}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
});

// 🔔 Notifications
// Admin Notifications (public)
Route::post('/notification', [AdminNotificationController::class, 'store']);
Route::get('/allNotifications', [AdminNotificationController::class, 'index']);

// Agent Notifications (authenticated)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/agentnotification', [AgentNotificationController::class, 'store']);
    Route::get('/agentnotifications/{user_id}', [AgentNotificationController::class, 'agentNotifications']); // uses user_id param
});

// Customer Notifications (public)
Route::post('/customernotification', [CustomerNotificationController::class, 'store']);
Route::get('/customernotifications/{customer_id}', [CustomerNotificationController::class, 'getByTicketId']);

// 🔐 Password Reset
Route::post('/sendOTP', [ForgotPasswordController::class, 'sendOTP']);
Route::post('/verifyOTP', [ForgotPasswordController::class, 'verifyOTP']);
Route::post('/resetPassword', [ForgotPasswordController::class, 'resetPassword']);
