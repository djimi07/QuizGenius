<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Auth;

class MemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('isLogged'); //auth Required
    }

    public function Student($name)
    {
        if (empty($name))
        {
            return response()->json([
                'message' => 'not_found',
                'student' => [],
            ]);
        }

        $my_student = Auth::user()->students()->where('name', $name)->first();

        if ($my_student)
        {
            if ($my_student->exam !== null)
            {
                return response()->json([
                    'message' => 'success',
                    'student' => $my_student,
                ]);
            }

            else
            {
                return response()->json([
                    'message' => 'not_found',
                    'student' => [],
                ]);
            }
        }

        else
        {
            return response()->json([
                'message' => 'not_found',
                'student' => [],
            ]);
        }
    }

    public function myStudents(Request $Request)
    {
        $my_students = Auth::user()->students()->whereNotNull('exam')->get('name');

        if ($my_students->count() == 0)
        {
            return response()->json([
                'message' => 'empty_list',
                'list' => null,
            ]);
        }

        else
        {
            return response()->json([
                'message' => 'success',
                'list' => $my_students,
            ]);
        }
    }
}
