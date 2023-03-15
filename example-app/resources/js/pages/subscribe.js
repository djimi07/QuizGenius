import {React, useState, useRef, useEffect} from 'react';

import {Col, Row} from 'react-bootstrap'

import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie';

import '../../css/auth.css'; 

import axios from 'axios';


import AuthShape from '../../images/auth_shape.png';

import {useSelector, useDispatch} from 'react-redux';
import logtog from '../actions/logtog.js'
import account from '../actions/account';


function Subscribe()
{
    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [usernameLengthError, setusernameLengthError] = useState(false);
    const [usernameUsed, setUsernameUsed] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [loading, setLoading] = useState(false);

    function testInputs()
    {
        setusernameLengthError(false);
        setUsernameUsed(false);
        setPasswordMatchError(false);

        setLoading(true);

        let errors = false;

        if (username.length > 30 || username.length < 3 || username.length == 0)
        {
            setusernameLengthError(true);
            errors = errors + 1;
        }

        if (password !== passwordConfirmation || password.length == 0)
        {
            setPasswordMatchError(true)
            errors = errors + 1;
        }

        return errors;
    }

    function Subscribe()
    {
        let errors = testInputs();

        if (!errors)
        {
            var data = new FormData();
                data.append('username', username);
                data.append('password', password);
                data.append('password_confirmation', passwordConfirmation);

            axios({
                url: '/api/subscribe',
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

                    dispatch(logtog(1));

                    dispatch(account({
                        'username': username,
                        'refferal_link': res.data.refferal_link,
                        'is_admin': res.data.is_admin
                    }));

                }

                else
                {

                }


            }).catch((err) => {

                let data = err.response.data;

                setLoading(false);

                if (err.response)
                {
                    if (err.response.status == 422)
                    {
                        if (/The username has already been taken/.test(data.errors.username))
                        {
                            setUsernameUsed(true);
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
                        <h2>Subscribe Panel</h2>
                    </div>

                    <img src={AuthShape} alt="authshape"/>

                    <div className="auth_form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e)=>setUsername(e.target.value)} className={"form-control " + ((usernameLengthError || usernameUsed) ? 'red_input' : null )} id="username" name="username" />
                            {(usernameLengthError) ? <p className="error_form"> username must have at least 3 characters and do not exceed 30 </p> : null}
                            {(usernameUsed) ? <p className="error_form"> username already used, please choose another </p> : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} className={"form-control " + ((usernameLengthError || usernameUsed) ? 'red_input' : null )} id="password" name="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_confirmation">Password confirmation</label>
                            <input type="password" onChange={(e)=>setPasswordConfirmation(e.target.value)} className={"form-control " + ((passwordMatchError) ? 'red_input' : null )} id="password_confirmation" name="password_confirmation" />
                            {(passwordMatchError) ? <p className="error_form"> password error  </p> : null}
                        </div>



                        <p className="subscribe_suggestion"> Already a member? <Link to="login"> login here </Link> </p>

                        <div className="submit_group">
                            <button disabled={loading} onClick={()=>Subscribe()} className="btn btn-md"> {(loading) ? 'Loading...' : 'Subscribe'} </button>
                        </div>
                    </div>
                
                </Col>

            </Row>

        </> : <Redirect to="/member" /> }
            
        </>
    )
}


export default Subscribe;