<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tickets;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    // List tickets for the authenticated user
    public function index()
    {
        $tickets = Tickets::where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($ticket) {
                return $this->formatTicket($ticket);
            });

        Log::info('User tickets:', ['user_id' => Auth::id(), 'tickets' => $tickets]);

        return response()->json($tickets);
    }

    // List all tickets (admin) with optional "since" filter for notifications
    public function allTickets(Request $request)
    {
        $query = Tickets::query()->latest();

        if ($request->has('since')) {
            $since = $request->input('since');
            // Validate date format if needed
            $query->where('created_at', '>', $since);
        }

        $tickets = $query->get()->map(function ($ticket) {
            return $this->formatTicket($ticket);
        });

        Log::info('All tickets:', ['tickets' => $tickets]);

        return response()->json($tickets);
    }

    // Show a single ticket
    public function show($id)
    {
        $ticket = Tickets::with(['agent', 'customer'])->find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        return response()->json($this->formatTicket($ticket));
    }

    // Create form (web)
    public function create()
    {
        return view('tickets.create');
    }

    // Store a new ticket
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'email'       => 'required|email',
            'category'    => 'required|string|max:255',
            'ticket_body' => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $ticket = new Tickets();
        $ticket->user_id       = Auth::id();
        $ticket->customer_name = Auth::user()->name;
        $ticket->email         = $validated['email'];
        $ticket->category      = $validated['category'];
        $ticket->ticket_body   = $validated['ticket_body'];

        if ($request->hasFile('image')) {
            $ticket->image_path = $request->file('image')->store('uploads', 'public');
        }

        $ticket->save();

        return response()->json(['message' => 'Ticket created successfully!'], 201);
    }

    // Assign an agent
    public function assignAgent(Request $request, $id)
    {
        try {
            $request->validate([
                'agent_id' => 'required|exists:users,id',
            ]);

            $ticket = Tickets::findOrFail($id);

            $agent = User::where('id', $request->agent_id)
                ->where('role', 'agent')
                ->firstOrFail();

            $ticket->agent_id   = $agent->id;
            $ticket->agent_name = $agent->name;
            $ticket->status     = 'In Progress';
            $ticket->save();

            return response()->json([
                'agent_id'   => $ticket->agent_id,
                'agent_name' => $ticket->agent_name,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'message' => 'Validation failed',
                'errors'  => $ve->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('assignAgent error', ['exception' => $e]);
            return response()->json([
                'message' => 'Server error while assigning agent',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    // Helper for category filtering
    private function filterByCategory($category)
    {
        $tickets = Tickets::where('category', $category)
            ->latest()
            ->get()
            ->map(function ($ticket) {
                return $this->formatTicket($ticket);
            });

        Log::info("Tickets for {$category}:", ['tickets' => $tickets]);

        return response()->json($tickets);
    }

    // Format ticket output for API consistency
    private function formatTicket($ticket)
    {
        return [
            'id'            => $ticket->id,
            'user_id'       => $ticket->user_id,
            'agent_id'      => $ticket->agent_id,
            'email'         => $ticket->email,
            'customer_name' => $ticket->customer_name,
            'agent_name'    => $ticket->agent_name ?? 'Unassigned',
            'category'      => $ticket->category,
            'priority'      => $ticket->priority ?? null,
            'ticket_body'   => $ticket->ticket_body,
            'image_path'    => $ticket->image_path,
            'status'        => $ticket->status,
            'created_at'    => $ticket->created_at ? $ticket->created_at->toISOString() : null,
            'updated_at'    => $ticket->updated_at ? $ticket->updated_at->toISOString() : null,
        ];
    }
}
