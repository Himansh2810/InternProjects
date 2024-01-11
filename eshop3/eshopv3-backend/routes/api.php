<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HandleUserController;
use App\Http\Controllers\ProductsController;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('validate:UserSchema,loginUser')->post('login', [AuthController::class,'login']);
Route::middleware('validate:UserSchema,createUser')->post('create-user',[AuthController::class,'createUser']);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::controller(AuthController::class)->group(function(){
        Route::post('logout','logout');
        Route::post('refresh', 'refresh');
        Route::post('me', 'me');
        Route::post('update-user','updateUser');
        Route::post('delete-user','deleteUser');
    });
   
});

const products_category = array('electronics' , 'jewelery',"women's clothing","men's clothing");

Route::middleware('products')->controller(ProductsController::class)->group(function(){
    Route::get('products','getAllProducts');
    Route::get('products/category/{category}','getProductsByCategory')->whereIn('category',products_category);
});

Route::group(['middleware'=>'api','prefix'=>'admin'],function(){
     Route::middleware('validate:UserSchema,adminLogin')->post('login',[AdminController::class,'login']);
     Route::post('logout',[AdminController::class,'logout']);
     Route::get('me',[AdminController::class,'me']);
     Route::middleware('validate:ProductSchema,addProduct')->post('add-product',[AdminController::class,'addProduct']);
     Route::middleware('validate:ProductSchema,addProduct')->post('update-product',[AdminController::class,'updateProduct']);
     Route::middleware('validate:UserSchema,adminLogin')->post('delete-product',[AdminController::class,'deleteProduct']);
});