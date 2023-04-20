import React from 'react'
import './basicDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BasicDetails() {

  const navigate = useNavigate()

  const toPersonalDetails = () => {
    navigate('/personalDetails')
  }

  return (
    <div className='align-to-top font-600 box'>
    <Container>
      <Form>
      <div className='heading-font row'>Basic Details</div>
      <div className='pb-5 row'>
        <div className='col-sm-4'>
          <p className='font-400-16'>First Name</p>
          <input className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Middle Name</p>
          <input className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Last Name</p>
          <input className='font-400-18 textfield' type="text"/>
        </div>
      </div>
      <div className='pb-5 row'>
        <div className='col-sm-4'>
          <p className='font-400-16'>Father's Name</p>
          <input className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Mother's Name</p>
          <input className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Date of Birth</p>
          <input className='font-400-18 textfield' type="text" placeholder='dd-mm-yyyy'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <p className='font-400-16'>Age Group</p>
          <select className='font-400-18 textfield' type="text" placeholder='Age Group'>
            <option selected disabled>Age Group</option>
            <option>9-11</option>
            <option>11-13</option>
            <option>13-15</option>
          </select>
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Class</p>
          <select className='font-400-18 textfield' type="text" placeholder='Class'>
            <option selected disabled>Class</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
        <div className='col-sm-4'>
          <p className='font-400-16'>Gender</p>
          <select className='font-400-18 textfield' type="text">
            <option selected disabled>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>
      </div>
      </Form>
      <div className='button-container container'>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
            <button className='previous-box'>Back</button>
            </Col>
          <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
            <button className='next-box' onClick={toPersonalDetails}>Next</button>
            </Col>
        </Row>
      </div>
      
    </Container>
    </div>
  )
}

export default BasicDetails;