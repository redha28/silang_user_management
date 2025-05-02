<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dibuat.');
    }

    /**
     * Display the specified user
     */
    public function show(User $user)
    {
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', ['user' => $user]);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|in:user,admin',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // Prevent changing own role
        if ($user->id !== auth()->id()) {
            $user->role = $validated['role'];
        }

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil diperbarui');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user)
    {
        // Prevent deleting self
        if ($user->id === auth()->id()) {
            return redirect()->route('users.index')->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        // Admin can't delete other admins
        if ($user->role === 'admin' && auth()->user()->role === 'admin') {
            return redirect()->route('users.index')->with('error', 'Anda tidak dapat menghapus pengguna dengan peran admin.');
        }

        $user->delete();
        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }

    /**
     * Toggle user role between admin and regular user
     */
    public function toggleRole(User $user)
    {
        // Prevent toggling self to prevent lockout
        if ($user->id === auth()->id()) {
            return redirect()->route('users.index')->with('error', 'Anda tidak dapat mengubah peran diri sendiri.');
        }

        $newRole = $user->role === 'admin' ? 'user' : 'admin';
        $user->role = $newRole;
        $user->save();

        $actionText = $newRole === 'admin' ? 'dijadikan admin' : 'dijadikan pengguna biasa';

        return redirect()->route('users.index')->with('success', "Pengguna {$user->name} telah berhasil {$actionText}.");
    }
}
