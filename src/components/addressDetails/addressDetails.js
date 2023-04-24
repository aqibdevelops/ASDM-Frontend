import React from 'react'
import './addressDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddressDetails () {

    const navigate = useNavigate()

    const toCourseDetails = () => {
        navigate('/courseDetails')
    }

    const toPersonalDetails = () => {
        navigate('/personalDetails')
    }

    const initdata = JSON.parse(sessionStorage.getItem("initializationObject"))

    const districtData = []
    
    return (
        <div className='align-to-top box'>
            <Container>
                <Form>
                <div className='heading-font row'>Address Details</div>
                <div className='pb-5 row'>
                    <div className='col-sm-4'>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>House no.</p>
                        <input onChange={e => {sessionStorage.setItem("HouseNo", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='House no' />
                    </div>
                    </div>
                    <div className='col-sm-8'>
                        <p className='font-400-16'>Street Name</p>
                        <input onChange={e => {sessionStorage.setItem("StreetName", e.target.value)}} className='font-400-18 textfield-2x' type="text" placeholder='Street Name' />
                    </div>
                </div>
                <div className='pb-5 row'>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Is City/Village?</p>
                        <div className='row'>
                            <div className='col-sm-2'>
                                <input onChange={e => {sessionStorage.setItem("BoolCityVill", "Yes")}} className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                            </div>
                            <div className='col-sm-4'>
                                <label for="yes">YES</label>
                            </div>
                            <div className='col-sm-2'>
                                <input onChange={e => {sessionStorage.setItem("BoolCityVill", "No")}} className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                            </div>    
                            <div className='col-sm-4'>    
                                <label for="no">NO</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>City/Village Name</p>
                        <input onChange={e => {sessionStorage.setItem("CityVillageName", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='City/Village Name' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>District</p>
                        <select onChange={e => {sessionStorage.setItem("DistrictName", e.target.value)}} className='font-400-18 textfield' type="text">
                        <option selected disabled>DISTRICT</option>
                        {initdata.data.districtArr.map((s)=>(
                        <option value={s.districtId}>{s.districtName}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className='pb-5 row'>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Pincode</p>
                        <input onChange={e => {sessionStorage.setItem("Pincode", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Pincode' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Police Station</p>
                        <input onChange={e => {sessionStorage.setItem("PS", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Police Station' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Post Office</p>
                        <input onChange={e => {sessionStorage.setItem("PO", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Post Office' />
                    </div>
                </div>

                </Form>
                <div className='pt-5 row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'>
                    <button onClick={toPersonalDetails} className='previous-box'>Back</button>
                    </div>
                    <div className='col-md-3'>
                    <button onClick={toCourseDetails} className='next-box'>Next</button>
                    </div>
                </div>
                
            </Container>
        </div>
    )
}