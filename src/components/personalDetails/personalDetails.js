import React from 'react'
import './personalDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PersonalDetails () {

    const navigate = useNavigate()

    const toAddressDetails = () => {
        navigate('/addressDetails')
    }

    const toBasicDetails = () => {
        navigate('/basicDetails')
    }

    const initdata = JSON.parse(sessionStorage.getItem("initializationObject"))
    
    return (
        <div className='align-to-top box'>
        <Container>
        <Form>
        <div className='heading-font row'>Personal Details</div>
        <div className='pb-5 row'>
            <div className='col-md-4 pt-5'>
                <p className='font-400-16'>ID Type</p>
                <select onChange={e => {sessionStorage.setItem("IdType", e.target.value)}} className='font-400-18 textfield' type="text">
                    <option selected disabled>ID Type</option>
                    {initdata.data.idTypeArr.map((s)=>(
                    <option value={s.categoryId}>{s.categoryName}</option>
                    ))}
                </select>
            </div>
            <div className='col-md-4 pt-5'>
            <p className='font-400-16'>ID Card No</p>
                <input onChange={e => {sessionStorage.setItem("IdCardNo", e.target.value)}} className='font-400-18 textfield' type="text" />
                </div>
            <div className='col-md-4 pt-5'>
                <p className='font-400-16'>Religion</p>
                <select onChange={e => {sessionStorage.setItem("Religion", e.target.value)}} className='font-400-18 textfield' type="text">
                    <option selected disabled>Religion</option>
                    {initdata.data.religionArr.map((s)=>(
                    <option value={s.religionId}>{s.religionName}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='pb-5 row'>
            <div className='col-md-4 pt-5'>
                <p className='font-400-16'>Caste</p>
                <select onChange={e => {sessionStorage.setItem("Caste", e.target.value)}} className='font-400-18 textfield' type="text">
                    <option selected disabled>Caste</option>
                    {initdata.data.categoryArr.map((s)=>(
                    <option value={s.categoryId}>{s.categoryName}</option>
                    ))}
                </select>
            </div>
            <div className='col-md-4 pt-5'>
                <p className='font-400-16'>Are you a person with disability</p>
                <div className='row'>
                    <div className='col-2'>
                        <input onChange={e => {sessionStorage.setItem("Disbility", true)}} className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                    </div>
                    <div className='col-4'>
                        <label for="yes">YES</label>
                    </div>
                    <div className='col-2'>
                        <input onChange={e => {sessionStorage.setItem("Disbility", false)}} className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                    </div>    
                    <div className='col-4'>    
                        <label for="no">NO</label>
                    </div>
                </div>
            </div>
            <div className='col-md-4 pt-5'>
            <p className='font-400-16'>If Yes, describe briefly</p>
                <input onChange={e => {sessionStorage.setItem("Disbility_detail", e.target.value)}} className='font-400-18 textfield' type="text" />
            </div>
        </div>
        </Form>
        <div className='pt-5 row'>
            {/* <div className='col-md-3'></div>
            <div className='col-md-3'></div> */}
            <div className='col-md-2'>
              <button onClick={toBasicDetails} className='previous-box'>Back</button>
            </div>
            <div className='col-md-3'>
              <button onClick={toAddressDetails} className='next-box'>Next</button>
            </div>
        </div>
        
        </Container>
        </div>
    )
}