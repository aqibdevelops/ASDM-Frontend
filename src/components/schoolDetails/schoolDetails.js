import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './schoolDetails.css'

export default function SchoolDetails () {
  
    const navigate = useNavigate()
  
    const toBasicDetails = () => {
      navigate('/basicDetails')
    }
  
    const initdata = JSON.parse(sessionStorage.getItem("initializationObject"))
  
    return (
      <div className='align-to-top font-600 box'>
      <Container>
        <Form>
        <div className='heading-font row'>School Details</div>
        <div className='pb-5 row'>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>School Name</p>
            <input onChange={e => {sessionStorage.setItem("schoolName", e.target.value)}} className='font-400-18 textfield' type="text"/>      
          </div>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>Medium&nbsp;of&nbsp;Instruction</p>
            <input onChange={e => {sessionStorage.setItem("schoolMedium", e.target.value)}} className='font-400-18 textfield' type="text"/>
          </div>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>School District</p>
            <select onChange={e => {sessionStorage.setItem("schoolDistrict", e.target.value)}} className='font-400-18 textfield' type="text">
            <option selected disabled />
            {initdata.data.districtArr.map((s)=>(
            <option value={s.districtId}>{s.districtName}</option>
            ))}
            </select>
          </div>
        </div>
        <div className='pb-5 row'>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>HeadMaster's Name</p>
            <input onChange={e => {sessionStorage.setItem("headmasterName", e.target.value)}} className='font-400-18 textfield' type="text" />
          </div>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>Class&nbsp;Teacher&nbsp;Name</p>
            <input onChange={e => {sessionStorage.setItem("mothersName", e.target.value)}} className='font-400-18 textfield' type="text" />
          </div>
          <div className='col-md-4 pt-5'>
            <p className='font-400-16'>School Address</p>
            <input onChange={e => {sessionStorage.setItem("school Address", e.target.value)}} className='font-400-18 textfield' type="text" />
          </div>
        </div>
        </Form>
        <div className='pt-5 row'>
          <div className='col-md-3'></div>
          <div className='col-md-3'></div>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            <button onClick={toBasicDetails} className='next-box'>Next</button>
          </div>
        </div>
      </Container>
      </div>
    )
}