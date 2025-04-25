<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AgentController extends Controller
{
    // Show all agents
    public function index()
    {
        $agents = Agent::all();
        return response()->json($agents);
    }

    // Show form for creating a new agent (for web UI)
    public function create()
    {
        return view('agents.create');
    }

    // Store a newly created agent
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:agents,email',
            'category' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $agent = Agent::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'email' => $request->email,
            'category' => $request->category,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Agent created successfully', 'agent' => $agent]);
    }

    // Show a specific agent
    public function show($id)
    {
        $agent = Agent::findOrFail($id);
        return response()->json($agent);
    }

    // Show form to edit an agent (for web UI)
    public function edit($id)
    {
        $agent = Agent::findOrFail($id);
        return view('agents.edit', compact('agent'));
    }

    // Update an existing agent
    public function update(Request $request, $id)
    {
        $agent = Agent::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:agents,email,' . $id,
            'category' => 'sometimes|required|string',
            'password' => 'nullable|string|min:6',
        ]);

        $agent->update([
            'name' => $request->name ?? $agent->name,
            'email' => $request->email ?? $agent->email,
            'category' => $request->category ?? $agent->category,
            'password' => $request->password ? Hash::make($request->password) : $agent->password,
        ]);

        return response()->json(['message' => 'Agent updated successfully', 'agent' => $agent]);
    }

    // Delete an agent
    public function destroy($id)
    {
        $agent = Agent::findOrFail($id);
        $agent->delete();

        return response()->json(['message' => 'Agent deleted successfully']);
    }
}
