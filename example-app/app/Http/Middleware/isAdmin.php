<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Auth;

class isAdmin
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
        //must be connected then must be admin

        if (Auth::check())
        {
            $is_admin = Auth::user()->is_admin;

            if ($is_admin)
            {
                return $next($request);
            }

            else
            {
                return response()->json([
                    'message' => 'access_refused',
                ]);
            }
        }

        else
        {
            return response()->json([
                'message' => 'not_logged',
            ]);
        }
    }
}
