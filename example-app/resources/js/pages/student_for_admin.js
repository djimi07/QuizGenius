import {React, useState, useEffect} from 'react';

import { useParams, Redirect } from 'react-router-dom';

import {Col, Row} from 'react-bootstrap'


import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';


import ContentLoader from 'react-content-loader';


import '../../css/sample.css'; 
import '../../css/student.css'; 


function StudentForAdmin()
{

    const [notFound, setNotFound] = useState(false);

    const [loading, setLoading] = useState(true);

    const [list, setList] = useState([]);

    const isLogged = useSelector(state => state.isLogged);

    const params = useParams();

    const dispatch = useDispatch();

    useEffect(()=>{

        axios.get('/api/admin/students/'+params.name).then((res)=>{

            if (res.data.message == 'success')
            {
                setLoading(false);
                setList(JSON.parse(res.data.student.exam));
                
            }

            else if (res.data.message == 'access_refused')
            {
                history.push('/404');
            }

            else if (res.data.message == 'not_logged')
            {
                dispatch(logtog(0));
            }

            else if (res.data.message == 'not_found')
            {
                setLoading(false);
                setNotFound(true);
            }

            else
            {

            }

        }).catch((err)=>{


        })

    }, []);


    return(
        <>

        {(isLogged) ? <>

        {(loading) ? <>

            <Row className="sample_row">
                <Col xs={{span:12}}>
                    <Row>
                        <Col xs={12} md={6} >
                            <Skeleton/>
                        </Col>

                        <Col xs={12} md={6}>
                            <Skeleton/>
                        </Col>

                        <Col xs={12} md={6}>
                            <Skeleton/>
                        </Col>

                        <Col xs={12} md={6}>
                            <Skeleton/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        
        </>

        : <>

        {(notFound) ? <Redirect to='/404' /> : <> 

         <Row className="sample_row">
                <Col className="sample_col" xs={{span:12}} sm={{span:10, offset:1}}>

                    <div className="title">
                        <h2> <i className="fas fa-user-graduate"> </i> { params.name } </h2>
                    </div>

                    <Row>
                        {(list) ? <>
                            {
                                list.map(function(obj,index){

                                    return <Col key={index} xs={12} md={6}  className="card_response">

                                    <div className="question_block">
                                        <p> Q{index+1} : {obj['question']} </p>
                                        {(obj['image']) ? <img src={location.protocol + '//' + window.location.hostname + '/' + obj['image']} alt="image" /> : null}
                                    </div>
        
                                    <div className="propositions_choice">
                                        {(obj['propositions'] !== undefined) ? <>

                                            {obj['propositions'].map(function(prop, indexProp){

                                                return <button style={(obj['responses']) ? (obj['responses'].indexOf(prop[0]) !== -1 ) ? {backgroundColor:'#352764', color:'white'} : null : null } key={prop[0]} className="btn btn-lg">{prop[0]}</button>

                                            })}
                                        
                                        </> : <>
                                        
                                        </>}
                                    </div>
        
                                    <div className="propositions_infos">
                                        {(obj['propositions'] !== undefined) ? <>

                                            {obj['propositions'].map(function(prop, indexProp){

                                                if (prop[1])
                                                {
                                                    return <p style={(obj['responses']) ? (obj['responses'].indexOf(prop[0]) !== -1 ) ? {fontWeight:'bold'} : null : null } key={indexProp}>{prop[0]} - {prop[1]}</p>

                                                }
                                            }
                                            )}
                                        
                                        </> : <>
                                        
                                        </>}
                                    </div>
        
                                    <div className="proposition_justification">
                                        {(obj['justification']) ? <p className="read_only">{(obj['justification'])}</p> : ''}
                                    </div>
        
                                    </Col>
                                })
                            }
                         </> : <> 

                         <p className='error_form'>Not found</p>
                         
                         </>
                        }
                    </Row>

                </Col>
         </Row>
         
         </>}
        
        </>}

        </> : <Redirect to="/login" />}
            
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
        style={{ width: '100%', height:'450px' }} >

        <rect x="0" y="0" rx="0" ry="0" width="100%" height="400" /> 
        </ContentLoader>
    )
}


export default StudentForAdmin;