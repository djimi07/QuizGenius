import {React, useState, useRef, useEffect} from 'react';

import {Col, Row} from 'react-bootstrap'


import '../../css/home.css'; 
import HomeImage from '../../images/home_image.png'


function Home()
{

    return(
        <>
            <Row className="home_btn_row">
                <Col className="home_btn_col" xs={12}>

                    <button className="btn btn-lg"> 
                    
                        <i className="fas fa-edit"></i> <span> RKQUIZ </span>
                    
                     </button>
                
                </Col>
            </Row>


            <Row className="home_infos_row">

                <Col md={6} className="home_image_col d-none d-md-block">

                    <img src={HomeImage} alt='infos' />
                
                </Col>

                <Col xs={12} md={6} className="home_text_col">

                    <p>Welcome to RKQUIZ App
                    </p>
                    <p>You must be reffered to this site by a link in order to pass an exam test
                    </p>
                
                </Col>

                <Col xs={12} md className="home_image_col d-md-none">

                    <img src={HomeImage} alt='infos' />
                
                </Col>

                
            </Row>
        </>
    )
}


export default Home;