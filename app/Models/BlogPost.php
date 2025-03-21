<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;
    protected $table = "blog_post";
    protected $fillable = [
        'user_name',
        'user_email',
        'user_contact',
        'posts',
        'image', 
        'video'
    ];
}
