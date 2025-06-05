<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;

Route::get('/{pathMatch}', function () {
    return view('app');
})->where('pathMatch', '^(?!api).*$');
