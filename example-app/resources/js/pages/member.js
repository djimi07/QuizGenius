import {React, useState, useRef, useEffect} from 'react';

import {Link, Redirect} from 'react-router-dom'


import {Col, Row} from 'react-bootstrap'


import '../../css/app.css'; 
import '../../css/member.css'; 

import AuthShape from '../../images/auth_shape.png';
import RightShape from '../../images/card_right_shape.png';


import {useSelector, useDispatch} from 'react-redux';


function Login()
{

    const isLogged = useSelector(state => state.isLogged);

    const account = useSelector(state => state.account);

    return(
        <>

        {(isLogged) ? <>

            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2>My Account</h2>
                    </div>

                    <img src={AuthShape} alt="authshape"/>

                    <div className="member_content">

                        <div className="profile">
                            <i className="user_i fas fa-user-circle"></i>
                            <div className="user_info">
                                <p className="user_p">{account.username}</p>
                                {(parseInt(account.is_admin) == 1) ? <p className="is_admin"> <i className="fas fa-star"></i> admin</p> : null}
                            </div>
                        </div>

                        <div className="referal_block">
                            <p className="referal_label"><i className="fas fa-link"></i> Refferal link for exam</p>
                            <p className="referal_link"><i className="fas fa-clone"></i> <span> {location.protocol + '//' + window.location.hostname + account.refferal_link} </span></p>
                        </div>


                        <div className="button_block">

                            <Link to="/member/add_question" className="btn btn-md"> <i className="fas fa-plus"></i> Add questions</Link>
                            <Link to="/member/my_students" className="btn btn-md"> <i className="fas fa-file-alt"> </i> See student responses</Link>

                        </div>
                       
                    </div>
                
                </Col>

            </Row>

            {(parseInt(account.is_admin) == 1) ? <>
            
            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2> <i className="fas fa-star"> </i> Admin Panel</h2>
                    </div>

                    <img src={RightShape} alt="authshape"/>

                    <div className="member_content">

                        <div className="button_block">

                            <Link to="/member/admin/all_profs" className="btn btn-md admin"> <i className="fas fa-users"></i> See All proffessors </Link>
                            <Link to="/member/admin/all_students" className="btn btn-md admin"> <i className="fas fa-copy"> </i> See All student exams</Link>

                        </div>
                       
                    </div>
                
                </Col>

            </Row>

            </> : null}






        </> : <Redirect to="/login" />}
            
        </>
    )
}


export default Login;