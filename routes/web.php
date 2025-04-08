<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return inertia::render('Signin');
});
Route::get('/Signin', function () {
    return inertia::render('Signin');
});
Route::get('/Signup', function () {
    return inertia::render('Signup');
});
Route::get('/Dashboard', function () {
    return inertia::render('Dashboard');
});
