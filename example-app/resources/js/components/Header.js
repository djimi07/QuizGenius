import {React, useState, useRef, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';

import {Row, Col} from 'react-bootstrap';

import '../../css/header.css';
import Shape from '../../images/header_shape.png';



import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';

import logtog from '../actions/logtog';
import account from '../actions/account';



function Header()
{
    const history = useHistory();

    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLogged);

    function clickedLogo()
    {
        history.push('/');

    }

    function Logout(){

        axios.get('/api/logout').then((res)=>{

            if (res.data.message == 'logged_out' || res.data.message ==  'not_logged')
            {
                dispatch(logtog(0));
                dispatch(account({}));
            }


        }).catch((err)=>{


        })

    }

    return(

        <>

            <div className="container-fluid header">

                <Row className="header_row">

                    <Col className="col1" xs={6}>

                        <h1 style={{cursor:'pointer'}} onClick={()=>clickedLogo()}>RKQUIZ.me</h1>
                    
                    </Col>

                    <Col className="col2" xs={6}>

                        <Link to="/login" className="btn btn-lg"> Member </Link>

                        {(isLogged) ? <button onClick={()=>Logout()}  className="btn logout"> <i className="fas fa-sign-out-alt"></i> </button> : null}
                    
                    </Col>

                </Row>

            </div>

            <img className="header_shape" src={Shape}/>

        </>
    )
}



export default Header;