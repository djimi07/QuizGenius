import {React, useState, useRef, useEffect} from 'react';

import {Col, Row} from 'react-bootstrap'


import '../../css/home.css'; 
import NotFoundImage from '../../images/not_found.png'


function NotFound()
{

    return(
        <>
            <Row className="home_btn_row">
                <Col className="home_btn_col" xs={12}>

                    <button className="btn btn-lg"> 
                    
                         <span> 404 - Not found </span>
                    
                     </button>
                
                </Col>
            </Row>


            <Row className="home_infos_row">
                <Col xs={{span:8, offset:2}} md={{span:6, offset:3}} className="home_image_col">

                    <img src={NotFoundImage} alt='infos' />
                
                </Col>

            
            </Row>
        </>
    )
}


export default NotFound;