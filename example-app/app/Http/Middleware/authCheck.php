<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;


use Auth;

class authCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        if (Auth::check())
        {
            return response()->json([

                'message' => 'already connected',

                'username' => Auth::user()->username,
                'refferal_link' => Auth::user()->refferal_link,
                'is_admin' => Auth::user()->is_admin,

            ]);

        }

        return $next($request);
    }
}
