<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\AccountCheckController;

use App\Http\Controllers\AddQuestionController;

use App\Http\Controllers\LinkCheckController;
use App\Http\Controllers\ExamController;

use App\Http\Controllers\MemberController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{all}', function () {return view('home');})->where('all', '^((?!api).)*');

Route::post('/api/subscribe', [SubscribeController::class, 'postSubscribe']);
Route::post('/api/login', [LoginController::class, 'postLogin']);
Route::get('/api/logout', [LogoutController::class, 'logout']);
Route::get('/api/accountCheck', [AccountCheckController::class, 'account']);

Route::post('/api/add_question', [AddQuestionController::class, 'postQuestion']);

Route::post('/api/check_link', [LinkCheckController::class, 'checkLink']);
Route::post('/api/subscribe_to_exam', [ExamController::class, 'subscribeStudent']);
Route::get('/api/get_questions', [ExamController::class, 'getQuestions']);
Route::post('/api/postExam', [ExamController::class, 'postExam']);

Route::get('/api/my_students', [MemberController::class, 'myStudents']);
Route::get('/api/my_students/{name}', [MemberController::class, 'Student']);

Route::get('/api/admin/get_all_profs', [AdminController::class, 'getAllProfs']);
Route::get('/api/admin/get_all_students', [AdminController::class, 'getAllStudents']);
Route::get('/api/admin/{prof}/students', [AdminController::class, 'getStudentsOfProf']);
Route::get('/api/admin/students/{name}', [AdminController::class, 'getStudent']);

Route::post('/api/upload', [AddQuestionController::class, 'upload']);










