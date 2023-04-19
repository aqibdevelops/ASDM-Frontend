import React from 'react'
import { Form } from 'react-bootstrap'
import './relocationDetails.css'

function RelocationDetail() {
  return (
    <div className='box'>
        <div>
            <span>Willing to go outside district for employmment?</span>
            <Form.Group name="relocation">
                <Form.Check className="yes-no" type="radio" label="Yes" name="relocation" value={1} />
                <Form.Check className="yes-no" type="radio" label="No" name="relocation" value={0} />
            </Form.Group>
        </div>
    </div>
  )
}

export default RelocationDetail