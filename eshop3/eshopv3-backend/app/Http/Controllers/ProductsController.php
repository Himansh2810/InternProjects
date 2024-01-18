<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomError;
use App\Models\Products;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductsController extends Controller
{

    public function getAllProducts(){
        try{
          $data = Products::all();
          return response()->json($data);
        }catch(QueryException $e){
          $ecode = $e->getCode();
          throw new CustomError(500,"Unable to get Products. \n Please try again",null,$ecode,$e);
        }  
    }

    public function getProductsByCategory(Request $request,$category){
        try{
           $products = Products::where('category', $category)->get();
           return response()->json($products);
        }catch(QueryException $e){
          $ecode = $e->getCode();
          throw new CustomError(500,"Unable to get Products. \n Please try again",null,$ecode,$e);
        }  
    }
}
