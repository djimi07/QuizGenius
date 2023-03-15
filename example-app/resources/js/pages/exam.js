import {React, useState, useRef, useEffect} from 'react';

import {Redirect, useHistory} from 'react-router-dom';

import {Col, Row} from 'react-bootstrap'


import Cookies from 'js-cookie';

import ContentLoader from "react-content-loader"


import {useSelector, useDispatch} from 'react-redux';

import Card from '../../images/card1.jpeg';

import '../../css/exam.css';
import '../../css/sample.css'; 
import axios from 'axios';


function Exam()
{

    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState({});
    const [cursor, setCursor] = useState(0);

    const [submitLoading, setSubmitLoading] = useState(false);

    const student = Cookies.get('student');

    const [error, setError] = useState([]);

    const [notAvailable, setNotAvailable] = useState(false);

    const history = useHistory();
    
    const isLogged = useSelector(state => state.isLogged);

    useEffect(()=>{

        axios.get('/api/get_questions').then((res)=>{

            /*if (res.data.questions.length < 20)
            {
                alert('there not enough questions on Database!')
            }
            
            else
            {
                setQuestions(res.data.questions);
                setLoading(false);

            }*/

            if (res.data.questions.length == 0)
            {
                setNotAvailable(true);
            }

            else
            {

                for (var key in res.data.questions) {

                    if (res.data.questions[key].propositions) 
                    {
                        res.data.questions[key].propositions = JSON.parse(res.data.questions[key].propositions);
                    }
                }
            }

            setQuestions(res.data.questions);
            setLoading(false);

        }).catch((err)=>{


        });
        
    }, []);


    function clickedProp(cursor, prop, e)
    {
        if (e.target.classList.contains('clicked_prop'))
        {
            e.target.classList.remove("clicked_prop");
        } else
        {
            e.target.classList.add("clicked_prop");
        }
        

        if (questions[cursor].responses)
        {
            var regex = new RegExp(prop, 'g');

            if (regex.test(questions[cursor].responses))
            {
                let res = questions[cursor].responses;
                    res = res.replace(regex, '');

                questions[cursor].responses = res;
            }

            else
            {
                questions[cursor].responses = questions[cursor].responses + prop;
            }
        }

        else
        {
            questions[cursor].responses = prop;
        }

        
    }

    function putJustification(e)
    {
        questions[cursor].justification = e.target.value;


    }

    function next()
    {
        (cursor == questions.length-1) ? null : setCursor(cursor+1);

        setError([]);

        window.scrollTo(0, document.getElementById('q').offsetTop);
    }

    function back()
    {
        (cursor == 0) ? null : setCursor(cursor-1);

        setError([]);

        window.scrollTo(0, document.getElementById('q').offsetTop);
    }


    function submit()
    {
        setSubmitLoading(true);
        setError([]);

        let errors = [];

        questions.map((obj, index)=>{

            if (obj.responses == undefined && obj.justification == undefined )
            {
                errors.push(index+1);
                setSubmitLoading(false);
            }

        })

        if (errors.length > 0)
        {
            setError(errors);
            setSubmitLoading(false);
        }

        else
        {

        var data = new FormData();
            data.append('student', Cookies.get('student'))
            data.append('responses', JSON.stringify(questions));
        
        axios.post('/api/postExam', data).then((res)=>{

            if (res.data.message == 'success')
            {
                alert('You have done your Exam');

                history.push('/');


            }

            else if (res.data.message == 'user_not_found')
            {
                alert('an error occured, Please restart with the link given to you');
                history.push('/');
            }

            else if (res.data.message == 'already_passed_the_exam')
            {
                alert('you have already passed this exam, try with another unique name');
                history.push('/');
            }

            else
            {
                location.reload();
            }


        }).catch((err)=>{

            location.reload();

        })

        }

    }

    return(
        <>

        {(student) ? <> 

            {(loading) ? <>

                <Skeleton/>

             </> : <> 

            {(!notAvailable) ?

            <>
                 
            <Row className="sample_row">

                <Col className="sample_col" xs={{span:12}} sm={{span:10, offset:1}} lg={{span:8, offset:2}}>

                    <div className="title">
                        <h2>Exam</h2>
                    </div>

                    <div id="q" className="question_block">

                        <p>Q {(cursor+1)} : {questions[cursor]['question']}</p>

                        {(questions[cursor]['image']) ? <img src={location.protocol + '//' + window.location.hostname + '/' + questions[cursor]['image']} alt="card_play" /> : null}

                    </div>

                    <div className="propositions_choice">
                        { 
                            (questions !== null) ? 

                                questions.map(function(obj, index){

                                    if (obj.propositions !== null)
                                    {
                                        return obj.propositions.map(function(prop, index_prop){

                                            return <button style={(index == cursor) ? {display:''} : {display:'none'}} onClick={(e)=>clickedProp(cursor, prop[0], e)} key={index_prop} className="btn btn-lg"> {prop[0]} </button>
        
                                        }) 
                                    }

                            }) : null
                        }
                    </div>

                    <div className="propositions_infos">
                        {
                            (questions[cursor].propositions !== null) ? 

                                questions[cursor].propositions.map(function(obj, index){

                                    if (obj[1])
                                    {
                                        return <p key={index}>{obj[0]} - {obj[1]}</p>;
                                    }

                                }) : null
                        }
                    </div>

                    <div className="proposition_justification">

                    {
                            (questions !== null) ? 

                                questions.map(function(obj, index){

                                    return <input key={index} style={(index == cursor) ? {display:''} : {display:'none'}} onChange={(e)=>putJustification(e)} type="text" placeholder="Justification - optional" className="form-control" name="justification" id="justification" />;

                                }) : null
                    }

                    </div>


                    {(error.length > 0 && cursor == questions.length-1) ? (error.map((obj, index)=>{

                            return <p style={{marginTop:'5px'}} className="error_form" key={index}> You have forgot to respond to question <strong> {obj} </strong> </p>

                    })) : null}

                    <div className="paginate_group">

                        {(cursor == 0) ? null : <button onClick={()=>back()} className="btn btn-lg back"> <i className="fas fa-backward"> </i> Back</button>}
                        {(cursor == questions.length-1) ? null : <button onClick={()=>next()} className="btn btn-lg next">  Next <i className="fas fa-forward"> </i></button>}

                        {(cursor == questions.length-1) ? <button disabled={submitLoading} onClick={()=>submit()} className="btn btn-lg next"> {(submitLoading) ? 'Loading...' : 'Submit'} </button> : null }
                        
                    </div>

                </Col>

            </Row>

            </>
             
            : <h2 style={{color:'red'}}>  There is no questions on databases </h2>}

            </>}



        </> : <Redirect to="/"/>}

            
        </>
    )
}



function Skeleton()
{
    return (

        <ContentLoader
        speed={1}
        backgroundColor="#544590"
        foregroundColor="#45377b"
        style={{ width: '100%', height:'550px' }} >

        <rect x="0" y="0" rx="0" ry="0" width="100%" height="50" /> 
        <rect x="0" y="60" rx="0" ry="0" width="100%" height="400" /> 
        <rect x="0" y="470" rx="0" ry="0" width="100%" height="50" /> 
 
        </ContentLoader>
    )
}


export default Exam;