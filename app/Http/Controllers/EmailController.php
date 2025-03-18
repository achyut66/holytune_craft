<?php
namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        Log::info('Incoming Contact Form Data:', $request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        try {
            Mail::to('nepal@holytunecraft.com')->send(new ContactMail($request->all()));
            return response()->json(['success' => 'Your message has been sent successfully.'], 200);
        } catch (\Exception $e) {
            Log::error('Email sending failed: ', ['error_message' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to send email.', 'details' => $e->getMessage()], 500);
        }
    }
}
