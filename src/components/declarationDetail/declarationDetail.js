import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../relocationDetails/relocationDetails.css'
import './declarationDetail.css'
import axios from 'axios'

export default function DeclarationDetail() {

  const[relocationDistrict, setRelocationDistrict] = useState(false)

  const navigate = useNavigate()

  const toSuccessPage = async () => {
    await axios.post("http://127.0.0.1:7012/app1/v1/PublicServer/registrati8/save", {
        "postParam": {
          "obj": {
            "address": sessionStorage.getItem("HouseNo")+sessionStorage.getItem("StreetName"),
            "assemblyId": 81,
            "categoryId": sessionStorage.getItem("Caste"),
            "configArr": {
              "asemblyConstituncyMandatory": 0,
              "counsilConstitutionMandatory": 1,
              "courseMandatory": 1,
              "districtMandatory": 1,
              "isDistrictSearchIsAllow": 0,
              "maxDOB": 46,
              "maxSectorPreferenceAllow": 3,
              "minDOB": 18,
              "minSectorPreferenceAllow": 1,
              "policeStationMandatory": 1,
              "postOfficeMandatory": 1,
              "sectorMandatory": 1,
              "talukaMandatory": 1,
              "tehsilMandatory": 0,
              "viewAssesmblyConstitution": 1,
              "viewCounsilConstitution": 1,
              "viewDistrictPreference": 1,
              "viewPoliceStation": 1,
              "viewPostOffice": 1,
              "viewSectorPreference": 1,
              "viewTalukaPreference": 0,
              "viewTeaTribe": 1,
              "viewTehsil": 1
            },
            "contactVerification": {
              "email1Verified": null,
              "enteredMobile1OTP": sessionStorage.getItem("OTP"),
              "insertedId": sessionStorage.getItem("insertedId"),
              "mobile1": sessionStorage.getItem("MobileNo"),
              "mobile1OTP": sessionStorage.getItem("otpBackend"),
              "mobile1Verified": true
            },
            "councilId": 10,
            "countryId": 97,
            "currentAddressSameAsPermanentAddress": 1,
            "declarationAccept": true,
            "disability": 0,
            "districtId": sessionStorage.getItem("DistrictName"),
            "dob": sessionStorage.getItem("dateOfBirth"),
            "fatherName": sessionStorage.getItem("fathersName"),
            "firstName": sessionStorage.getItem("firstName"),
            "genderName": sessionStorage.getItem("gender"),
            "idNumber": sessionStorage.getItem("IdCardNo"),
            "idType": sessionStorage.getItem("IdType"),
            "isAntodayaCardHolder": 0,
            "isBocw": 0,
            "isBPLCardHolder": 0,
            "isMinority": 0,
            "isNregaCardHolder": 0,
            "isTeaTribe": 0,
            "isWillingDistrict": 0,
            "isWillingState": 0,
            "jvId": "14",
            "lastName": sessionStorage.getItem("lastName"),
            "mobile1": sessionStorage.getItem("MobileNo"),
            "motherName": sessionStorage.getItem("mothersName"),
            "pin": sessionStorage.getItem("Pincode"),
            "placeName": sessionStorage.getItem("CityVillageName"),
            "policeStation": sessionStorage.getItem("PS"),
            "postOffice": sessionStorage.getItem("PO"),
            "Preference": [
              true,
              true,
              true
            ],
            "preferenceArr": JSON.parse(sessionStorage.getItem("preferanceArr")),
            "preferenceDist1": "",
            "preferenceDist2": "",
            "preferenceDist3": "",
            "preferenceState1": "",
            "preferenceState2": "",
            "preferenceState3": "",
            "qualificationId": 10,
            "religionId": sessionStorage.getItem("Religion"),
            "sectorCourseDetails": [],
            "selectedPreferenceArr": JSON.parse(sessionStorage.getItem("preferanceArr")),
            "stateId": 4,
            "ulbId": 21,
            "urban": 1
          }
        }
    }).then((response) => {
        navigate('/success')
        sessionStorage.setItem("success_message", response.data.message)
        console.log(response)
    })
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
