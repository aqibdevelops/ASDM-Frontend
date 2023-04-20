import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../relocationDetails/relocationDetails.css'

export default function DeclarationDetail() {

  const[relocationDistrict, setRelocationDistrict] = useState(false)

  const navigate = useNavigate()

  const toSuccessPage = () => {
    navigate('/success')
  }

  return (
    <div className='box'>
        <div>
            <div className="row">
              <div className="col-sm-12">
                <span><li>I hereby declare that the information submitted by me is correct and true to the best of my knowledge.</li></span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <span><li>I shall be liable for any Disciplinary/Punitive action in case of the details are found to be incorrect</li></span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <span><li>Information Provided will be the proprietary of ASDM for different enrollment purposes</li></span>
              </div>
            </div>
            <Row>
              <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
                <Button onClick={toSuccessPage} className='next-btn'>Submit</Button>
            </Col>
            </Row>
        </div>
    </div>
  )
}
