import React from 'react'
import './basicDetails.css'
import Navbar from '../components/navbar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function BasicDetails() {
  return (
    <div className='box'>
    <Container>
      <Form>
      <Row className='row-cols-sm-1 row-cols-md-3 row-cols-lg-3 pt-4'>
      <Col>
        <Form.Control type="text" placeholder="First name" />
      </Col>
      <Col>
        <Form.Control type="text" placeholder="Middle name" />
      </Col>
      <Col>
        <Form.Control type="text" placeholder="Last name" />
      </Col>
      </Row>
      <Row className='mt-4'>
      <Col >
        <Form.Select placeholder="Age group">
          <option disabled>Age group</option>
          <option>9-12</option>
          <option>12-15</option>
          <option>15-18</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Select placeholder='Class'>
          <option selected disabled>Class</option>
          <option>VI</option>
          <option>VII</option>
          <option>VIII</option>
          <option>IX</option>
          <option>X</option>
        </Form.Select>
      </Col>
      <Col>
      <Form.Select placeholder="Gender">
          <option selected disabled>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Form.Select>
      </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <Form.Control type="text" placeholder="Father's name" />
        </Col>
        <Col>
          <Form.Control type="text" placeholder="Mother's name" />
        </Col>
      </Row>
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

export default BasicDetails;