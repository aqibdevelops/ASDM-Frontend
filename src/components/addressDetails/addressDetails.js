import React from 'react'
import '../basicDetails/basicDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddressDetails () {

    const navigate = useNavigate()

    const toCourseDetails = () => {
        navigate('/courseDetails')
    }
    const districtData = []
    
    return (
        <div className='box'>
            <Container>
                <h3 style={{textAlign: 'center'}}>Address Details</h3>
                <Form>
                <Row className='row-cols-sm-1 row-cols-md-2 row-cols-lg-2 pt-4'>
                    <Col>
                        <Form.Control type="text" placeholder="House No." />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Street" />
                    </Col>
                </Row>
                <Row className='row-cols-sm-1 row-cols-md-2 row-cols-lg-2 pt-4'>
                    <Col>
                        <Form.Select placeholder='DISTRICT'>
                        <option disabled>DISTRICT</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <div className='row'>
                            <span className='col-sm-6'>Is&nbsp;City/Village?</span>
                            <Form.Check className="col-sm-3" type="radio" label="Yes"  value={1} />
                            <Form.Check className="col-sm-3" type="radio" label="No" value={0} />
                        </div>
                    </Col>
                </Row>
                <Row className='row-cols-sm-1 row-cols-md-2 row-cols-lg-2 pt-4'>
                    <Col>
                        <Form.Select placeholder='BLOCK'>
                        <option disabled>BLOCK</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="PINCODE" />
                    </Col>
                </Row>
                <Row className='row-cols-sm-1 row-cols-md-2 row-cols-lg-2 pt-4'>
                    <Col>
                        <Form.Control type="text" placeholder="POLICE STATION" />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="POST OFFICE" />
                    </Col>
                </Row>

                </Form>
                <div className='button-container container'>
                    <Row>
                    <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
                        <Button className='prev-btn'>Back</Button>
                        </Col>
                    <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
                        <Button className='next-btn' onClick={toCourseDetails}>Next</Button>
                        </Col>
                    </Row>
                </div>
                
            </Container>
        </div>
    )
}