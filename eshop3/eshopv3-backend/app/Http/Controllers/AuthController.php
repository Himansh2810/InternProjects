<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Exception;
use App\Exceptions\CustomError;
use Illuminate\Database\QueryException;
use Tymon\JWTAuth\Claims\Custom;
use \Illuminate\Support\Facades\Log;

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
           throw new CustomError(401,"Invalid Username or Password.");
         }

         return $this->respondWithToken($token);
           
    }

    public function createUser(){
        try{
            $credentials = request(['name','username', 'password']);

            $credentials['password']=bcrypt($credentials['password']);

            User::create($credentials);

            return response()->json(["status"=>200,"message"=>"Account Created Successfully. \n Redirecting to Login ..."]);
        }catch(QueryException $e){
            $ecode = $e->getCode();

            if($ecode == 23000){
                throw new CustomError(403, 'Username already exists.');
            }
            else{
                throw new CustomError(403,"An error occurred while creating User.\n Please try again.");
            }
            
        }
        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        Log::channel('customLog')->info("User tried to login...");

        try{
            return response()->json(auth()->user());
        }catch(Exception $e){
            Log::channel('errorLog')->error($e->getMessage());
        }
        
    }

    public function updateUser(){
         
        $credentials = request(['username','password']);
        

        if(auth()->validate($credentials)){

            try{
                $user = User::where('username',$credentials['username'])->first();

                if(!$user){
                    throw new CustomError(404,'Username Not Exists');
                    return;
                }

                $user->name = request('name');
                $user->password = bcrypt(request('new_password'));

                $user->update();

                return response()->json(['message'=>'Your details updated successfully']);
            }catch(QueryException $e){

                if ($e->getCode() == 'HY000') {
                     throw new CustomError(503, 'Database connection error. Please try again later.');
                }

                $ecode = $e->getCode();
                throw new CustomError(500,"Unknown error occurred. \n Please try again",null,$ecode,$e);
            }
           
        }
        else{
            throw new CustomError(401,"Invalid password.");
        }
    }

    public function deleteUser(){

        $credentials = request(['username','password']);
        

        if(auth()->validate($credentials)){
           try{
            $user = User::where('username',$credentials['username'])->first();

            if(!$user){
               throw new CustomError(404,'Username Not Exists');
               return;
            }

            $user->delete();
            return response()->json();
           
          }catch(QueryException $e){
            $ecode = $e->getCode();
            throw new CustomError(500,"Unknown error occurred. \n Please try again",null,$ecode,$e);
          }       
        }
        else{
           throw new CustomError(401,"Invalid password.");
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try{
            auth()->logout();
        
            return response()->json(['message' => 'Successfully logged out']);
        }
        catch(Exception $e){
            Log::channel('errorLog')->error($e->getMessage());
        }
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
            'expires_in' => JWTAuth::factory()->getTTL() * 150
        ]);
    }
}
