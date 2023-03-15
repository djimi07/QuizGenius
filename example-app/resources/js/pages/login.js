import {React, useState} from 'react';

import {Link, Redirect} from 'react-router-dom'

import axios from 'axios';

import {Col, Row} from 'react-bootstrap'

import Cookies from 'js-cookie';

import '../../css/auth.css'; 
import '../../css/app.css'; 

import AuthShape from '../../images/auth_shape.png';


import {useSelector, useDispatch} from 'react-redux';
import logtog from '../actions/logtog.js'
import account from '../actions/account';



function Login()
{

    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState(false);

    const [loading, setLoading] = useState(false);

    function testInputs()
    {
        setUsernameError(false);
        setPasswordError(false);
        setLoginError(false);

        setLoading(true);

        let errors = false;

        if (username.length == 0)
        {
            setUsernameError(true);
            errors = errors + 1;
        }

        if (password.length == 0)
        {
            setPasswordError(true)
            errors = errors + 1;
        }

        return errors;
    }

    function Login()
    {
        let errors = testInputs();

        if (!errors)
        {
            var data = new FormData();
                data.append('username', username);
                data.append('password', password);

            axios({
                url: '/api/login',
                method: 'POST',
                data: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{

                if (res.data.message == 'success' || res.data.message == 'already connected')
                {
                   
                    Cookies.set('isLogged', 1);

                    dispatch(account({
                        'username': username,
                        'refferal_link': res.data.refferal_link,
                        'is_admin': res.data.is_admin
                    }));

                    dispatch(logtog(1));

                }

                else if (res.data.message == 'not_found')
                {
                    setLoginError(true);
                    setLoading(false);

                    dispatch(logtog(0));
                }


            }).catch((err) => {

                let data = err.response.data;

                setLoading(false);

                if (err.response)
                {
                    if (err.response.status == 422)
                    {
                        
                    }

                    else
                    {
                        location.reload();
                    }
                }

                else
                {
                    location.reload();
                }

            })

        }

        else
        {
            setLoading(false);
        }
    }

    return(
        <>

        {(!isLogged) ? <>

            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2>Login Panel</h2>
                    </div>

                    <img src={AuthShape} alt="authshape"/>

                    <div className="auth_form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e)=>setUsername(e.target.value)} className={"form-control " + ((usernameError || loginError) ? 'red_input' : null )} id="username" name="username" />
                            {(usernameError) ? <p className="error_form"> empty username field </p> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e)=>setPassword(e.target.value)} className={"form-control " + ((passwordError || loginError) ? 'red_input' : null )} id="password" name="password" />
                            {(passwordError) ? <p className="error_form"> empty password field  </p> : null}
                        </div>

                        
                        {(loginError) ? <p style={{marginBottom:'16px'}} className="error_form"> Login Error (not found) </p> : null}


                        <p className="subscribe_suggestion"> Not yet a member ? <Link to="subscribe"> subscribe here </Link> </p>

                        <div className="submit_group">
                        <button disabled={loading} onClick={()=>Login()} className="btn btn-md"> {(loading) ? 'Loading...' : 'Login'} </button>
                        </div>
                    </div>
                
                </Col>

            </Row>

        </> : <Redirect to="/member" />}
            
        </>
    )
}


export default Login;