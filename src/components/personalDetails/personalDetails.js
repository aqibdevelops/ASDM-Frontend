import React from 'react'
import '../basicDetails/basicDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PersonalDetails () {

    const navigate = useNavigate()

    const toAddressDetails = () => {
        navigate('/addressDetails')
    }
    
    return (
        <div className='box'>
        <Container>
        <Form>
        <Row className='row-cols-sm-1 row-cols-md-2 row-cols-lg-2 pt-4'>
        <Col >
            <Form.Select placeholder="ID Card Type">
            <option disabled>ID Card Type</option>
            <option>Aadhar Card</option>
            <option>PAN Card</option>
            </Form.Select>
        </Col>
        <Col>
            <Form.Control type="text" placeholder="ID Card Number" />
        </Col>
        </Row>
        <Row className='mt-4'>
        <Col >
            <Form.Select placeholder="Religion">
            <option disabled>Religion</option>
            <option>HINDUISM</option>
            <option>ISLAM</option>
            <option>SIKHISM</option>
            <option>JAINISM</option>
            <option>BUDDHISM</option>
            </Form.Select>
        </Col>
        <Col>
            <Form.Select placeholder='CATEGORY'>
            <option selected disabled>CATEGORY</option>
            <option>GENERAL</option>
            <option>MOBC</option>
            <option>OTHER BACKWARD CLASSES</option>
            <option>SCHEDULED CASTE</option>
            <option>SCHEDULED TRIBES(H)</option>
            <option>SCHEDULED TRIBES(P)</option>
            </Form.Select>
        </Col>
        <Col>
        <Form.Select placeholder="PERSON WITH DISABILITY">
            <option selected disabled>PERSON WITH DISABILITY</option>
            <option>Yes</option>
            <option>No</option>
            </Form.Select>
        </Col>
        </Row>
        </Form>
        <div className='button-container container'>
            <Row>
            <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
                <Button className='prev-btn'>Back</Button>
                </Col>
            <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
                <Button className='next-btn' onClick={toAddressDetails}>Next</Button>
                </Col>
            </Row>
        </div>
        
        </Container>
        </div>
    )
}