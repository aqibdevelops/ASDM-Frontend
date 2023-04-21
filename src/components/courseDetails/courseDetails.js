import React from 'react'
import './courseDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {

    const navigate = useNavigate()

    const toRelocationDetails =  () => {
      navigate('/relocationDetails')
    }

    const toAddressDetails = () => {
      navigate('/addressDetails')
    }

  return (
    <div className='align-to-top box'>
        <Container>
        <Form>
            <div className='heading-font row'>Course Details</div>
            <div className='table-padding row'>
                <div className='col-sm-3'>
                    <button className='new-course-button'>New Course</button>
                </div>
            </div>
            <div className='table-font row'>
                <table>
                    <tr className="table-padding-inner">
                        <th>Sl.No.</th>
                        <th>Course</th>
                    </tr>
                    
                    <tr>
                        <td>1</td>
                    </tr>
                </table>
            </div>
        </Form>
      <div className='pt-5 row'>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-md-3'>
        <button onClick={toAddressDetails}  className='previous-box'>Back</button>
        </div>
        <div className='col-md-3'>
        <button onClick={toRelocationDetails} className='next-box'>Next</button>
        </div>
      </div>
      </Container>
        
    </div>
  )
}

export default CourseDetails