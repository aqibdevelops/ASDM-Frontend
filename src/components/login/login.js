import React from 'react'
import './login.css'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:7012/app1/v1/PublicServer/registrati8"

const postDataInit = {
    "postParam": {
        "jvId": 14,
        "selectionChoiceCount": 0
    }
}

function Login() {

  axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/get", postDataInit)
  .then((response) => {
    console.log(response)
    console.log(postDataInit)
  })
  .catch((error) => {
    console.log(error)
  })

  const navigate = useNavigate()

  const toBasicDetails = () => {
    navigate('/basicDetails')
  }

  return (
    <div className='align-to-top wrapper'>
        <div className='side-section'>
                <div className='login-section'>
                    <div className='login-container'>
                        <form>
                            <div className='flex-column'>
                                <div style={{textAlign:'center', fontFamily: 'Coming Soon'}}className='pt-5 pb-3 fs-3 text'>REGISTRATION</div>
                                <div className='py-4 row'>
                                    <div className='col-sm-8'>
                                        <Form.Control type="text" placeholder="Enter Mobile No" />
                                    </div>
                                    <div className='col-sm-4'>
                                        <Button className="custom-btn">Get OTP</Button>
                                    </div>
                                </div>
                                <div className='py-4 row'>
                                    <div className='col-sm-8'>
                                        <Form.Control type="password" placeholder="Enter OTP" />
                                    </div>
                                    <div className='col-sm-4'>
                                        <Button className="custom-btn">Verify</Button>
                                    </div>
                                </div>
                                <div className='py-4 row'>
                                    <div className='col-sm-2'></div>
                                        <Button className="custom-btn col-sm-8" onClick={toBasicDetails} >Proceed</Button>
                                    <div className='col-sm-2'></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Login