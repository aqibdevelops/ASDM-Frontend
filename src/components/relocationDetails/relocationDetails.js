import React from 'react'
import { Form } from 'react-bootstrap'
import './relocationDetails.css'

function RelocationDetail() {
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
                      <Form.Check className="yes-no1" type="radio" label="Yes" name="relocation" value={1} />
                    </div>
                    <div className='col-sm-6'>
                      <Form.Check className="yes-no1" type="radio" label="No" name="relocation" value={0} />
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            {(() => {
              if (yes-no.value) {<div className="row">
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
            </div>}})()}
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
        </div>
    </div>
  )
}

export default RelocationDetail