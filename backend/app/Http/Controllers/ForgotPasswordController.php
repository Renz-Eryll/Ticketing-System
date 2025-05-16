<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ForgotPasswordOtp;
use App\Notifications\ForgotPasswordNotification;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    public function sendOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $user = User::where('email', $request->email)->first();
        $otp = random_int(1111, 9999);
        $expiration = Carbon::now()->addMinutes(30);

        // Delete any previous OTPs
        ForgotPasswordOtp::where('email', $request->email)->delete();

        // Store OTP in table
        ForgotPasswordOtp::create([
            'email' => $request->email,
            'otp' => $otp,
            'expiration' => $expiration,
        ]);

        $user->notify(new ForgotPasswordNotification($request->email, $otp));

        return response()->json(['message' => 'OTP sent to your email.']);
    }

    public function verifyOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|numeric',
        ]);

        $record = ForgotPasswordOtp::where('email', $request->email)->first();

        if ((int) $record->otp !== (int) $request->otp) {
            return response()->json(['message' => 'Invalid OTP.'], 400);
        }
        
        if (Carbon::now()->gt(Carbon::parse($record->expiration))) {
            $record->delete(); // Clean expired OTP
            return response()->json(['message' => 'OTP has expired.'], 400);
        }
        
        $record->update([
            'verified_at' => now(),
            'otp' => null // Optional: Clear OTP after verification
        ]);
        
        return response()->json(['message' => 'OTP verified. You may now reset your password.']);
        
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $otpRecord = ForgotPasswordOtp::where('email', $request->email)->first();

        if (!$otpRecord || $otpRecord->otp !== null) {
            return response()->json(['message' => 'OTP not verified or expired.'], 403);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the OTP record after successful reset
        $otpRecord->delete();

        return response()->json(['message' => 'Password has been reset successfully.']);
    }
}
