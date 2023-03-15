import {React, useState} from 'react';

import { Redirect } from 'react-router-dom';

import {Col, Row} from 'react-bootstrap'


import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import logtog from '../actions/logtog'



import '../../css/add_question.css';
import '../../css/sample.css'; 


function AddQuestion()
{

    const [question, setQuestion] = useState('');

    const [imageUrl, setImageUrl] = useState();
    const [image, setImage] = useState();
    const [imageSizeError, setImageSizeError] = useState(false);
    const [imageTypeError, setImageTypeError] = useState(false);

    const [propositions, setPropositions] = useState([]);
    const [limitProp, setLimitProp] = useState(false);

    const [missed, setMissed] = useState(false);

    const [loading, setLoading] = useState(false);


    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();


    const alphabet = [['A',''], ['B',''], ['C',''], ['D',''], ['E','']];

    function addProposition()
    {
        const length = propositions.length;

        (length == 5) ? setLimitProp(true) : setPropositions(propositions => [...propositions, alphabet[length]]);
    }
        
    function addPropText(e, index)
    {
        propositions[index][1] = e.target.value;
    }

    function imageChange(e)
    {
        setImageSizeError(false);
        setImageTypeError(false);

        if (e.target.files[0].size > 10000000)
        {
            setImageSizeError(true)
        }

        else if(/image/.test(e.target.files[0].type) == false)
        {
            setImageTypeError(true);
        }

        else
        {
            setImageUrl(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
       
    }


    function SubmitQuestion()
    {
        setLoading(true);
        setMissed(false);

        if (!question && !image)
        {
            setMissed(true);
            setLoading(false);
        }

        else
        {
            let data = new FormData();
                (question) ? data.append('question', question) : null;
                (image) ? data.append('image', image) : null;
                (propositions.length > 0) ? data.append('propositions', JSON.stringify(propositions)) : null;

            axios.post('/api/add_question', data).then((res)=>{

                if (res.data.message == 'success')
                {
                    alert('your question has been added to database');
                    location.reload();
                }

                else if (res.data.message == 'not_logged')
                {
                    dispatch(logtog(0))
                }

                else
                {

                }

            }).catch((err)=>{

                location.reload();

            });
        }

    }

    return(
        <>

        {(isLogged) ? <>

            <Row className="sample_row">

                <Col className="sample_col" xs={{span:12}} sm={{span:10, offset:1}} lg={{span:8, offset:2}}>

                    <div className="title">
                        <h2> <i className="fas fa-plus"> </i> Add question to database</h2>
                    </div>

                    <div className="question_div">
                        <input onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Question text here?" className="form-control" name="question"/>
                    </div>

                    <div className="upload_image">
                        <input onChange={(e)=>imageChange(e)} type="file" name="image"  />

                        <div className="background_upload">
                            <i className="fas fa-upload"></i>
                            <span>Upload image</span>
                        </div>

                        {imageUrl ? <> <img className="image_view" src={imageUrl} alt="image" /> </> : null}

                    </div>

                            
                    {(imageSizeError) ? <p className="error_form"> The image size must not exceed 10MB </p> : null}
                    {(imageTypeError) ? <p className="error_form"> The file must be an image! </p> : null}

                    <div className="add_propositions">

                        <p> Propositions </p>

                        <div className="form-group">
                            {
                                propositions.map(function(obj, index){
                                    return <label key={index}> <span className="btn"> {obj} </span> <input onChange={(e)=>addPropText(e, index)} type="text" placeholder="optional text" className="form-control" /></label> 
                                })
                            }

                            {(limitProp) ? <p className="error_form"> You have reached the limit of propositions (5) </p> : null}
                            
                        </div>


                        <button onClick={() => addProposition()} className="btn btn-lg">Add Proposition</button>
                    </div>

                    <div className="submit_div">
                        <button disabled={(loading)?true:false} onClick={()=>SubmitQuestion()} className="btn btn-lg">{(loading) ? 'Loading...' : 'Submit'}</button>
                    </div>

                    {(missed) ? <p style={{marginTop:'10px'}} className="error_form"> You have to add at least a question or an image! </p> : null}

                </Col>

            </Row>

        </> : <Redirect to="/login" />}
            
        </>
    )
}


export default AddQuestion;