<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\User;

use Carbon\Carbon;

use Auth;



class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('authCheck'); //abort if authenticated

    }

    public function postLogin(Request $Request)
    {
        $credentials = $Request->only('username', 'password');

        $user = Auth::attempt($credentials, 1);

        if ($user)
        {
            return response()->json([
                'message' => 'success',
                'username' => Auth::user()->username,
                'refferal_link' => Auth::user()->refferal_link,
                'is_admin' => Auth::user()->is_admin,
            ]);
        }

        else
        {
            return response()->json([
                'message' => 'not_found',
               
            ]);
        }
    }
}
