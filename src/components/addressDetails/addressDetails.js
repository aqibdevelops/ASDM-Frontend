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
                        <input className='font-400-18 textfield' type="text" placeholder='House no' />
                    </div>
                    </div>
                    <div className='col-sm-8'>
                        <p className='font-400-16'>Street Name</p>
                        <input className='font-400-18 textfield-2x' type="text" placeholder='Street Name' />
                    </div>
                </div>
                <div className='pb-5 row'>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Is City/Village?</p>
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
                        <p className='font-400-16'>City/Village Name</p>
                        <input className='font-400-18 textfield' type="text" placeholder='City/Village Name' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>District</p>
                        <select className='font-400-18 textfield' type="text">
                            <option selected disabled>District</option>
                            <option>Kamrup</option>
                            <option>Nagaon</option>
                            <option>Dibrugarh</option>
                            <option>Silchar</option>
                            <option>Barpeta</option>
                        </select>
                    </div>
                </div>
                <div className='pb-5 row'>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Pincode</p>
                        <input className='font-400-18 textfield' type="text" placeholder='Pincode' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Police Station</p>
                        <input className='font-400-18 textfield' type="text" placeholder='Police Station' />
                    </div>
                    <div className='col-sm-4'>
                        <p className='font-400-16'>Post Office</p>
                        <input className='font-400-18 textfield' type="text" placeholder='Post Office' />
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