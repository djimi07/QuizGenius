<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\SubscribeRequest;

use App\Models\User;

use Carbon\Carbon;

use Auth;

class SubscribeController extends Controller
{

    public function __construct()
    {
        $this->middleware('authCheck'); //abort if authenticated

    }

    public function postSubscribe(SubscribeRequest $SubscribeRequest)
    {
        //generate referral link

        $referral_link = '/exam/' . $SubscribeRequest->only('username')['username'] . '/' . Carbon::now()->timestamp;

        $entries = User::count();
        
        $is_admin = (User::count() == 0) ? 1 : 0;
        

        $user = User::create([
            'username' => $SubscribeRequest->only('username')['username'],
            'password' => $SubscribeRequest->only('password')['password'],
            'is_admin' => $is_admin,
            'refferal_link' => $referral_link,
        ]);


        Auth::login($user, 1);


        return response()->json([
            'message' => 'success',
            'refferal_link' => $referral_link,
            'is_admin' => $is_admin,
        ]);
    }


}
