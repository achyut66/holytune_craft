<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class BlogpostController extends Controller
{
   
    public function index()
    {
        $blogs = BlogPost::all();
        return response()->json($blogs);
    }


    public function store(Request $request)
{
    $validatedData = $request->validate([
        'user_name' => 'required|string|max:255',
        'user_email' => 'required|string|email|max:255',
        'user_contact' => 'nullable|string|max:255',
        'posts' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'video' => 'nullable|file|mimes:mp4|max:50000', 
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
    }
    $videoPath = null;
    if ($request->hasFile('video')) {
        $videoPath = $request->file('video')->store('videos', 'public');
    }
    $blogPost = BlogPost::create([
        'user_name' => $validatedData['user_name'],
        'user_email' => $validatedData['user_email'],
        'user_contact' => $validatedData['user_contact'],
        'posts' => $validatedData['posts'],
        'image' => $imagePath,
        'video' => $videoPath,
    ]);

    return response()->json([
        'message' => 'Blog created successfully.',
        'product' => $blogPost,
    ], 200);
}

public function edit($id)
{
    $product = BlogPost::findOrFail($id);
    return Inertia::render('Blog/Editblog', [
        'product' => $product
    ]);
}


public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'user_name' => 'required|string|max:255',
        'user_email' => 'string|max:255',
        'user_contact' => 'string|max:255',
        'posts' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'video' => 'nullable|file|mimes:mp4|max:50000'
    ]);
    $product = BlogPost::findOrFail($id);
    if ($request->hasFile('image')) {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $imagePath = $request->file('image')->store('blog', 'public');
        $validatedData['image'] = $imagePath;
    } else {
        $validatedData['image'] = $product->image;
    }
    if ($request->hasFile('video')) {
        if ($product->video) {
            Storage::disk('public')->delete($product->video);
        }
        $videoPath = $request->file('video')->store('video', 'public');
        $validatedData['video'] = $videoPath;
    } else {
        $validatedData['video'] = $product->video;
    }
    $product->update($validatedData);

    return response()->json([
        'message' => 'Product updated successfully.',
        'product' => $product
    ], 200);
}


public function destroy($id)
{
    try {
        $blog = BlogPost::findOrFail($id); // Find the blog post by ID
        $blog->delete();
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }
        if ($blog->video) {
            Storage::disk('public')->delete($blog->video);
        }
        return response()->json(['message' => 'Blog deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error deleting blog', 'error' => $e->getMessage()], 500);
    }
}

}
