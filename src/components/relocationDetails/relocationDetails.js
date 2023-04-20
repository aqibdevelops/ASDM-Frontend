import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './relocationDetails.css'

export default function RelocationDetail() {

  const[relocationDistrict, setRelocationDistrict] = useState(false)

  const navigate = useNavigate()

  const toDeclarationDetail = () => {
    navigate('/declarationDetail')
  }

  return (
    <div className='box'>
        <div>
            <div className="row">
              <div className="col-sm-6">
                <span>Willing to go outside district for employment?</span>
              </div>
              <div className = "col-sm-6">
                <Form.Group name="relocation">
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no1" onClick={() => {setRelocationDistrict(true); console.log(relocationDistrict)}} type="radio" label="Yes" name="relocation" value={1} />
                    </div>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no1" onClick={() => {setRelocationDistrict(false); console.log(relocationDistrict)}} type="radio" label="No" name="relocation" value={0} />
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <span>Willing to go outside State for employment?</span>
              </div>
              <div className = "col-sm-6">
                <Form.Group name="relocation">
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no2" type="radio" label="Yes" name="relocation" value={1} />
                    </div>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no2" type="radio" label="No" name="relocation" value={0} />
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <span>Willing to go outside India for employment?</span>
              </div>
              <div className = "col-sm-6">
                <Form.Group name="relocation">
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no3" type="radio" label="Yes" name="relocation" value={1} />
                    </div>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no3" type="radio" label="No" name="relocation" value={0} />
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            <Row>
              <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
                <Button className='prev-btn'>Back</Button>
                </Col>
              <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
                <Button onClick={toDeclarationDetail} className='next-btn'>Next</Button>
                </Col>
            </Row>
        </div>
    </div>
  )
}