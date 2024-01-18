<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

function logg($mes){
    // Log::channel('customLog')->info($mes);
    Log::stack(['single','customLog'])->info($mes);
}


Route::get('/', function () {
    return view('welcome');
});

Route::get('/log', function () {
    logg("This is my funlog");
    dd("Varlog");
});
