import React, { useState } from 'react'
import './courseDetails.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CourseDetails() {

  const[coursePopup, setCoursePopup] = useState(false)
  const[sectorNameDB, setSectorNameDB] = useState([])
  const[courseNameDB, setCourseNameDB] = useState([])
  const[preferanceArr, setPreferanceArr] = useState([])
  const[preferanceArrDisp, setPreferanceArrDisp] = useState([])  
  const navigate = useNavigate()

  const clearPopupSessionStorage = () => {
    sessionStorage.removeItem("interestedDistrict")
    sessionStorage.removeItem("interestedCategory")
    sessionStorage.removeItem("interestedCourse")
    sessionStorage.removeItem("interestedSector")
  }

  const toRelocationDetails =  () => {
    navigate('/relocationDetails')
  }

  const toAddressDetails = () => {
    navigate('/addressDetails')
  }

  const sectorPost = async () => {
    await axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/sector", {
      "postParam": {
        "jvId": 14,
        "courseCategoryId": sessionStorage.getItem("interestedCategory")
      }
    })
    .then((response) => {
      setSectorNameDB(response.data.objArr)
    })
  }

  const courseByDistrictPost = async () => {
    await axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/courseByDistrict", {
      "postParam": {
        "courseCategoryId": sessionStorage.getItem("interestedCategory"),
        "ditrictId": sessionStorage.getItem("interestedDistrict"),
        "jvId": "14",
        "sectorId": sessionStorage.getItem("interestedSector")
      }
    }).then((response) => {
      setCourseNameDB(response.data.objArr)
    })
  } 

  const[sNo, setSno] = useState(0);
  const initdata = JSON.parse(sessionStorage.getItem("initializationObject"))

  return (
    <>
        {coursePopup ? 
      <div>
        <div className='transparent-wrap' style={{zIndex: 1}}>
        </div>
        <div className='popup-box' style={{zIndex: 2}}>
          <div className='py-4 row'>
            <div className='col-sm-1'></div>
            <div className='box-font col-sm-6'>New Course</div>
            <div className='col-sm-5'></div>
          </div>
          <div className='pb-5 row'>
            <div className='col-md-1'></div>
            <div className='col-md-4 pt-3'>
              <p className='font-400-16'>District</p>
              <select onChange={e => {sessionStorage.setItem("interestedDistrict", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Class'>
                <option selected disabled>DISTRICT</option>
                {initdata.data.districtArr.map((s)=>(
                <option value={s.districtId}>{s.districtName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='pb-5 row'>
            <div className='col-md-1'></div>
            <div className='col-md-4 pt-3'>
              <p className='font-400-16'>Course Category</p>
              <select onChange={e => {sessionStorage.setItem("interestedCategory", e.target.value); sectorPost()}} className='font-400-18 textfield' type="text" placeholder='Class'>
                <option selected disabled>COURSE CATEGORY</option>
                {initdata.data.courseCategoryArr.map((s)=>(
                <option value={s.courseCategoryId}>{s.courseCategoryName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='pb-5 row'>
            <div className='col-md-1'></div>
            <div className='col-md-4 pt-3'>
              <p className='font-400-16'>Sector</p>
              <select onChange={e => {sessionStorage.setItem("interestedSector", e.target.value); courseByDistrictPost()}} className='font-400-18 textfield' type="text" placeholder='Class'>
                <option selected disabled>Sector</option>
                  {sectorNameDB.map((s) => (                   
                    <option value={s.sectorId}>{s.sectorName}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className='pb-5 row'>
            <div className='col-md-1'></div>
            <div className='col-md-4 pt-3'>
              <p className='font-400-16'>Course</p>
              <select onChange={e => {sessionStorage.setItem("interestedCourse", e.target.value)}} className='font-400-18 textfield' type="text" placeholder='Class'>
              <option selected disabled>COURSE</option>
              {courseNameDB.map((s) => (
                <option value={s.courseId}>{s.courseName}</option>
              ))}
              </select>
            </div>
          </div>
          <div className='pt-4 row'>
            <div className='col-sm-2'></div>
            <div className='col-sm-4'>
              <button onClick={e => {setCoursePopup(false); clearPopupSessionStorage()}} className='previous-box'>Close</button>
            </div>
            <div className='col-sm-4'>
              <button onClick={e => {setPreferanceArr(prevState => [...prevState, {                
                "interestedCourseCategoryId": sessionStorage.getItem("interestedCategory"),
                "interestedCourseId": sessionStorage.getItem("interestedCourse"),
                "interestedDistrictId": sessionStorage.getItem("interestedDistrict"),
                "interestedSectorId": sessionStorage.getItem("interestedSector"),
                "interestedTalukaId": null,
                "sNo": sNo}] );setCoursePopup(false); setSno(sNo+1); console.log(preferanceArr);}} className='next-box'>Add</button>
            </div>
            <div className='col-sm-2'></div>
          </div>
        </div>
      </div> : <div /> }
    <div className='align-to-top box'>
        <Container>
            <div className='heading-font row'>Course Details</div>
            <div className='table-padding row'>
                <div className='col-sm-3'>
                    <button onClick={e => setCoursePopup(true) } className='new-course-button'>New Course</button>
                </div>
            </div>
            <div className='table-font row'>
                <table>
                    <tr className="table-padding-inner">
                        <th className='pb-3'>Sl.No.</th>
                        <th className='pb-3'>Course</th>
                        <th className='pb-3'>District</th>
                    </tr>
                    {preferanceArr.map((s) => (
                      <tr className='py-3'>
                        <td className='pt-2'>{s.sNo+1}</td>
                        <td className='pt-2'>{s.interestedCourseId}</td>
                        <td className='pt-2'>{s.interestedDistrictId}</td>
                      </tr>
                    ))}
              </table>
            </div>
      <div className='pt-5 row'>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-md-3'>
        <button onClick={toAddressDetails}  className='previous-box'>Back</button>
        </div>
        <div className='col-md-3'>
        <button onClick={() => {sessionStorage.setItem("preferanceArr", JSON.stringify(preferanceArr)); toRelocationDetails()}} className='next-box'>Next</button>
        </div>
      </div>
      </Container>
        
    </div>
    </>
  )
}

export default CourseDetails