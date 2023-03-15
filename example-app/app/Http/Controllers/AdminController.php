<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Student;

use Auth;


class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('isAdmin');
    }

    public function getAllProfs()
    {
        $profs = User::all('username');

        return response()->json([
            'message' => 'success',
            'profs' => $profs,
        ]);
    }

    public function getStudentsOfProf($prof)
    {
        if (!empty($prof))
        {
            $user = User::where('username', $prof)->first();

            if ($user)
            {
                $students = $user->students()->whereNotNull('exam')->get('name');

                if ($students->count() > 0)
                {
                    return response()->json([
                        'message' => 'success',
                        'students' => $students,
                    ]);
                }

                return response()->json([
                    'message' => 'empty',
                    'students' => null,
                ]);

            }

            else
            {
                return response()->json([
                    'message' => 'not_found',
                    'students' => null,
                ]);
            }

        }

        else
        {
            return response()->json([
                'message' => 'not_found',
            ]);
        }

    }

    public function getStudent($name)
    {
        if (!empty($name))
        {
            $my_student = Student::where('name', $name)->first();

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
                        'student' => null,
                    ]);
                }
            }

            else
            {
                return response()->json([
                    'message' => 'not_found',
                    'student' => null,
                ]);
            }

        }

        else
        {
            return response()->json([
                'message' => 'not_found',
                'student' => null,
            ]);
        }
    }

    public function getAllStudents()
    {
        $students = Student::whereNotNull('exam')->get('name');

        return response()->json([
            'message' => 'success',
            'students' => $students,
        ]);
    }
}
