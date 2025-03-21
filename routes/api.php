<?php

use App\Http\Controllers\BlogpostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ProductDetailsController;
use App\Models\Productdetails;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/cart', [CartController::class, 'addToCart']);
Route::get('/cart/count', [CartController::class, 'getCartCount']);
Route::get('/allcart', [CartController::class, 'getAllCart']);
Route::get('/products', [ProductDetailsController::class, 'index']);
Route::get('/category', [ProductDetailsController::class, 'get_by_category']);
Route::get('/accesories-cat',[ProductDetailsController::class,'get_accesory_category']);
Route::get('/instrument-cat',[ProductDetailsController::class,'get_instrument_category']);
Route::get('/singing-cat',[ProductDetailsController::class,'get_singing_category']);

// cms 
Route::post('/store', [ProductDetailsController::class, 'store']);
Route::delete('/products/{Id}', [ProductDetailsController::class, 'destroy']);
Route::match(['PUT', 'POST'], '/products-update/{id}', [ProductDetailsController::class, 'update']);

// categories
Route::get('/getitemsbyname',[ProductDetailsController::class,'getProductsByCategory']);

// email api
Route::post('/sendemail', [EmailController::class, 'sendEmail']);

// new dashboard
Route::get('/newproduct',[ProductDetailsController::class,'getNewProduct']);
Route::get('/saleproduct',[ProductDetailsController::class,'getSaleProduct']);

// blog api
Route::get('/blogpost',[BlogpostController::class,'index']);
Route::post('/blogstore',[BlogpostController::class,'store']);
Route::delete('/blogstore/{id}', [BlogpostController::class, 'destroy']);
Route::match(['PUT', 'POST'], '/blog-update/{id}', [BlogpostController::class, 'update']);


