<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\QuestionRequest;

use App\Models\Question;


class AddQuestionController extends Controller
{

    public function __construct()
    {
        $this->middleware('isLogged'); //must be logged
        //return 'not_logged'
    }


    public function postQuestion(QuestionRequest $QuestionRequest)
    {
        $question = new Question;
        
        if (!empty($QuestionRequest->only('question')['question']))
        {
            $question->question = $QuestionRequest->only('question')['question'];
        }

        if (!empty($QuestionRequest->file('image')))
        {
            $path = $QuestionRequest->file('image')->store('public');

            $question->image = str_replace('public', 'storage', $path);
        }

        if (!empty($QuestionRequest->only('propositions')['propositions']))
        {
            $question->propositions = $QuestionRequest->only('propositions')['propositions'];
        }

        $question->save();

        return response()->json([
            'message' => 'success',
        ]);

    }

    /* freelance test

    public function upload(Request $Request)
    {
        if (!empty($Request->file('image')))
        {
            $path = $Request->file('image')->store('public');
        }

        return 'success';

    }

    */
}
