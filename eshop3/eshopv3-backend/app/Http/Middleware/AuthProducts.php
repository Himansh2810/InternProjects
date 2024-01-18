<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomError;
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
            throw new CustomError(401,"Unauthorized - Missing token");           
        }

        try {
             $user = JWTAuth::setToken($token)->authenticate();   
        } catch (\Exception $e) {
            throw new CustomError(401,"Unauthorized - Invalid token",null,$e->getCode(),$e);  
        }

        if (!$user) {
            throw new CustomError(401,"Unauthorized - User details Invalid");  
        }

        $request->merge(['user' => $user]);

        return $next($request);
    }
}
