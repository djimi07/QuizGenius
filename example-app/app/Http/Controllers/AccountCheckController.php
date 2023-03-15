<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use Auth;


class AccountCheckController extends Controller
{
    public function __construct()
    {
        $this->middleware('isLogged'); //must be logged

    }

    public function account(Request $Request)
    {

        return response()->json([

            'message' => 'success',
            'username' => Auth::user()->username,
            'refferal_link' => Auth::user()->refferal_link,
            'is_admin' => Auth::user()->is_admin,
            
        ]);
        
    }
}
