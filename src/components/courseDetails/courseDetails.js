import React from 'react'
import './courseDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CourseDetails() {
  return (
    <div className='box'>
        <Container>
        <Form>
            <Col>
                <Row className='row-cols-sm-1 row-cols-md-3 row-cols-lg-3 pt-4'>
                <Col>
                    <Form.Select placeholder="Course category">
                        <option disabled selected>Course category</option>
                        <option>Lorem</option>
                        <option>Ipsum</option>
                        <option>Lorem</option>
                    </Form.Select>
                </Col>
                <Col>
                <   Form.Select>
                        <option disabled selected>Sector</option>
                        <option>Lorem</option>
                        <option>Ipsum</option>
                        <option>Lorem</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select>
                        <option disabled selected>Course</option>
                        <option>Lorem</option>
                        <option>Ipsum</option>
                        <option>Lorem</option>
                    </Form.Select>
                </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className='pt-4'>
                        <Form.Select>
                            <option disabled selected>District</option>
                            <option>Lorem</option>
                            <option>Ipsum</option>
                            <option>Lorem</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Col>
        </Form>
        <div className='button-container container'>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
            <Button className='prev-btn'>Back</Button>
            </Col>
          <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
            <Button className='next-btn'>Next</Button>
            </Col>
        </Row>
      </div>
        </Container>
        
    </div>
  )
}

export default CourseDetails