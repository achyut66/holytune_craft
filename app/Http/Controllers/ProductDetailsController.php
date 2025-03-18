<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\ProductDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ProductDetailsController extends Controller
{
   
    public function index()
    {
        $products = ProductDetails::all();
        return response()->json($products);
    }

    public function get_by_category(Request $request)
{
    $categories = $request->input('categories', ['Himalaya']);
    if (!is_array($categories)) {
        $categories = [$categories];
    }

    $products = DB::table('products')
                 ->whereIn('category', $categories)
                 ->get();

    return response()->json($products);
}
public function getProductsByCategory(Request $request)
    {
        $category = $request->query('name', 'Himalayas'); 
        $products = ProductDetails::where('category', $category)->get();
        return response()->json($products);
    }
public function get_singing_category($categories = ['Himalaya','Carved','Full Moon','7 Chakra','Antique']){
    if (!is_array($categories)) {
        $categories = [$categories];
    }

    $data = DB::table('products')
                ->whereIn('category', $categories) 
                ->get();

    return $data;
}
public function get_accesory_category($categories = ['Singing Bowl Striker','Resting Cushion','Protective Bags']){
    if (!is_array($categories)) {
        $categories = [$categories];
    }

    $data = DB::table('products')
                ->whereIn('category', $categories) 
                ->get();

    return $data;
}
public function get_instrument_category($categories = ['Gongs','Tingsha & Bells']){
    if (!is_array($categories)) {
        $categories = [$categories];
    }

    $data = DB::table('products')
                ->whereIn('category', $categories) 
                ->get();

    return $data;
}

    public function show($id, Request $request)
    {
    $product = ProductDetails::findOrFail($id);
    if ($request->wantsJson()) {
        return response()->json($product);
    }
    return Inertia::render('Products', [
        'product' => $product
    ]);
    }
    public function create()
    {
        return Inertia::render('CreateProduct');
    }

    public function store(Request $request)
{

    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'detail_info' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'currency' => 'required|string|max:10',
        'category' => 'required|string',
        'image' => 'nullable|file|mimes:jpg,jpeg,png', // Image is now nullable
        'sound' => 'nullable|file|mimes:mp3', // Sound is now nullable
        'weight' => 'required|numeric',
        'diameter' => 'required|numeric',
        'd_unit' => 'required|string|max:10',
        'discount_percent' => 'required|numeric',
        'quantity' => 'required|integer',
        'q_unit' => 'required|string|max:10',
        'flag' => 'integer|max:10',
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
    }

    $soundPath = null;
    if ($request->hasFile('sound')) {
        $soundPath = $request->file('sound')->store('sound', 'public');
    }

    // Save product details in the database
    $products = ProductDetails::create([
        'name' => $validatedData['name'],
        'detail_info' => $validatedData['detail_info'],
        'description' => $validatedData['description'],
        'price' => $validatedData['price'],
        'currency' => $validatedData['currency'],
        'category' => $validatedData['category'],
        'image' => $imagePath,
        'sound' => $soundPath,
        'weight' => $validatedData['weight'],
        'diameter' => $validatedData['diameter'],
        'd_unit' => $validatedData['d_unit'],
        'discount_percent' => $validatedData['discount_percent'],
        'quantity' => $validatedData['quantity'],
        'q_unit' => $validatedData['q_unit'],
        'flag' => $validatedData['flag'],
    ]);

    return response()->json([
        'message' => 'Product created successfully.',
        'product' => $products
    ], 200);
}

public function edit($id)
{
    $product = ProductDetails::findOrFail($id);
    return Inertia::render('Administrator/ProductsEdit', [
        'product' => $product
    ]);
}


public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'name' => 'string|max:255',
        'detail_info' => 'string|max:255',
        'description' => 'string|max:255',
        'price' => 'numeric',
        'currency' => 'string|max:10',
        'category' => 'string',
        'image' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
        'sound' => 'nullable|file|mimes:mp3|max:10240',
        'weight' => 'numeric',
        'diameter' => 'numeric',
        'd_unit' => 'string|max:10',
        'discount_percent' => 'numeric',
        'quantity' => 'integer|max:10',
        'q_unit' => 'string|max:10',
        'flag' => 'integer|max:10',
    ]);

    $product = ProductDetails::findOrFail($id);

    if (!$request->hasFile('image')) {
        $validatedData['image'] = $product->image;
    } else {
        $imagePath = $request->file('image')->store('image', 'public');
        $validatedData['image'] = $imagePath;
    }

    if (!$request->hasFile('sound')) {
        $validatedData['sound'] = $product->sound;
    } else {
        $soundPath = $request->file('sound')->store('sound', 'public');
        $validatedData['sound'] = $soundPath;
    }
    $product->update($validatedData);

    return response()->json([
        'message' => 'Product updated',
        'product' => $product
    ], 200);
}


    public function destroy($id)
{
    try {
        $product = ProductDetails::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error deleting product', 'error' => $e->getMessage()], 500);
    }
}
}
