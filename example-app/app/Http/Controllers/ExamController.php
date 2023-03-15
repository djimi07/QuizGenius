<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Student;
use App\Models\User;
use App\Models\Question;


class ExamController extends Controller
{
    public function __construct()
    {

    }

    public function postExam(Request $Request)
    {
        $validated = $Request->validate([
            'student' => 'string|required',
            'responses' => 'json|required',
        ]);

        $student = Student::where('name', $validated['student'])->first();

        if ($student)
        {
            // test if he already passed the exam

            if (!$student->exam)
            {
                $student->exam = $validated['responses'];

                $student->save();

                return response()->json([
                    'message' => 'success',
                ]);
            }

            else
            {
                return response()->json([
                    'message' => 'already_passed_the_exam',
                ]);
            }
        }

        else
        {
            return response()->json([
                'message' => 'user_not_found',
            ]);
        }

    }


    public function getQuestions()
    {
        $questions = Question::inRandomOrder()->limit(20)->get();

        return response()->json([

            'questions' => $questions,
        ]);

    }


    public function subscribeStudent(Request $Request)
    {
        $validated = $Request->validate([
            'name' => 'string|required',
            'link' => 'string|required',
        ]);

        $name = $validated['name'];
        $link = $validated['link'];

        $entry = Student::where('name', $name)->first();

        if ($entry)
        {
            return response()->json([
                'message' => 'used_name',
            ]);
        }

        else
        {
            $teacher = User::where('refferal_link', $link)->first();

            if ($teacher)
            {
                $teacher->students()->create([
                    'name' => $name,
                ]);

                return response()->json([
                    'message' => 'success',
                ]);

            }

            else
            {
                return response()->json([
                    'message' => 'error',
                ]);

            }
            
        }
    }
}
