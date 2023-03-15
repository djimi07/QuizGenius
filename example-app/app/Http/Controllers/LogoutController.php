<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\User;

use Carbon\Carbon;

use Auth;



class LogoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('isLogged'); //auth Required
    }

    public function logout(Request $Request)
    {
        Auth::logout();

        $Request->session()->invalidate();

        $Request->session()->regenerateToken();
        

        return response()->json([
            'message' => 'logged_out',
        ]);
    }
}
