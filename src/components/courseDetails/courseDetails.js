import React from 'react'
import './courseDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {

    const navigate = useNavigate()

    const toRelocationDetails =  () => {
        navigate('/relocationDetails')
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
        <div className='button-container container'>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} md={{ span: 3, offset: 6 }} className="d-flex justify-content-end">
            <button className='previous-box'>Back</button>
            </Col>
          <Col xs={{ span: 6 }} md={{ span: 3 }} className="d-flex justify-content-end">
            <button onClick={toRelocationDetails} className='next-box'>Next</button>
            </Col>
        </Row>
      </div>
        </Container>
        
    </div>
  )
}

export default CourseDetails