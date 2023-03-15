import {React, useState, useRef, useEffect} from 'react';

import {Link, Redirect, useHistory} from 'react-router-dom'

import axios from 'axios';

import {Col, Row} from 'react-bootstrap'


import logtog from '../actions/logtog';

import '../../css/app.css'; 
import '../../css/member.css'; 

import listSpinner from '../../images/list_spinner.gif';

import AuthShape from '../../images/auth_shape.png';


import {useSelector, useDispatch} from 'react-redux';


function AllStudents()
{

    const [loading, setLoading] = useState(true);

    const [students, setStudents] = useState([]);

    const [filter, setFilter] = useState('');


    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();

    const history = useHistory();


    useEffect(()=>{

        axios.get('/api/admin/get_all_students').then((res)=>{

            if (res.data.message == 'success')
            {
                setStudents(res.data.students);
                setLoading(false);
            }

            else if (res.data.message == 'access_refused')
            {
                history.push('/404');
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

    }, [])


    return(
        <>

        {(isLogged) ? <>

            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2> <i className="fas fa-user-graduate admin_head"></i> List of students</h2>
                        <i className="fas fa-star start_head_i"></i>
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
                                     
                                 {students.map(function(obj, index){

                                         return <Link style={ (!filter) ? null : (filter == obj['name']) ? null : {display:'none'} } to={"/member/admin/student/" + obj['name'] } key={index} className="btn btn-md"> <i className="fas fa-user-graduate"></i> { obj['name'] } </Link>

                                     }) 
                                     
                                 }

                                 </>
                            }

                        </div>

                    </div>
                
                </Col>

            </Row>

        </> : <Redirect to="/member" />}
            
        </>

    )
}

export default AllStudents;