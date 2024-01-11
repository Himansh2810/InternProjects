<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Products;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
use \Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function addProduct(){
         try{
            $credentials = request(["title",
                                    "category",
                                    "price",
                                    "description",
                                    "rating",
                                    "ratingCount",
                                    "imageUrl"    
                                ]);

            // print_r(request()->all());

            Products::create($credentials); 

            return response()->json(["status"=>200]);
        }catch(Exception $e){

            Log::error($e);
            return response()->json(["status"=>400,"error"=>$e]);
        }
    }

    public function updateProduct(){
         try{
          
            $product = Products::where('id',request('id'))->first();

            if($product){


                $prods = array("title",
                               "category",
                               "price",
                               "rating",
                               "ratingCount",
                               "imageUrl",
                               "description"
                );

                foreach($prods as $atr){
                    $product->$atr = request($atr);
                }

                $product->update();

                return response()->json(['status'=>200]);


            }else{
                return response()->json(['status'=>500]);
            }
             
        }catch(Exception $e){

            Log::error($e);
            return response()->json(["status"=>400,"error"=>$e]);
        }
    }
    
     public function deleteProduct(){

        
           $product = Products::where('id',request('id'))->first();

           if($product){
            
             $product->delete();
             return response()->json(['status'=>200]);
           }
           else{
             return response()->json(['status'=>500]);
           }
        
    }

    public function login()
    {
        $credentials = request(['username', 'password']);



        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

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
            'expires_in' => JWTAuth::factory()->getTTL() * 500,
        ]);
    }
}
