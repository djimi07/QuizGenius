import {React, useState, useEffect} from 'react';

import {Link, Redirect} from 'react-router-dom'

import axios from 'axios';

import {Col, Row} from 'react-bootstrap'

import Cookies from 'js-cookie';

import logtog from '../actions/logtog';

import '../../css/app.css'; 
import '../../css/member.css'; 

import AuthShape from '../../images/auth_shape.png';

import listSpinner from '../../images/list_spinner.gif';

import {useSelector, useDispatch} from 'react-redux';

function MyStudents()
{

    const [loading, setLoading] = useState(true);

    const [myStudents, setMyStudents] = useState(false);

    const [emptyList, setEmptyList] = useState(false);

    const [filter, setFilter] = useState('');

    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();


    useEffect(()=>{

        axios.get('/api/my_students').then((res)=>{

            if (res.data.message == 'empty_list')
            {
                setEmptyList(true);
                setLoading(false);
            }

            else if (res.data.message == 'success')
            {
                setMyStudents(res.data.list);
                setLoading(false);
            }

            else if (res.data.message == 'not_logged')
            {
                dispatch(logtog(0));
            }

            else
            {

            }

        }).catch((err)=>{


        })

        document.getElementById('footer').style.position = 'absolute';
        document.getElementById('footer').style.bottom = '0px';

        return () => {

            document.getElementById('footer').style.position = '';
            document.getElementById('footer').style.bottom = '';

        }

    }, []);

    return(
        <>
        {(isLogged) ? <>

            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2> <i className="fas fa-user-graduate"></i> My students</h2>
                    </div>

                    <img src={AuthShape} alt="authshape"/>

                    <div className="member_content">

                        <div className="filter_div form-group">
                            <input onChange={(e)=>setFilter(e.target.value)} name="filter" className="form-control" placeholder="search student by name"/>
                            <i className="fas fa-search"></i>
                        </div>

                        <div className="button_block scroll_button">
                            {
                                (loading) ? <>

                                    <img className={'list_spinner'} src={listSpinner} alt="loading" />
                                
                                 </> : <> 

                                     { ((!emptyList) ? 
                                     
                                     myStudents.map(function(obj, index){

                                         return <Link style={ (!filter) ? null : (filter == obj['name']) ? null : {display:'none'} } to={"/member/my_students/" + obj['name'] } key={index} className="btn btn-md"> <i className="fas fa-user-graduate"></i> { obj['name'] } </Link>

                                     }) : <>

                                         <p className="error_form"> Empty List (you don't have student yet) </p>
                                     
                                      </>)
                                     
                                     }

                                 </>
                            }
                        </div>

                    </div>
                
                </Col>

            </Row>

        </> : <Redirect to="/login" />}
            
        </>
    )
}

export default MyStudents;