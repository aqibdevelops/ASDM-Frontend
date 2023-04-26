import React from 'react'
import './basicDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store/index';

function BasicDetails() {
  const state = useSelector((state)=> state.firstName)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const[firstName, setFirstName] = useState()
  const[middlename, setMiddleName] = useState()
  const toDeclarationDetails = () => {
    navigate('/declarationDetail')
  }

  const toSchoolDetails = () => {
    navigate('/schoolDetails')
  }

  const initdata = JSON.parse(sessionStorage.getItem("initializationObject"))

  return (
    <div className='align-to-top font-600 box'>
    <Container>
      <Form>
      <div className='heading-font row'>Basic Details</div>
      <div className='pb-5 row'>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>First Name</p>
          <input onChange={e => {sessionStorage.setItem("firstName", e.target.value)}} className='font-400-18 textfield' type="text"/>      
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Middle Name</p>
          <input onChange={e => {sessionStorage.setItem("middleName", e.target.value)}} className='font-400-18 textfield' type="text"/>
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Last Name</p>
          <input onChange={e => {sessionStorage.setItem("lastName", e.target.value)}} className='font-400-18 textfield' type="text"/>
        </div>
      </div>
      <div className='pb-5 row'>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Father's Name</p>
          <input onChange={e => {sessionStorage.setItem("fathersName", e.target.value)}} className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Mother's Name</p>
          <input onChange={e => {sessionStorage.setItem("mothersName", e.target.value)}} className='font-400-18 textfield' type="text" />
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Date of Birth</p>
          <input onChange={e => {sessionStorage.setItem("dateOfBirth", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='dd-mm-yyyy'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Age Group</p>
          <select onChange={e => {sessionStorage.setItem("ageGroup", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Age Group'>
            <option selected disabled>Age Group</option>
            <option>9-11</option>
            <option>11-13</option>
            <option>13-15</option>
          </select>
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Class</p>
          <select onChange={e => {sessionStorage.setItem("class", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Class'>
            <option selected disabled>Class</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
        <div className='col-md-4 pt-5'>
          <p className='font-400-16'>Gender</p>
          <select onChange={e => {sessionStorage.setItem("gender", e.target.value)}} className='font-400-18 textfield' type="text">
            {initdata.data.genderArr.map((s)=>(
              <option value={s.genderId}>{s.genderName}</option>
            ))}
          </select>
        </div>
      </div>
      </Form>
      <div className='pt-5 row'>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-6 col-md-3'>
          <button onClick={toSchoolDetails} className='previous-box'>Back</button>
        </div>
        <div className='col-6 col-md-3'>
          <button onClick={toDeclarationDetails} className='next-box'>Next</button>
        </div>
      </div>
    </Container>
    </div>
  )
}

export default BasicDetails;