<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () { return view('app'); });
Route::get('/{pathMatch}', function () { return view('app'); })->where('pathMatch', ".*");



Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/tasks', TaskController::class)
        ->except('create', 'edit');

    Route::resource('/categories', CategoryController::class)
        ->except('create', 'edit');
})->prefix('api');
