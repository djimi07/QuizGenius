import {React, useState, useRef, useEffect} from 'react';

import {Row, Col} from 'react-bootstrap';

import FooterShape from '../../images/footer_shape.png'

import '../../css/footer.css';


function Footer()
{

    return(

        <>
            <div id="footer" className="footer_block">

                <img src={FooterShape} className="footer_shape" alt="footer_shape"/>

                <div className="footer container-fluid">

                    <Row className="footer_row">

                        <Col className="footer_col" xs={12}>

                        <p>© 2021 Logo</p>
                    
                        </Col>

                    </Row>

                </div>

            </div>

        </>
    )
}



export default Footer;