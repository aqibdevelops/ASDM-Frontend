import React, { useState } from 'react'
import './login.css'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:7012/app1/v1/PublicServer/registrati8"

const postDataInit= {}

postDataInit.get = {
    "postParam": {
        "jvId": 14,
        "selectionChoiceCount": 0
    }
}

postDataInit.location = {
	"postParam": {
		"jvId": "14",
		"location": "district",
		"parentLocation": "state",
		"parentLocationId": 4
	}
}

function Login() {
  
  const[mobileNo, getMobileNo] = useState();
  const[otp, getOtp] = useState();
  const[otpFromBackend, getOtpFromBackend]= useState();
  const[insertedId, getInsertedId] = useState();
  const[successStatus, getSuccessStatus] = useState(false);

  axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/get", postDataInit.get)
  .then((response) => {
    sessionStorage.setItem("initializationObject", JSON.stringify(response))
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

  axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/location", postDataInit.location)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

  const otpHandler = () => axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/sendSmsOtp", {
	"postParam": {
		"obj": {
			"mobile1": mobileNo
		}
	}
})
  .then((response) => {
    getInsertedId(response.data.insertedId)
    sessionStorage.setItem("insertedId", response.data.insertedId)
    getOtpFromBackend(response.data.mobile1OTP)
    sessionStorage.setItem("otpBackend", response.data.mobile1OTP)
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
  const otpVerificationHandler = () => {
    if (otpFromBackend == otp) {
      axios
        .post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/verifySmsOtp", {
          postParam: {
            insertedId: insertedId,
            obj: {
              mobile1Verified: true,
            },
          },
        })
        .then((response) => {
          getSuccessStatus(true);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
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
                                        <Form.Control type="text" onChange={event => {sessionStorage.setItem("MobileNo", event.target.value ) ;getMobileNo(event.target.value)}} placeholder="Enter Mobile No" value={mobileNo}/>
                                    </div>
                                    <div className='col-sm-4'>
                                        <Button onClick={otpHandler} className="custom-btn">Get OTP</Button>
                                    </div>
                                </div>
                                <div className='py-4 row'>
                                    <div className='col-sm-8'>
                                        <Form.Control onChange={event => {sessionStorage.setItem("OTP", event.target.value ); getOtp(event.target.value)}} type="password" placeholder="Enter OTP" value={otp} />
                                    </div>
                                    <div className='col-sm-4'>
                                        <Button onClick={otpVerificationHandler} className="custom-btn">Verify</Button>
                                    </div>
                                </div>
                                <div className='py-4 row'>
                                    <div className='col-sm-2'></div>
                                        { successStatus ? <Button className="custom-btn col-sm-8" onClick={toBasicDetails} >Proceed</Button> : <div /> }
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