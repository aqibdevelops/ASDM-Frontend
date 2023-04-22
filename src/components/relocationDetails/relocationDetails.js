import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './relocationDetails.css'

export default function RelocationDetail() {

  const[relocationDistrict, setRelocationDistrict] = useState(false)
  const[relocationState, setRelocationState] = useState(false)
  const[relocationIndia, setRelocationIndia] = useState(false)

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
                    <input onChange={e => setRelocationDistrict(true)} className="ellipse" type="radio" id="dist_yes" name="dist" />
                </div>
                <div className='col-sm-4'>
                    <label for="dist_yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input onChange={e => setRelocationDistrict(false)} className="ellipse" type="radio" id="dist_no" name="dist" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="dist_no">NO</label>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <p className='font-400-16'>Willing to work outside State</p>
              <div className='row'>
                <div className='col-sm-2'>
                    <input onChange={e => setRelocationState(true)} className="ellipse" type="radio" id="state_yes" name="state" />
                </div>
                <div className='col-sm-4'>
                    <label for="state_yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input onChange={e => setRelocationState(false)} className="ellipse" type="radio" id="state_no" name="state" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="state_no">NO</label>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <p className='font-400-16'>Willing to work outside India</p>
              <div className='row'>
                <div className='col-sm-2'>
                    <input onChange={e => setRelocationIndia(true)} className="ellipse" type="radio" id="india_yes" name="india" />
                </div>
                <div className='col-sm-4'>
                    <label for="india_yes">YES</label>
                </div>
                <div className='col-sm-2'>
                    <input onChange={e => setRelocationIndia(false)} className="ellipse" type="radio" id="india_no" name="india" />
                </div>    
                <div className='col-sm-4'>    
                    <label for="india_no">NO</label>
                </div>
              </div>
            </div>
          </div>
          {relocationDistrict ? <div className='pb-5 row'>
            <div className='col-sm-4 pb-5'>
              <p className='font-400-16'>District&nbsp;Preferance&nbsp;1</p>
              <select onChange={e => sessionStorage.setItem("dist_pref_1", e.target.value)} className='font-400-18 textfield' type="text">
                  <option selected disabled>District Preferance 1</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
            <div className='col-sm-4 pb-5'>
              <p className='font-400-16'>District&nbsp;Preferance&nbsp;2</p>
              <select onChange={e => sessionStorage.setItem("dist_pref_2", e.target.value)} className='font-400-18 textfield' type="text">
                  <option selected disabled>District Preferance 2</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
          <div className='col-sm-4'>
            <div className='col-sm-4 pb-5'>
              <p className='font-400-16'>District&nbsp;Preferance&nbsp;3</p>
              <select onChange={e => sessionStorage.setItem("dist_pref_3", e.target.value)} className='font-400-18 textfield' type="text">
                  <option selected disabled>District Preferance 3</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
          </div>
          </div> : <div /> }
          {relocationState ? <div className='pb-5 row'>
            <div className='col-sm-4 pb-5'>
                <p className='font-400-16'>State&nbsp;Preferance&nbsp;1</p>
                <select onChange={e => sessionStorage.setItem("state_pref_1", e.target.value)} className='font-400-18 textfield' type="text">
                    <option selected disabled>District Preferance 1</option>
                    <option>Kamrup</option>
                    <option>Nagaon</option>
                    <option>Dibrugarh</option>
                    <option>Silchar</option>
                    <option>Barpeta</option>
                </select>
            </div>
            <div className='col-sm-4'>
              <p className='font-400-16'>State&nbsp;Preferance&nbsp;2</p>
              <select onChange={e => sessionStorage.setItem("state_pref_2", e.target.value)}  className='font-400-18 textfield' type="text">
                  <option selected disabled>State Preferance 2</option>
                  <option>Kamrup</option>
                  <option>Nagaon</option>
                  <option>Dibrugarh</option>
                  <option>Silchar</option>
                  <option>Barpeta</option>
              </select>
            </div>
            <div className='col-sm-4'>
              <div className='col-sm-4'>
                <p className='font-400-16'>State&nbsp;Preferance&nbsp;3</p>
                <select onChange={e => sessionStorage.setItem("state_pref_3", e.target.value)} className='font-400-18 textfield' type="text">
                    <option selected disabled>State Preferance 3</option>
                    <option>Kamrup</option>
                    <option>Nagaon</option>
                    <option>Dibrugarh</option>
                    <option>Silchar</option>
                    <option>Barpeta</option>
                </select>
              </div>
            </div>
          </div> : <div /> }
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