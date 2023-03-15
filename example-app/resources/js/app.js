import {React, useState, useRef, useEffect} from 'react';
import { Link, Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import {Row, Col, Spinner} from 'react-bootstrap';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';

import Header from './components/Header.js'
import Footer from './components/Footer.js'

import Login from './pages/login.js'
import Subscribe from './pages/subscribe.js'
import Member from './pages/member.js'
import ExamSubscribe from './pages/exam_subscribe.js'
import Exam from './pages/exam.js'
import AddQuestion from './pages/add_question.js';
import MyStudents from './pages/my_students.js'
import Student from './pages/student.js';
import NotFound from './pages/not_found.js';

import AllStudents from './pages/all_students'
import Allprofs from './pages/all_profs.js'
import AllStudentsOfProf from './pages/all_students_of_prof.js';
import StudentForAdmin from './pages/student_for_admin.js'


import Home from './pages/home.js';

import '../css/app.css';

import logtog from './actions/logtog.js';
import account from './actions/account.js';

import Cookies from 'js-cookie';


function App()
{
    const [checker, setChecker] = useState(0);

    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLogged);
    
    const account_data = useSelector(state => state.account);
    const size = Object.keys(account_data).length;

    useEffect(()=>{

        if (isLogged)
        {
            axios.get('/api/accountCheck').then((res)=>{

                if (res.data.message == 'success')
                {
                    Cookies.set('isLogged', 1);

                    dispatch(account({
                        'username': res.data.username,
                        'refferal_link': res.data.refferal_link,
                        'is_admin': res.data.is_admin
                    }));
                }

                else if(res.data.message ==  'not_logged')
                {
                    dispatch(logtog(0));
                    dispatch(account({}));
                }

                else
                {

                }

            }).catch((err)=>{

                if (err.response)
                {
                    if (err.response.status == 401)
                    {
                        dispatch(logtog(0));
                    }
                }
            });
        }

    }, [checker]);

    return(
        <>
            <Header/>

            <div className="content container-fluid">

                <Switch>

                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/subscribe" exact component={Subscribe} />
                    <Route path="/member" exact component={Member} />

                    <Route path="/member/add_question" exact component={AddQuestion} />
                    <Route path="/member/my_students" exact component={MyStudents} />
                    <Route path="/member/my_students/:name" exact component={Student} />

                    <Route path="/member/admin/all_profs" exact component={Allprofs} />
                    <Route path="/member/admin/all_students" exact component={AllStudents} />

                    <Route path="/member/admin/prof/:username" exact component={AllStudentsOfProf} />
                    <Route path="/member/admin/student/:name" exact component={StudentForAdmin} />


                    <Route path="/exam/:username/:token" exact component={ExamSubscribe} />
                    <Route path="/exam/start" exact component={Exam} />

                    <Route component={NotFound}/>

                </Switch>

            </div>


            <Footer/>

        </>
    )

}


export default App;

