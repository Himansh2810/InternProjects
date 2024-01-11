<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthProducts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if(!$token){
            return response()->json(['error' => 'Unauthorized - Missing token'], 401);
        }

        try {
             $user = JWTAuth::setToken($token)->authenticate();   
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized - Invalid token'], 401);
        }

        if (!$user) {
            return response()->json(['error' => 'Unauthorized - Invalid user'], 401);
        }

        $request->merge(['user' => $user]);

        return $next($request);
    }
}
