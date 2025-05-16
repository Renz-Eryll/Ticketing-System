<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use App\Models\User;

class OtpForgotPasswordController extends Controller
{
    // STEP 1: Send OTP to user's email
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $email = $request->email;
        $otp = rand(100000, 999999);
        $expiresAt = Carbon::now()->addMinutes(5);

        // Remove any previous OTPs for this email
        DB::table('password_resets')->where('email', $email)->delete();

        // Save OTP to database
        DB::table('password_resets')->insert([
            'email' => $email,
            'otp' => $otp,
            'expires_at' => $expiresAt,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Send OTP via email
        Mail::raw("Your OTP is: $otp. It will expire in 5 minutes.", function ($message) use ($email) {
            $message->to($email)->subject('Your Password Reset OTP');
        });

        return response()->json(['message' => 'OTP has been sent to your email.']);
    }

    // STEP 2: Verify OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid OTP.'], 400);
        }

        if (Carbon::now()->greaterThan(Carbon::parse($record->expires_at))) {
            return response()->json(['message' => 'OTP has expired.'], 400);
        }

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    // STEP 3: Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
            'new_password' => 'required|min:6|confirmed', // use new_password_confirmation
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$record || Carbon::now()->greaterThan($record->expires_at)) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->new_password);
        $user->save();

        // Delete OTP record
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password has been reset successfully.']);
    }
}
