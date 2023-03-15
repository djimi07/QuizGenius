import {React, useState, useEffect} from 'react';

import { useParams, useHistory} from 'react-router-dom'

import axios from 'axios';

import {Col, Row} from 'react-bootstrap'

import Cookies from 'js-cookie';

import '../../css/app.css'; 

import LoadingLinkSpinner from '../../images/loading_link.gif'


import AuthShape from '../../images/auth_shape.png';

import {useSelector, useDispatch} from 'react-redux';


function ExamSubscribe()
{

    const isLogged = useSelector(state => state.isLogged);

    const [goodLink, setGoodLink] = useState(false);
    const [badLink, setBadLink] = useState(false);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [usedName, setUsedName] = useState(false);

    const [loading, setLoading] = useState(false);


    const params = useParams();
    const history = useHistory();

    useEffect(()=>{

        document.getElementById('footer').style.position = 'absolute';
        document.getElementById('footer').style.bottom = '0px';

        //test link if exist

        let link = '/exam' + '/' + params.username + '/' + params.token;

        let data = new FormData()
            link = data.append('link', link)

        axios.post('/api/check_link', data).then((res)=>{

            if (res.data.message == 'good_link')
            {
                setGoodLink(true);
            }

            else if (res.data.message == 'bad_link')
            {
                setBadLink(true);
            }

        }).catch((err)=>{

            

        })

        return () => {

            document.getElementById('footer').style.position = '';
            document.getElementById('footer').style.bottom = '';

        }

    }, []);


    function submit()
    {
        setLoading(true);
        setNameError(false);
        setUsedName(false);

        if (!name)
        {
            setNameError(true);
            setLoading(false);
        }

        else
        {
            let link = '/exam' + '/' + params.username + '/' + params.token;

            let data = new FormData();
                data.append('name', name);
                data.append('link', link)

            axios.post('/api/subscribe_to_exam', data).then((res)=>{

                if (res.data.message == 'success')
                {
                    Cookies.set('student', name);

                    history.push('/exam/start');

                }

                else if (res.data.message == 'used_name')
                {
                    setUsedName(true);
                    setLoading(false);

                }

                else if (res.data.message == 'error')
                {
                    setUsedName(false);
                    setLoading(false);
                    setGoodLink(false);
                    setBadLink(true);
                }

            }).catch((err)=>{


            });
        }

    }

    return(
        <>
            <Row className="card_row">

                <Col className="card_col" xs={{span:12}} sm={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:6, offset:3}}>

                    <div className="card_head">
                        <h2>Exam subscription</h2>
                    </div>

                    <img src={AuthShape} alt="authshape"/>

                    <div className="auth_form">

                        {(goodLink) ? <>

                            <div style={{textAlign:'center'}} className="form-group">
                                <label htmlFor="name">Choose a unique name</label>
                                <input onChange={(e)=>setName(e.target.value)} className="form-control" id="name" name="name" />
                            </div>

                            {(nameError) ? <p className="error_form"> This field is required!  </p> : null}
                            {(usedName) ? <p className="error_form"> this name is already used ! please choose another  </p> : null}

                            <div style={{textAlign:'center'}} className="submit_group">
                                <button disabled={loading} onClick={()=>submit()} className="btn btn-md"> {(loading) ? 'Loading...' : 'Start'} </button>
                            </div>
                        
                         </> : <> 

                             {(badLink) ? <> <p className="error_form"> Bad Link </p> </> : <img style={{width:'100px', height:'100px'}} src={LoadingLinkSpinner} alt="spinner" />}
                         
                         </>}

                    </div>
                
                </Col>

            </Row>
            
        </>
    )
}

export default ExamSubscribe;