<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FacebookWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        // Verify Facebook Webhook
        if ($request->hub_mode && $request->hub_verify_token) {
            if ($request->hub_verify_token === env('FB_VERIFY_TOKEN')) {
                return response($request->hub_challenge, 200);
            } else {
                return response('Forbidden', 403);
            }
        }

        // Handle incoming messages
        $data = $request->all();

        // Process the data (i.e., reply to the user)
        Log::info($data); // You can log the data or process it for further actions

        return response('OK', 200);
    }
}
