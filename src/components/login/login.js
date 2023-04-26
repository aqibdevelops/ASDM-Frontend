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

  const toSchoolDetails = () => {
    navigate('/schoolDetails')
  }


  return (
    <div className='align-to-top font-600 box'>
        <div className='heading-font pb-5 row'>Skill Yatra Registration</div>
        <div className=''>
          <div className=''>
            <div className=''>
              <div className=''>
                <div className='py-5 row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-3 '>
                        <input className='font-400-18 textfield textfield2' type="text" onChange={event => {sessionStorage.setItem("MobileNo", event.target.value ) ;getMobileNo(event.target.value)}} placeholder="Enter Mobile No" value={mobileNo}/>
                    </div>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-3'>
                    <div className='col-sm-2 pt-5 pt-md-0'></div>
                        <button className='previous-box' onClick={otpHandler}>Get OTP</button>
                    </div>
                </div>
                <div className='py-5 row'>
                  <div className='col-sm-2'></div>
                    <div className='col-sm-3'>
                        <input className='font-400-18 textfield textfield2' onChange={event => {sessionStorage.setItem("OTP", event.target.value ); getOtp(event.target.value)}} type="password" placeholder="Enter OTP" value={otp} />
                    </div>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-3'>
                    <div className='col-sm-2 pt-5 pt-md-0'></div>
                        <button onClick={otpVerificationHandler} className="previous-box">Verify</button>
                    </div>
                </div>
                <div className='py-5 row'>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-2'>{ successStatus ? <button className="next-box col-sm-2" onClick={toSchoolDetails} >Proceed</button> : <div /> }</div>
                    <div className='col-sm-6'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login