<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Exception;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','createUser']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function createUser(){
        try{
            $credentials = request(['name','username', 'password']);

            $credentials['password']=bcrypt($credentials['password']);

            User::create($credentials);

            return response()->json(["status"=>200]);
        }catch(Exception $e){
            return response()->json(["status"=>400,"error"=>$e]);
        }
        

    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    public function updateUser(){
         
        $credentials = request(['username','password']);
        

        if(auth()->validate($credentials)){
            $user = User::where('username',$credentials['username'])->first();

           if($user){
             $user->name = request('name');
             $user->password = bcrypt(request('new_password'));

             $user->update();

             return response()->json(['status'=>200]);
           }
           else{
             return response()->json(['status'=>500]);
           }
            
        }
        else{
            return  response()->json(["status"=>401]);
        }
    }

    public function deleteUser(){

        $credentials = request(['username','password']);
        

        if(auth()->validate($credentials)){
            $user = User::where('username',$credentials['username'])->first();

           if($user){
            
             $user->delete();
             return response()->json(['status'=>200]);
           }
           else{
             return response()->json(['status'=>500]);
           }
            
        }
        else{
            return  response()->json(["status"=>401]);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        

        return response()->json(['message' => 'Successfully logged out',"status"=>200]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
