<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductsController extends Controller
{

    public function getAllProducts(){
        try{
          $data = Products::all();
          return response()->json($data);
        }catch(Exception $e){
          return response()->json(["error"=>$e,400]);
        }  
    }

    public function getProductsByCategory(Request $request,$category){
        try{
           $products = Products::where('category', $category)->get();
           return response()->json($products);
        }catch(Exception $e){
          return response()->json(["error"=>$e,400]);
        }  
    }
}
