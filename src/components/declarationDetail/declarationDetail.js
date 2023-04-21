import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../relocationDetails/relocationDetails.css'
import './declarationDetail.css'

export default function DeclarationDetail() {

  const[relocationDistrict, setRelocationDistrict] = useState(false)

  const navigate = useNavigate()

  const toSuccessPage = () => {
    navigate('/success')
  }

  const [declarationCheck, setDeclarationCheck] = useState(false)


  return (
    <div className='align-to-top box'>
    <div className='heading-font row'>Declaration</div>
        <div className='declaration-padding declaration-font'>
            <div className="row">
              <div className="col-sm-12">
                <span>1. I hereby declare that the information submitted by me is correct and true to the best of my knowledge.</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <span>2. I shall be liable for any Disciplinary/Punitive action in case of the details are found to be incorrect</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <span>3. Information Provided will be the proprietary of ASDM for different enrollment purposes</span>
              </div>
            </div>
        </div>
        <div>
          <input onChange={(e) => setDeclarationCheck(e.currentTarget.checked)} type="checkbox" checked={declarationCheck} />
          <span className='px-3'>I Agree</span>
        </div>
        <div className='pt-5 row'>
          <div>
            { declarationCheck ? <button onClick={toSuccessPage} className='next-box'>Submit</button> : <div /> }
          </div>
        </div>
    </div>
  )
}
