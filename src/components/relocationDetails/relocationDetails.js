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

  const toCourseDetail = () => {
    navigate('/courseDetails')
  }

  return (
    <div className='align-to-top box'>
        <div className='heading-font'>Relocation Details</div>
        <div>
          <div className='pb-5 row'>
            <div className='col-sm-4'>
              <p className='font-400-16'>Willing to work outside District</p>
              <div className='row'>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                </div>
                <div className='col-sm-4'>
                    <label for="yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="no">NO</label>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <p className='font-400-16'>Willing to work outside State</p>
              <div className='row'>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                </div>
                <div className='col-sm-4'>
                    <label for="yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="no">NO</label>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <p className='font-400-16'>Willing to work outside India</p>
              <div className='row'>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="yes" name="fav_language" value="HTML" />
                </div>
                <div className='col-sm-4'>
                    <label for="yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input className="ellipse" type="radio" id="no" name="fav_language" value="CSS" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="no">NO</label>
                </div>
              </div>
            </div>
          </div>
          <div className='pb-5 row'>
            <div className='col-sm-4 pb-5'>
              <p className='font-400-16'>District Preferance 1</p>
              <select className='font-400-18 textfield' type="text">
                  <option selected disabled>District Preferance 1</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
            <div className='col-sm-4'>
            <p className='font-400-16'>State Preferance 1</p>
            <select className='font-400-18 textfield' type="text">
                <option selected disabled>State Preferance 1</option>
                <option>Kamrup</option>
                <option>Nagaon</option>
                <option>Dibrugarh</option>
                <option>Silchar</option>
                <option>Barpeta</option>
            </select>
          </div>
          <div className='col-sm-4'></div>
          </div>
          <div className='pb-5 row'>
            <div className='col-sm-4 pb-5'>
                <p className='font-400-16'>District Preferance 2</p>
                <select className='font-400-18 textfield' type="text">
                    <option selected disabled>District Preferance 2</option>
                    <option>Kamrup</option>
                    <option>Nagaon</option>
                    <option>Dibrugarh</option>
                    <option>Silchar</option>
                    <option>Barpeta</option>
                </select>
              </div>
              <div className='col-sm-4'>
              <p className='font-400-16'>State Preferance 2</p>
              <select className='font-400-18 textfield' type="text">
                  <option selected disabled>State Preferance 2</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
            <div className='col-sm-4'></div>
            </div>
          <div className='pb-5 row'>
            <div className='col-sm-4 pb-5'>
                <p className='font-400-16'>District Preferance 3</p>
                <select className='font-400-18 textfield' type="text">
                    <option selected disabled>District Preferance 3</option>
                    <option>Kamrup</option>
                    <option>Nagaon</option>
                    <option>Dibrugarh</option>
                    <option>Silchar</option>
                    <option>Barpeta</option>
                </select>
              </div>
              <div className='col-sm-4 pb-5'>
              <p className='font-400-16'>State Preferance 3</p>
              <select className='font-400-18 textfield' type="text">
                  <option selected disabled>State Preferance 3</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
            <div className='col-sm-4'></div>
          </div>
          <div className='pt-5 row'>
            <div className='col-md-3'></div>
            <div className='col-md-3'></div>
            <div className='col-md-3'>
              <button onClick={toCourseDetail} className='previous-box'>Back</button>
            </div>
            <div className='col-md-3'>
              <button onClick={toDeclarationDetail} className='next-box'>Next</button>
            </div>
          </div>
        </div>
    </div>
  )
}