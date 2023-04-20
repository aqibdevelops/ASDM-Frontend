import React from 'react'
import './personalDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PersonalDetails () {

    const navigate = useNavigate()

    const toAddressDetails = () => {
        navigate('/addressDetails')
    }
    
    return (
        <div className='align-to-top box'>
        <Container>
        <Form>
        <div className='heading-font row'>Personal Details</div>
        <div className='pb-5 row'>
            <div className='col-sm-4'>
                <p className='font-400-16'>ID Type</p>
                <select className='font-400-18 textfield' type="text">
                    <option selected disabled>ID Type</option>
                    <option>Aadhar Card</option>
                    <option>PAN Card</option>
                    <option>Voter ID</option>
                </select>
            </div>
            <div className='col-sm-4'>
            <p className='font-400-16'>ID Card No</p>
                <input className='font-400-18 textfield' type="text" />
                </div>
            <div className='col-sm-4'>
                <p className='font-400-16'>Religion</p>
                <select className='font-400-18 textfield' type="text">
                    <option selected disabled>Religion</option>
                    <option>Hinduism</option>
                    <option>Islam</option>
                    <option>Sikhism</option>
                    <option>Jainism</option>
                    <option>Christianity</option>
                </select>
            </div>
        </div>
        <div className='pb-5 row'>
            <div className='col-sm-4'>
                <p className='font-400-16'>Caste</p>
                <select className='font-400-18 textfield' type="text">
                    <option selected disabled>Caste</option>
                    <option>General</option>
                    <option>OBC</option>
                    <option>MOBC</option>
                    <option>SC</option>
                    <option>ST(H)</option>
                    <option>ST(P)</option>
                </select>
            </div>
            <div className='col-sm-4'>
                <p className='font-400-16'>Are you a person wit disability</p>
                <div className='row'>
                    <div className='col-sm-2'>
                        <input className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                    </div>
                    <div className='col-sm-4'>
                        <label for="yes">YES</label>
                    </div>
                    <div className='col-sm-2'>
                        <input className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                    </div>    
                    <div className='col-sm-4'>    
                        <label for="no">NO</label>
                    </div>
                </div>
            </div>
            <div className='col-sm-4'>
            <p className='font-400-16'>If Yes, describe briefly</p>
                <input className='font-400-18 textfield' type="text" />
            </div>
        </div>
        </Form>
        <div className='button-container container'>
            <Row>
            <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
                <button className='previous-box'>Back</button>
                </Col>
            <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
                <button className='next-box' onClick={toAddressDetails}>Next</button>
                </Col>
            </Row>
        </div>
        
        </Container>
        </div>
    )
}