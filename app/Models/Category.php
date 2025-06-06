<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class Category extends Model
{
    protected $fillable = ['name'];

    public function tasks() {
        return $this->belongsToMany(Task::class);
    }
}
