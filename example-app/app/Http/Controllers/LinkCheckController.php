<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class LinkCheckController extends Controller
{
    public function __construct()
    {

    }

    public function checkLink(Request $Request)
    {
        $validated = $Request->validate([
            'link' => 'string|required',
        ]);

        $link = $validated['link'];

        $entry = User::where('refferal_link', $link)->first();

        if ($entry)
        {
            return response()->json([
                'message' => 'good_link',
            ]);
        }

        else
        {
            return response()->json([
                'message' => 'bad_link',
            ]);
        }
        
    }
}
