/**
 * Created by jitendras.
 */
'use strict'
let co = require('co');
let moment = require('moment');
let mysqlDB = require('../../../../JOS/DALMYSQLConnection');
let query = require('../../queries/qCandidateRegistration/candidateRegistrationQuery');
let emailValidator = require('email-validator');
let smsService = require('../../../../JOS/smsService');
let mailService = require('../../../../JOS/emailService');
let JVID = 14;
let STATEID = 4;
let DATEFORMAT = "DD/MM/YYYY";
let DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
let OTHERQUALIFICATIONID = 9;
let FROMEMAIL = "asdm@ds.assamskillmission.org";
let DBDATEFORMAT = "YYYY-MM-DD";
let YEARFORMAT = "YYYY";
let MONTHFORMAT = "MM";
let CANDIDATE_COUNT_PADDED_LENGTH = 4;
let MIN_OTP = 100001;
let MAX_OTP = 999999;
/****************************************************************************************/
/****************************************************************************************/
/*
For more info on the algorithm: http://en.wikipedia.org/wiki/Verhoeff_algorithm
by Sergey Petushkov, 2014
*/
// multiplication table d
var d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
// permutation table p
var p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
// inverse table inv
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
// converts string or number to an array and inverts it
function invArray(array) {

    if (Object.prototype.toString.call(array) == "[object Number]") {
        array = String(array);
    }

    if (Object.prototype.toString.call(array) == "[object String]") {
        array = array.split("").map(Number);
    }

    return array.reverse();

}
// generates checksum
function generate(array) {

    var c = 0;
    var invertedArray = invArray(array);

    for (var i = 0; i < invertedArray.length; i++) {
        c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
    }

    return inv[c];
}
// validates checksum
function validate(array) {

    var c = 0;
    var invertedArray = invArray(array);

    for (var i = 0; i < invertedArray.length; i++) {
        c = d[c][p[(i % 8)][invertedArray[i]]];
    }

    return (c === 0);
}
/****************************************************************************************/
/****************************************************************************************/
let isFloat = function (num) {
    try {
        var val = parseFloat(num);
        if (isNaN(val)) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
/****************************************************************************************/
/****************************************************************************************/
let isInt = function (num) {
    try {
        var val = parseInt(num);
        if (!isNaN(val) && val.toString() === num.toString()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
/****************************************************************************************/
/****************************************************************************************/
let locationArr = co.wrap(function* (postParam, locationQuery, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {

        try {
            queryResultObj = yield mysqlDB.query(connection, query[locationQuery], [postParam.jvId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-LA10");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let locationByParentLocationIdArr = co.wrap(function* (postParam, locationQuery, parentLocationId, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query[locationQuery], [postParam.jvId, parentLocationId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-LBPLIA10");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {

            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let religionArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.religion, []);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(religionArr)");
        }
        resultObj = queryResultObj;
        return resultObj;
    } catch (error) {
        console.error(error);
        throw error;
    }
})
/********************************************************************************/
/********************************************************************************/
let assemblyArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.assembly, []);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(CRS-AA)");
        }
        resultObj.objArr = queryResultObj;
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            return resultObj.objArr;
        } else {
            return resultObj;
        }

    } catch (error) {
        throw error;
    }

});
/********************************************************************************/
/********************************************************************************/
let councilArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = {};
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.council, []);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(CRS-CA)");
        }
        resultObj.objArr = queryResultObj;
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            return resultObj.objArr;
        } else {
            return resultObj;
        }

    } catch (error) {
        throw error;
    }

});

/********************************************************************************/
/********************************************************************************/

let courseCategoryArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.courseCategory, [postParam.jvId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(courseCategoryArr)");
        }
        resultObj.objArr = queryResultObj;
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            return resultObj.objArr;
        } else {
            return resultObj;
        }

    } catch (error) {
        throw error;
    }
});

/********************************************************************************/
/********************************************************************************/
exports.sectorArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = {};
    let mysqlCon = null;
    try {
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(candidateRegistrationService)")
        }
        try {
            queryResultObj = yield mysqlDB.query(mysqlCon, query.sector, [postParam.jvId, postParam.courseCategoryId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SA10");
        }
        resultObj.objArr = queryResultObj;

        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj.status = "success";
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
exports.getCourse = co.wrap(function* (postParam, course) {
    let queryResultObj = null;
    let resultObj = {};
    let mysqlCon = null;
    try {
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-S10)");
        }
        queryResultObj = yield mysqlDB.query(mysqlCon, query.course, [postParam.jvId, postParam.courseCategoryId, postParam.sectorId]);
        resultObj.objArr = queryResultObj;
        resultObj.status = "success";
        return resultObj;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

/********************************************************************************/
/********************************************************************************/
let categoryArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.category);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-CA10");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let qualificationArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.qualification);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-QA10");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let genderArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.gender);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GA10");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let idTypeArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.idType);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error (CRD-ITA-10)");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            resultObj = queryResultObj;
            return resultObj;
        } else {
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let getPreferenceArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getAllowPreference, [postParam.jvId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error (CRA-GPA-10)");
        }
        if (queryResultObj !== null &&
            queryResultObj !== undefined &&
            queryResultObj.length > 0) {
            resultObj = queryResultObj
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
let getConfigArr = co.wrap(function* (postParam, connection) {
    let queryResultObj = null;
    let resultObj = {};
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getConfigArr, [postParam.jvId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error (CRS-GCA-10)");
        }

        if (queryResultObj !== null &&
            queryResultObj !== undefined &&
            queryResultObj.length > 0) {
            resultObj = queryResultObj[0].ConfigDetails;
            try {
                resultObj = JSON.parse(resultObj);

            } catch (error) {
                console.error(error);
                throw new Error("Internal Server Error(Access Permission JSON Parsing Failed-sCandidateRegistrationService-CRS-CD30)");
            }
            return resultObj;
        }
    } catch (error) {
        throw error;
    }
});
/********************************************************************************/
/********************************************************************************/
exports.getAssemblyArr = co.wrap(function* (postParam) {
    let resultObj = {};
    let queryResultObj = {};
    let mysqlCon = {};
    try {
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error();
            throw new Error("Internal Server Error (CRD-GAA-10)");
        }
        if (postParam.councilId && postParam.councilId.toString().trim().length > 0) {
            queryResultObj.assemblyArr = yield mysqlDB.query(mysqlCon, query.assembly, [postParam.councilId]);
        }
        if (queryResultObj.assemblyArr && queryResultObj.assemblyArr.length > 0) {
            resultObj.assemblyArr = queryResultObj.assemblyArr;
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error (CRD-GAA-20)");
    } finally {
        if (resultObj !== null) {
            resultObj = null;
        }
        if (mysqlCon !== null) {
            mysqlCon = null;
        }
    }
});
/********************************************************************************/
/********************************************************************************/
/*
Get
*/
exports.get = co.wrap(function* (postParam) {
    let resultObj = {};
    let mysqlCon = null;
    let stateId = null;
    try {
        /******************************************************************************/
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-G10)");
        }
        /******************************************************************************/
        if (postParam.jvId !== undefined &&
            postParam.jvId !== null &&
            postParam.jvId.toString().trim().length > 0) {} else {
            throw new Error("Invalid JvId In Request" + postParam.jvId + "(sCandidateRegistrationCRS-G20)");
        }
        /******************************************************************************/
        stateId = yield mysqlDB.query(mysqlCon, query.stateId, []);
        resultObj.stateId = stateId[0].stateId;
        resultObj.countryArr = yield locationArr(postParam, 'countryArr', mysqlCon);
        resultObj.categoryArr = yield categoryArr(postParam, mysqlCon);
        resultObj.qualificationArr = yield qualificationArr(postParam, mysqlCon);
        resultObj.genderArr = yield genderArr(postParam, mysqlCon);
        resultObj.idTypeArr = yield idTypeArr(postParam, mysqlCon);
        resultObj.interestedDistrictArr = yield locationByParentLocationIdArr(postParam, 'district', STATEID, mysqlCon);
        resultObj.religionArr = yield religionArr(postParam, mysqlCon);
        resultObj.dateFormat = DATEFORMAT;
        resultObj.configArr = yield getConfigArr(postParam, mysqlCon);
        resultObj.courseCategoryArr = yield courseCategoryArr(postParam, mysqlCon);
        // resultObj.assemblyArr = yield assemblyArr(postParam, mysqlCon);
        resultObj.councilArr = yield councilArr(postParam, mysqlCon);
        resultObj.districtArr = yield districtArr(postParam, mysqlCon)
        resultObj.preferenceArr = [];
        for (let i = 0; i < resultObj.configArr.maxSectorPreferenceAllow; i++) {
            resultObj.preferenceArr.push({
                "sNo": i,
                "interestedCourseCategoryId": null,
                "interestedSectorId": null,
                "interestedCourseId": null,
                "interestedDistrictId": null,
                "interestedTalukaId": null
            });
        }

        /******************************************************************************/
        resultObj.status = "success";
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (mysqlCon !== null) {
            mysqlCon.release();
        }
    }
});
/********************************************************************************/
/********************************************************************************/
let districtArr = async (postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.districtList);
        if (resultObj.objArr.length === 0) {
            throw new Error("No Districts Found");
        } else {
            resultObj.status = "success";
        }
        return resultObj.objArr;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}

/********************************************************************************/
/********************************************************************************/

exports.getLocation = co.wrap(function* (postParam) {
    let resultObj = {};
    let mysqlCon = null;
    try {
        /******************************************************************************/
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GL10)");
        }
        /*********************************************************************************/
        postParam.parentLocation = postParam.parentLocation.toString().trim();
        postParam.location = postParam.location.toString().trim();
        if (postParam.parentLocationId !== undefined && postParam.parentLocationId !== null &&
            postParam.parentLocationId.toString().trim().length > 0) {
            if (!isInt(postParam.parentLocationId.toString().trim())) {
                throw new Error("Please Select " + postParam.parentLocation + "(sCandidateRegistrationCRS-GL20)");
            }
            postParam.parentLocationId = parseInt(postParam.parentLocationId.toString().trim());
        } else {
            throw new Error("Please Select " + postParam.parentLocation + "(sCandidateRegistrationCRS-GL30)");
        }
        /******************************************************************************/
        resultObj.locationArr = yield locationByParentLocationIdArr(postParam, postParam.location,
            postParam.parentLocationId, mysqlCon);
        /******************************************************************************/
        resultObj.status = "success";
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (mysqlCon !== null) {
            mysqlCon.release();
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let idCheck = co.wrap(function* (postParam, id, connection) {
    let queryResultObj = null;
    let email1InDB = null;
    let update = false;
    let changed = false;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.idCheckInCandidate, [postParam.obj.jvId, id]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-UCH20)");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            if (queryResultObj[0].rowCount > 0) {
                throw new Error("Id with  Number '" + id + "' Is Already Registered");
            }
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-UCH30)");
        }

    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let email1Check = co.wrap(function* (postParam, emailId, connection) {
    let queryResultObj = null;
    let email1InDB = null;
    let update = false;
    let changed = false;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.emailCheckInCandidate, [JVID, emailId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-ECH20)");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            if (queryResultObj[0].rowCount > 0) {
                throw new Error("Email Id '" + emailId + "'' Is Already Registered");
            }
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-ECH30)");
        }

    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let mobile1Check = co.wrap(function* (postParam, mobileNo, connection) {
    let queryResultObj = null;
    let email1InDB = null;
    let update = false;
    let changed = false;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.mobileCheckInCandidate, [postParam.obj.jvId, mobileNo]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-MCH20)");
        }
        if (queryResultObj !== undefined && queryResultObj !== null && queryResultObj.length > 0) {
            if (queryResultObj[0].rowCount > 0) {
                throw new Error("Mobile No '" + mobileNo + "'' Is Already Registered");
            }
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-MCH30)");
        }
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
/*
Validate Obj
*/
let validateObj = co.wrap(function* (postParam, connection) {
    let countIterator = 1;
    let numExp = /^\d+$/;
    let nameExp = /^[a-zA-Z. ]+$/;
    let dobMoment = null;
    let currentMoment = moment();
    let aadharArr = [];
    let differenceInYears = 0;
    let panCardPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    try {
        /************************************************************************************************************************************/
        /************************************************************************************************************************************/
        // First Name
        if (postParam.obj.firstName !== undefined &&
            postParam.obj.firstName !== null &&
            postParam.obj.firstName.toString().trim().length > 0) {
            if (postParam.obj.firstName.toString().trim().length > 100) {
                throw new Error("First Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.firstName = postParam.obj.firstName.toString().trim().toUpperCase();
            if (!postParam.obj.firstName.toString().trim().match(nameExp)) {
                throw new Error("Invalid First Name(Allowed Characters A to Z,a to z,.,space)");
            }
        } else {
            throw new Error("First Name Is Mandatory");
        }
        /*****************************************************************************/
        // Middle Name
        if (postParam.obj.middleName !== undefined &&
            postParam.obj.middleName !== null &&
            postParam.obj.middleName.toString().trim().length > 0) {
            if (postParam.obj.middleName.toString().trim().length > 100) {
                throw new Error("Middle Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.middleName = postParam.obj.middleName.toString().trim().toUpperCase();
            if (!postParam.obj.middleName.toString().trim().match(nameExp)) {
                throw new Error("Invalid Middle Name(Allowed Characters A to Z,a to z,.,space)");
            }
        } else {
            postParam.obj.middleName = null;
        }
        /*****************************************************************************/
        // Last Name
        if (postParam.obj.lastName !== undefined &&
            postParam.obj.lastName !== null &&
            postParam.obj.lastName.toString().trim().length > 0) {
            if (postParam.obj.lastName.toString().trim().length > 100) {
                throw new Error("Last Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.lastName = postParam.obj.lastName.toString().trim().toUpperCase();
            if (!postParam.obj.lastName.toString().trim().match(nameExp)) {
                throw new Error("Invalid Last Name(Allowed Characters A to Z,a to z,.,space)");
            }
        } else {
            postParam.obj.lastName = null;
        }
        /*****************************************************************************/
        // Full Name
        if (postParam.obj.middleName !== null) {
            if (postParam.obj.lastName !== null) {
                postParam.obj.name = postParam.obj.firstName + " " + postParam.obj.middleName + " " + postParam.obj.lastName;
            } else {
                postParam.obj.name = postParam.obj.firstName + " " + postParam.obj.middleName;
            }
        } else {
            if (postParam.obj.lastName !== null) {
                postParam.obj.name = postParam.obj.firstName + " " + postParam.obj.lastName;
            } else {
                postParam.obj.name = postParam.obj.firstName;
            }
        }

        /*****************************************************************************/
        // Gender
        if (postParam.obj.genderName !== undefined &&
            postParam.obj.genderName !== null &&
            postParam.obj.genderName.toString().trim().length > 0) {

            postParam.obj.genderName = postParam.obj.genderName.toString();
        } else {
            throw new Error("Gender Is Mandatory");
        }
        /*****************************************************************************/
        // DOB
        if (postParam.obj.dob !== undefined &&
            postParam.obj.dob !== null &&
            postParam.obj.dob.toString().trim().length > 0) {
            dobMoment = moment(postParam.obj.dob, DATEFORMAT, true);
            if (!dobMoment.isValid()) {
                throw new Error("Date Of Birth Must Be In '" + DATEFORMAT + "' Format");
            }
            if (dobMoment.isAfter(currentMoment)) {
                throw new Error("Date Of Birth Must Be Past Date");
            }
            differenceInYears = currentMoment.diff(dobMoment, 'years');
            if (differenceInYears < postParam.obj.configArr.minDOB) {
                throw new Error("You Must Be At least" + " " + postParam.obj.configArr.minDOB + " " + "Years Old To Register");
            }
            if (differenceInYears > postParam.obj.configArr.maxDOB) {
                throw new Error("Maximum Age For The Registration Is" + " " + postParam.obj.configArr.maxDOB);
            }
            postParam.obj.dob = dobMoment.toDate();
        } else {
            throw new Error("Date Of Birth Is Mandatory");
        }

        /*****************************************************************************/
        // Mother Name
        if (postParam.obj.motherName !== undefined &&
            postParam.obj.motherName !== null &&
            postParam.obj.motherName.toString().trim().length > 0) {
            if (postParam.obj.motherName.toString().trim().length > 100) {
                throw new Error("Mother Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.motherName = postParam.obj.motherName.toString().trim().toUpperCase();
            if (!postParam.obj.motherName.toString().trim().match(nameExp)) {
                throw new Error("Invalid Mother Name(Allowed Characters A to Z,a to z,.,space)");
            }
        } else {
            throw new Error("Mother Name Is Mandatory");
        }
        /*****************************************************************************/
        // Father Name
        if (postParam.obj.fatherName !== undefined &&
            postParam.obj.fatherName !== null &&
            postParam.obj.fatherName.toString().trim().length > 0) {
            if (postParam.obj.fatherName.toString().trim().length > 100) {
                throw new Error("Father Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.fatherName = postParam.obj.fatherName.toString().trim().toUpperCase();
            if (!postParam.obj.fatherName.toString().trim().match(nameExp)) {
                throw new Error("Invalid Father Name(Allowed Characters A to Z,a to z,.,space)");
            }
        } else {
            throw new Error("Father Name Is Mandatory");
        }
        /*****************************************************************************/
        // Id Number
        if (postParam.obj.idNumber !== undefined &&
            postParam.obj.idNumber !== null &&
            postParam.obj.idNumber.toString().trim().length > 0) {
            if (postParam.obj.idType == 1) {
                if (!panCardPattern.test(postParam.obj.idNumber)) {
                    throw new Error("Enter Valid PAN Card Number");
                }
                yield idCheck(postParam, postParam.obj.idNumber, connection);
                postParam.obj.idNumber = postParam.obj.idNumber.toString().trim().toUpperCase();
            } else {
                if (postParam.obj.idNumber.toString().trim().length !== 12) {
                    throw new Error("Aadhar Number Must Be Equal To 12 Characters");
                }

                aadharArr = postParam.obj.idNumber.split('');
                if (!validate(aadharArr)) {
                    throw new Error("Invalid Aadhar Number.Please check the aadhar number you have entered");
                }
                yield idCheck(postParam, postParam.obj.idNumber, connection);
                postParam.obj.idNumber = postParam.obj.idNumber.toString().trim().toUpperCase();
            }

        } else {
            throw new Error("Id Number Is Mandatory");
        }

        /*****************************************************************************/
        // Religon
        if (postParam.obj.religionId !== undefined &&
            postParam.obj.religionId !== null &&
            postParam.obj.religionId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.religionId.toString().trim())) {
                throw new Error("Please Select Your Religion");
            }
        } else {
            throw new Error("Please Select Your Religion");
        }

        /*****************************************************************************/
        // Category Id
        if (postParam.obj.categoryId !== undefined &&
            postParam.obj.categoryId !== null &&
            postParam.obj.categoryId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.categoryId.toString().trim())) {
                throw new Error("Please Select Category");
            }
            postParam.obj.categoryId = parseInt(postParam.obj.categoryId.toString().trim());
        } else {
            throw new Error("Category Is Mandatory");
        }
        /*****************************************************************************/
        // Qualification
        if (postParam.obj.qualificationId !== undefined &&
            postParam.obj.qualificationId !== null &&
            postParam.obj.qualificationId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.qualificationId.toString().trim())) {
                throw new Error("Please Select Qualification");
            }
            postParam.obj.qualificationId = parseInt(postParam.obj.qualificationId.toString().trim());
        } else {
            throw new Error("Qualification Is Mandatory");
        }
        /*****************************************************************************/
        if (postParam.obj.otherQualification !== undefined &&
            postParam.obj.otherQualification !== null &&
            postParam.obj.otherQualification.toString().trim().length > 0) {
            if (postParam.obj.otherQualification.toString().trim().length > 100) {
                throw new Error("Other Qualification Details Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.otherQualification = postParam.obj.otherQualification.toString().trim();
        } else {
            if (postParam.obj.qualificationId === OTHERQUALIFICATIONID) {
                throw new Error("Please Enter Other Qualification Details");
            } else {
                postParam.obj.otherQualification = null;
            }
        }

        /*****************************************************************************/

        // if (postParam.obj.contactVerification.email1Verified !== undefined &&
        //     postParam.obj.contactVerification.email1Verified !== null &&
        //     postParam.obj.contactVerification.email1Verified === true) {} else {
        //     throw new Error("Verify your Email ID to Register");
        // }

        /*****************************************************************************/
        if (postParam.obj.email2 !== undefined &&
            postParam.obj.email2 !== null &&
            postParam.obj.email2.toString().trim().length > 0) {
            if (postParam.obj.email2.toString().trim().length > 100) {
                throw new Error("Alternative Email Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.email2 = postParam.obj.email2.toString().trim();
            if (!emailValidator.validate(postParam.obj.email2)) {
                throw new Error("Invalid Alternative Email");
            }
        } else {
            postParam.obj.email2 = null;
        }
        /*****************************************************************************/
        if (postParam.obj.mobile1 !== undefined &&
            postParam.obj.mobile1 !== null &&
            postParam.obj.mobile1.toString().trim().length > 0) {
            if (!postParam.obj.mobile1.toString().trim().match(numExp)) {
                throw new Error("Invalid Mobile No");
            }
            if (postParam.obj.mobile1.toString().trim().length !== 10) {
                throw new Error("Mobile No Must Be Equal To 10 Numeric Characters");
            }
            postParam.obj.mobile1 = postParam.obj.mobile1.toString().trim();
            yield mobile1Check(postParam, postParam.obj.mobile1, connection);
        } else {
            throw new Error("Mobile No Is Mandatory");
        }
        if (postParam.obj.contactVerification.mobile1Verified !== undefined &&
            postParam.obj.contactVerification.mobile1Verified !== null &&
            postParam.obj.contactVerification.mobile1Verified === true) {} else {
            throw new Error("Verify your Mobile Number to Register");
        }
        /*****************************************************************************/
        if (postParam.obj.mobile2 !== undefined &&
            postParam.obj.mobile2 !== null &&
            postParam.obj.mobile2.toString().trim().length > 0) {
            if (!postParam.obj.mobile2.toString().trim().match(numExp)) {
                throw new Error("Invalid Alternative Mobile No");
            }
            if (postParam.obj.mobile2.toString().trim().length !== 10) {
                throw new Error("Alternative Mobile No Must Be Equal To 10 Numeric Characters");
            }
            postParam.obj.mobile2 = postParam.obj.mobile2.toString().trim();
        } else {
            postParam.obj.mobile2 = null;
        }
        /*****************************************************************************/
        /*Check For Current Address Details*/
        /*Starts*/
        /*****************************************************************************/
        if (postParam.obj.address !== undefined &&
            postParam.obj.address !== null &&
            postParam.obj.address.toString().trim().length > 0) {
            if (postParam.obj.address.toString().trim().length > 100) {
                throw new Error("Address Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.address = postParam.obj.address.toString().trim();
        } else {
            throw new Error("Address Is Mandatory");
        }

        if (postParam.obj.placeName !== undefined &&
            postParam.obj.placeName !== null &&
            postParam.obj.placeName.toString().trim().length > 0) {
            if (postParam.obj.placeName.toString().trim().length > 100) {
                throw new Error("City Name Must Be Less Than Or Equal To 100 Characters");
            }
            postParam.obj.placeName = postParam.obj.placeName.toString().trim();
        } else {
            if (postParam.obj.urban === 1) {
                throw new Error("Please Enter City Name");
            } else {
                throw new Error("Please Enter Village Name");
            }
        }
        /*****************************************************************************/
        // if (postParam.obj.village !== undefined &&
        //     postParam.obj.village !== null &&
        //     postParam.obj.village.toString().trim().length > 0) {
        //     if (postParam.obj.village.toString().trim().length > 100) {
        //         throw new Error("Village Name Must Be Less Than Or Equal To 100 Characters");
        //     }
        //     postParam.obj.village = postParam.obj.village.toString().trim();
        // } else {
        //     if (postParam.obj.urban === 0) {
        //         throw new Error("Please Enter Village Name");
        //     } else {
        //         postParam.obj.village = null;
        //     }
        // }
        if (postParam.obj.countryId !== undefined &&
            postParam.obj.countryId !== null &&
            postParam.obj.countryId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.countryId.toString().trim())) {
                throw new Error("Please Select Country");
            }
            postParam.obj.countryId = parseInt(postParam.obj.countryId.toString().trim());
        } else {
            throw new Error("Please Select Country");
        }
        /*****************************************************************************/
        if (postParam.obj.stateId !== undefined &&
            postParam.obj.stateId !== null &&
            postParam.obj.stateId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.stateId.toString().trim())) {
                throw new Error("Please Select State");
            }
            postParam.obj.stateId = parseInt(postParam.obj.stateId.toString().trim());
        } else {
            throw new Error("Please Select State");
        }
        /*****************************************************************************/
        if (postParam.obj.districtId !== undefined &&
            postParam.obj.districtId !== null &&
            postParam.obj.districtId.toString().trim().length > 0) {
            if (!isInt(postParam.obj.districtId.toString().trim())) {
                throw new Error("Please Select District");
            }
            postParam.obj.districtId = parseInt(postParam.obj.districtId.toString().trim());
        } else {
            throw new Error("Please Select District");
        }
        /*****************************************************************************/

        /*****************************************************************************/
        if (postParam.obj.urban !== undefined &&
            postParam.obj.urban !== null &&
            postParam.obj.urban.toString().trim().length > 0) {
            if (!isInt(postParam.obj.urban.toString().trim())) {
                throw new Error("Please Select 'City' Or 'Village' For City/Village");
            }
            postParam.obj.urban = parseInt(postParam.obj.urban.toString().trim());
            if (postParam.obj.urban === 0) {
                if (postParam.obj.talukaId !== undefined &&
                    postParam.obj.talukaId !== null &&
                    postParam.obj.talukaId.toString().trim().length > 0) {
                    if (!isInt(postParam.obj.talukaId.toString().trim())) {
                        throw new Error("Please Select Block");
                    }
                    postParam.obj.talukaId = parseInt(postParam.obj.talukaId.toString().trim());
                } else {
                    throw new Error("Please Select Block");
                }
            }
            if (postParam.obj.urban === 1) {
                if (postParam.obj.ulbId !== undefined &&
                    postParam.obj.ulbId !== null &&
                    postParam.obj.ulbId.toString().trim().length > 0) {
                    if (!isInt(postParam.obj.ulbId.toString().trim())) {
                        throw new Error("Please Select ULB");
                    }
                    postParam.obj.ulbId = parseInt(postParam.obj.ulbId.toString().trim());
                } else {
                    throw new Error("Please Select ULB");
                }
            }
        } else {
            throw new Error("Please Select 'City' Or 'Village' For City/Village");
        }
        /*****************************************************************************/

        /*****************************************************************************/
        if (postParam.obj.configArr.viewTehsil === 1) {
            if (postParam.obj.tehsil !== undefined &&
                postParam.obj.tehsil !== null &&
                postParam.obj.tehsil.toString().trim().length > 0) {
                if (postParam.obj.tehsil.toString().trim().length > 100) {
                    throw new Error("Tehsil name Must Be Less Than Or Equal To 100 Characters");
                }
                postParam.obj.tehsil = postParam.obj.tehsil.toString().trim();
            } else if (postParam.obj.configArr.tehsilMandatory === 1) {
                throw new Error("Please Select Tehasil");
            }
        }
        /*****************************************************************************/
        if (postParam.obj.pin !== undefined &&
            postParam.obj.pin !== null &&
            postParam.obj.pin.toString().trim().length > 0) {
            if (postParam.obj.pin.toString().trim().length > 6) {
                throw new Error("Pincode Must Be Equal To 6 Characters");
            }
            postParam.obj.pin = postParam.obj.pin.toString().trim();
        } else {
            throw new Error("Pincode Is Mandatory");
        }


        if (postParam.obj.configArr.viewAssesmblyConstitution === 1) {
            if (postParam.obj.assemblyId !== undefined &&
                postParam.obj.assemblyId !== null &&
                postParam.obj.assemblyId.toString().trim().length > 0) {
                if (!isInt(postParam.obj.assemblyId.toString().trim())) {
                    throw new Error("Please Select Current Address Assembly Constitution");
                }
                postParam.obj.assemblyId = parseInt(postParam.obj.assemblyId.toString().trim());
            } else if (postParam.obj.configArr.assemblyConstitutionMandatory === 1) {
                throw new Error("Please Select Current Address Assembly Constitution");
            }
        }

        if (postParam.obj.configArr.viewCounsilConstitution === 1) {
            if (postParam.obj.councilId !== undefined &&
                postParam.obj.councilId !== null &&
                postParam.obj.councilId.toString().trim().length > 0) {
                if (!isInt(postParam.obj.councilId.toString().trim())) {
                    throw new Error("Please Select Current Address Counsil Constitution");
                }
                postParam.obj.councilId = parseInt(postParam.obj.councilId.toString().trim());
            } else if (postParam.obj.configArr.counsilConstitutionMandatory === 1) {
                throw new Error("Please Select Current Address Counsil Constitution");
            }

        }

        if (postParam.obj.configArr.viewPoliceStation === 1) {
            if (postParam.obj.policeStation !== undefined &&
                postParam.obj.policeStation !== null &&
                postParam.obj.policeStation.toString().trim().length > 0) {
                postParam.obj.policeStation = postParam.obj.policeStation.toString().trim();

            } else if (postParam.obj.configArr.policeStationMandatory === 1) {
                throw new Error("Please Select Current Address Police Station");
            }
        }

        if (postParam.obj.configArr.viewPostOffice === 1) {
            if (postParam.obj.postOffice !== undefined &&
                postParam.obj.postOffice !== null &&
                postParam.obj.postOffice.toString().trim().length > 0) {
                postParam.obj.postOffice = (postParam.obj.postOffice.toString().trim());
            } else if (postParam.obj.configArr.postOfficeMandatory === 1) {
                throw new Error("Please Select Current Address Post Office");
            }
        }
        if (postParam.obj.currentAddressSameAsPermanentAddress !== undefined &&
            postParam.obj.currentAddressSameAsPermanentAddress !== null &&
            postParam.obj.currentAddressSameAsPermanentAddress.toString().trim().length > 0) {
            if (!isInt(postParam.obj.currentAddressSameAsPermanentAddress.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For Current Address Same As PermanentAddress ");
            }
            postParam.obj.currentAddressSameAsPermanentAddress = parseInt(postParam.obj.currentAddressSameAsPermanentAddress.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For Current Address Same As PermanentAddress ");
        }
        /*****************************************************************************/
        /*Check For Current Address Details*/
        /*Ends*/
        /*****************************************************************************/

        /*****************************************************************************/
        /*Check For The Permanent Address*/
        /*START*/
        /*****************************************************************************/
        if (postParam.obj.currentAddressSameAsPermanentAddress === 0) {
            /*****************************************************************************/
            if (postParam.obj.permanentAddress !== undefined &&
                postParam.obj.permanentAddress !== null &&
                postParam.obj.permanentAddress.toString().trim().length > 0) {
                if (postParam.obj.permanentAddress.toString().trim().length > 100) {
                    throw new Error("Permanent Address Must Be Less Than Or Equal To 100 Characters");
                }
                postParam.obj.permanentAddress = postParam.obj.permanentAddress.toString().trim();
            } else {
                throw new Error("Permanent Address Is Mandatory");
            }
            /****************************************************************************/
            if (postParam.obj.permanentCountryId !== undefined &&
                postParam.obj.permanentCountryId !== null &&
                postParam.obj.permanentCountryId.toString().trim().length > 0) {
                if (!isInt(postParam.obj.permanentCountryId.toString().trim())) {
                    throw new Error("Please Select Permanent Country");
                }
                postParam.obj.permanentCountryId = parseInt(postParam.obj.permanentCountryId.toString().trim());
            } else {
                throw new Error("Please Select Permanent Country");
            }


            /****************************************************************************/
            if (postParam.obj.permanentStateId !== undefined &&
                postParam.obj.permanentStateId !== null &&
                postParam.obj.permanentStateId.toString().trim().length > 0) {
                if (!isInt(postParam.obj.permanentStateId.toString().trim())) {
                    throw new Error("Please Select Permanent State");
                }
                postParam.obj.permanentStateId = parseInt(postParam.obj.permanentStateId.toString().trim());
            } else {
                throw new Error("Please Select Permanent State");
            }
            /****************************************************************************/
            if (postParam.obj.permanentDistrictId !== undefined &&
                postParam.obj.permanentDistrictId !== null &&
                postParam.obj.permanentDistrictId.toString().trim().length > 0) {
                if (!isInt(postParam.obj.permanentDistrictId.toString().trim())) {
                    throw new Error("Please Select Permanent District");
                }
                postParam.obj.permanentDistrictId = parseInt(postParam.obj.permanentDistrictId.toString().trim());
            } else {
                throw new Error("Please Select Permanent District");
            }
            /****************************************************************************/

            if (postParam.obj.configArr.viewTehsil === 1) {
                if (postParam.obj.permanentTehsil !== undefined &&
                    postParam.obj.permanentTehsil !== null &&
                    postParam.obj.permanentTehsil.toString().trim().length > 0) {
                    if (postParam.obj.permanentTehsil.toString().trim().length > 100) {
                        throw new Error("Tehsil name Must Be Less Than Or Equal To 100 Characters");
                    }
                    postParam.obj.permanentTehsil = postParam.obj.permanentTehsil.toString().trim();
                } else if (postParam.obj.configArr.tehsilMandatory === 1) {
                    throw new Error("Please Select Permanent  Tehasil");
                }
            }

            /*****************************************************************************/
            if (postParam.obj.permanentUrban !== undefined &&
                postParam.obj.permanentUrban !== null &&
                postParam.obj.permanentUrban.toString().trim().length > 0) {
                if (!isInt(postParam.obj.permanentUrban.toString().trim())) {
                    throw new Error("Please Select 'City' Or 'Village' For City/Village");
                }
                postParam.obj.permanentUrban = parseInt(postParam.obj.permanentUrban.toString().trim());
                if (postParam.obj.permanentUrban === 0) {
                    if (postParam.obj.permanentTalukaId !== undefined &&
                        postParam.obj.permanentTalukaId !== null &&
                        postParam.obj.permanentTalukaId.toString().trim().length > 0) {
                        if (!isInt(postParam.obj.permanentTalukaId.toString().trim())) {
                            throw new Error("Please Select Permanent Address Block");
                        }
                        postParam.obj.permanentTalukaId = parseInt(postParam.obj.permanentTalukaId.toString().trim());
                    } else {
                        throw new Error("Please Select Permanent Address Block");
                    }
                }
                if (postParam.obj.permanentUrban === 1) {
                    if (postParam.obj.permanentULBId !== undefined &&
                        postParam.obj.permanentULBId !== null &&
                        postParam.obj.permanentULBId.toString().trim().length > 0) {
                        if (!isInt(postParam.obj.permanentULBId.toString().trim())) {
                            throw new Error("Please Select Permanent Address ULB");
                        }
                        postParam.obj.permanentULBId = parseInt(postParam.obj.permanentULBId.toString().trim());
                    } else {
                        throw new Error("Please Select Permanent Address ULB");
                    }
                }
            } else {
                throw new Error("Please Select 'City' Or 'Village' For City/Village");
            }
            /*****************************************************************************/
            if (postParam.obj.permanentPlaceName !== undefined &&
                postParam.obj.permanentPlaceName !== null &&
                postParam.obj.permanentPlaceName.toString().trim().length > 0) {
                if (postParam.obj.permanentPlaceName.toString().trim().length > 100) {
                    throw new Error("City Name Must Be Less Than Or Equal To 100 Characters");
                }
                postParam.obj.permanentPlaceName = postParam.obj.permanentPlaceName.toString().trim();
            } else {
                if (postParam.obj.urban === 1) {
                    throw new Error("Please Enter City Name");
                } else {
                    throw new Error("Please Enter Village Name");
                }
            }
            /*****************************************************************************/
            // if (postParam.obj.permanentVillage !== undefined &&
            //     postParam.obj.permanentVillage !== null &&
            //     postParam.obj.permanentVillage.toString().trim().length > 0) {
            //     if (postParam.obj.permanentVillage.toString().trim().length > 100) {
            //         throw new Error("Village Name Must Be Less Than Or Equal To 100 Characters");
            //     }
            //     postParam.obj.permanentVillage = postParam.obj.permanentVillage.toString().trim();
            // } else {
            //     if (postParam.obj.urban === 0) {
            //         throw new Error("Please Enter Village Name");
            //     } else {
            //         postParam.obj.permanentVillage = null;
            //     }
            // }

            /*****************************************************************************/
            if (postParam.obj.permanentAddressPin !== undefined &&
                postParam.obj.permanentAddressPin !== null &&
                postParam.obj.permanentAddressPin.toString().trim().length > 0) {
                if (postParam.obj.permanentAddressPin.toString().trim().length > 6) {
                    throw new Error("Pincode Must Be Equal To 6 Characters");
                }
                postParam.obj.permanentAddressPin = postParam.obj.pin.toString().trim();
            } else {
                throw new Error("Permanent Address Pincode Is Mandatory");
            }


            if (postParam.obj.configArr.viewAssemblyConstitution === 1) {
                if (postParam.obj.permanentAssemblyId !== undefined &&
                    postParam.obj.permanentAssemblyId !== null &&
                    postParam.obj.permanentAssemblyId.toString().trim().length > 0) {
                    if (!isInt(postParam.obj.permanentAssemblyId.toString().trim())) {
                        throw new Error("Please Select Permanent Address Assesmbly Constitution");
                    }
                    postParam.obj.permanentAssemblyId = parseInt(postParam.obj.permanentAssemblyId.toString().trim());
                } else if (postParam.obj.configArr.assemblyConstitutionMandatory === 1) {
                    throw new Error("Please Select Permanent Address Assembly Constitution");
                }
            }

            if (postParam.obj.configArr.viewCouncilConstitution === 1) {
                if (postParam.obj.permanentCouncilId !== undefined &&
                    postParam.obj.permanentCouncilId !== null &&
                    postParam.obj.permanentCouncilId.toString().trim().length > 0) {
                    if (!isInt(postParam.obj.permanentCouncilId.toString().trim())) {
                        throw new Error("Please Select Permanent Address Counsil Constitution");
                    }
                    postParam.obj.permanentCouncilId = parseInt(postParam.obj.permanentCouncilId.toString().trim());
                } else if (postParam.obj.configArr.counsilConstitutionMandatory === 1) {
                    throw new Error("Please Select Permanent Address Counsil Constitution");
                }

            }

            if (postParam.obj.configArr.viewPoliceStation === 1) {
                if (postParam.obj.permanentPoliceStation !== undefined &&
                    postParam.obj.permanentPoliceStation !== null &&
                    postParam.obj.permanentPoliceStation.toString().trim().length > 0) {
                    postParam.obj.permanentPoliceStation = (postParam.obj.permanentPoliceStation.toString().trim());
                } else if (postParam.obj.configArr.policeStationMandatory === 1) {
                    throw new Error("Please Select Permanent Address Police Station");
                }
            }

            if (postParam.obj.configArr.viewPostOffice === 1) {
                if (postParam.obj.permanentPostOffice !== undefined &&
                    postParam.obj.permanentPostOffice !== null &&
                    postParam.obj.permanentPostOffice.toString().trim().length > 0) {
                    postParam.obj.permanentPostOffice = (postParam.obj.permanentPostOffice.toString().trim());
                } else if (postParam.obj.configArr.postOfficeMandatory === 1) {
                    throw new Error("Please Select Permanent Address Post office");
                }
            }
        }

        /*****************************************************************************/
        /*Check For The Permanent Address*/
        /*ENDS*/
        /*****************************************************************************/

        /******************************************************************************/
        /*Check For the other details*/
        /*Start*/
        /******************************************************************************/
        if (postParam.obj.disability !== undefined &&
            postParam.obj.disability !== null &&
            postParam.obj.disability.toString().trim().length > 0) {
            if (!isInt(postParam.obj.disability.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For Disability");
            }
            postParam.obj.disability = parseInt(postParam.obj.disability.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For Disability");
        }
        /*****************************************************************************/
        if (postParam.obj.isBPLCardHolder !== undefined &&
            postParam.obj.isBPLCardHolder !== null &&
            postParam.obj.isBPLCardHolder.toString().trim().length > 0) {
            if (!isInt(postParam.obj.isBPLCardHolder.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For BPLCardHolder");
            }
            postParam.obj.isBPLCardHolder = parseInt(postParam.obj.isBPLCardHolder.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For BPLCardHolder");
        }
        /*****************************************************************************/
        if (postParam.obj.isAntodayaCardHolder !== undefined &&
            postParam.obj.isAntodayaCardHolder !== null &&
            postParam.obj.isAntodayaCardHolder.toString().trim().length > 0) {
            if (!isInt(postParam.obj.isAntodayaCardHolder.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For AntodayaCardHolder");
            }
            postParam.obj.isAntodayaCardHolder = parseInt(postParam.obj.isAntodayaCardHolder.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For AntodayaCardHolder");
        }
        /*****************************************************************************/
        if (postParam.obj.isNregaCardHolder !== undefined &&
            postParam.obj.isNregaCardHolder !== null &&
            postParam.obj.isNregaCardHolder.toString().trim().length > 0) {
            if (!isInt(postParam.obj.isNregaCardHolder.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For NregaCardHolder");
            }
            postParam.obj.isNregaCardHolder = parseInt(postParam.obj.isNregaCardHolder.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For NregaCardHolder");
        }
        /*****************************************************************************/
        if (postParam.obj.isMinority !== undefined &&
            postParam.obj.isMinority !== null &&
            postParam.obj.isMinority.toString().trim().length > 0) {
            if (!isInt(postParam.obj.isMinority.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For isMinority");
            }
            postParam.obj.isMinority = parseInt(postParam.obj.isMinority.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For isMinority");
        }
        /*****************************************************************************/
        if (postParam.obj.isBocw !== undefined &&
            postParam.obj.isBocw !== null &&
            postParam.obj.isBocw.toString().trim().length > 0) {
            if (!isInt(postParam.obj.isBocw.toString().trim())) {
                throw new Error("Please Select 'Yes' Or 'No' For isBocw");
            }
            postParam.obj.isBocw = parseInt(postParam.obj.isBocw.toString().trim());
        } else {
            throw new Error("Please Select 'Yes' Or 'No' For isBocw");
        }
        /*****************************************************************************/
        if (postParam.obj.configArr.viewTeaTribe === 1) {
            if (postParam.obj.isTeaTribe !== undefined &&
                postParam.obj.isTeaTribe !== null &&
                postParam.obj.isTeaTribe.toString().trim().length > 0) {
                if (!isInt(postParam.obj.isTeaTribe.toString().trim())) {
                    throw new Error("Please select 'Yes' Or 'No' For is Tea Tribe");
                }
                postParam.obj.isTeaTribe = parseInt(postParam.obj.isTeaTribe.toString().trim());
            } else {
                throw new Error("Please select 'Yes' Or 'No' For is Tea Tribe");
            }
        }
        /******************************************************************************/
        /*Check For the other details*/
        /*Ends*/
        /******************************************************************************/

        /*****************************************************************************/
        /*This Check Preference*/
        /*Starts*/
        /*****************************************************************************/
        if (postParam.obj.configArr.viewSectorPreference === 1) {
            if (postParam.obj.selectedPreferenceArr.length >= postParam.obj.configArr.minSectorPreferenceAllow) {
                for (let i = 0; i < postParam.obj.selectedPreferenceArr.length; i++) {
                    if (postParam.obj.selectedPreferenceArr[i] !== null &&
                        postParam.obj.selectedPreferenceArr[i] !== undefined) {
                        countIterator = countIterator + i;
                        if (postParam.obj.selectedPreferenceArr[i].interestedCourseCategoryId !== null &&
                            postParam.obj.selectedPreferenceArr[i].interestedCourseCategoryId !== undefined &&
                            postParam.obj.selectedPreferenceArr[i].interestedCourseCategoryId.toString().trim) {
                            if (postParam.obj.selectedPreferenceArr[i].interestedSectorId !== null &&
                                postParam.obj.selectedPreferenceArr[i].interestedSectorId !== undefined &&
                                postParam.obj.selectedPreferenceArr[i].interestedSectorId.toString().trim().length > 0) {
                                if (postParam.obj.selectedPreferenceArr[i].interestedCourseId !== null &&
                                    postParam.obj.selectedPreferenceArr[i].interestedCourseId !== undefined &&
                                    postParam.obj.selectedPreferenceArr[i].interestedCourseId.toString().trim().length > 0
                                ) {} else {
                                    throw new Error("Please Select Preferred Course" + countIterator);
                                }
                            } else if (postParam.obj.configArr.sectorMandatory === 1) {
                                throw new Error("Please Select Preferred Sector" + countIterator);
                            }
                        } else {
                            throw new Error("Please Fill All Preference  details properly");
                        }

                        if (postParam.obj.configArr.viewDistrictPreference === 1) {
                            if (postParam.obj.selectedPreferenceArr[i].interestedDistrictId !== null &&
                                postParam.obj.selectedPreferenceArr[i].interestedDistrictId !== undefined &&
                                postParam.obj.selectedPreferenceArr[i].interestedDistrictId.toString().trim().length > 0) {

                            } else if (postParam.obj.configArr.districtMandatory === 1) {
                                throw new Error("Please Select District" + countIterator);
                            }
                        }

                        if (postParam.obj.configArr.viewTalukaPreference === 1) {
                            if (postParam.obj.selectedPreferenceArr[i].interestedTalukaId !== null &&
                                postParam.obj.selectedPreferenceArr[i].interestedTalukaId !== undefined &&
                                postParam.obj.selectedPreferenceArr[i].interestedTalukaId.toString().trim().length > 0) {

                            } else if (postParam.obj.configArr.talukaMandatory === 1) {
                                throw new Error("Please Select Taluka" + countIterator);
                            }
                        }
                    }
                }
            } else {
                throw new Error("Please Fill  At Least One Preference");
            }
        }
        /*****************************************************************************/
        /*This Check  Preference*/
        /*Ends*/
        /*****************************************************************************/
        /*****************************************************************************/
        if(postParam.obj.empExchangeNo !== undefined && postParam.obj.empExchangeNo !== null ) {
            postParam.obj.empExchangeNo = postParam.obj.empExchangeNo.toString().trim();
        }
        /*****************************************************************************/
        /*****************************************************************************/
        postParam.obj.agree = 1;
        postParam.obj.currentYear = currentMoment.format(YEARFORMAT);
        postParam.obj.currentMonth = currentMoment.format(MONTHFORMAT);
        /*****************************************************************************/
        return null;
    } catch (error) {
        throw error;
    } finally {
        if (currentMoment !== null) {
            currentMoment = null;
        }
        if (dobMoment !== null) {
            dobMoment = null;
        }
        if (aadharArr !== null) {
            aadharArr = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
/*
Send Email
*/
let sendEmail = co.wrap(function* (fromEmail, toEmail, name, referenceNo, districtName, sectorName) {
    let locals = {};
    try {
        locals = {
            from: fromEmail,
            to: toEmail,
            subject: "Candidate Registration For Skill Training",
            template: 'registrationTemplate',
            context: {
                mailData: {
                    referenceNo: referenceNo,
                    name: name,
                    sectorName: sectorName[0].sectorName,
                    districtName: districtName[0].districtName
                }
            }
        };
        yield mailService.sendEmail(locals);
        return true;
    } catch (error) {
        console.error(error);
        return false;;
    }
});
/****************************************************************************************/
/****************************************************************************************/
/*
Send Sms
*/
let sendSms = co.wrap(function* (mobile, name, referenceNo, districtName, sectorName) {
    let emailSmsObj = {};
    try {
        emailSmsObj.toMobileNumber = mobile;
        emailSmsObj.message = (`Congratulations ${name}\n` +
            `You have Successfully registered for skill training in ${sectorName[0].sectorName} sector` +
            ` in ${districtName[0].districtName} district.` +
            `\nYour Ref id is ${referenceNo}.` +
            `Training center will contact you soon for Skill Training.` +
            `\nVisit www.skillmissionassam.org for nearest center.`);
        emailSmsObj.smsTemplateId = '1407165674914840301';
        
        yield smsService.sendSMS(emailSmsObj);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
});
/****************************************************************************************/
/****************************************************************************************/
let getCandidateCount = co.wrap(function* (postParam, districtId, currentYear, currentMonth, connection) {
    let queryResultObj = null;
    let count = 0;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getCandidateCount, []);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GCC10)");
        }
        if (queryResultObj !== undefined &&
            queryResultObj !== null &&
            queryResultObj.length > 0) {
            count = queryResultObj[0].rowCount;
            return count;
        } else {
            count = 0;
            return count;
        }
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let getDistrictCode = co.wrap(function* (postParam, districtId, connection) {
    let queryResultObj = null;
    let districtCode = null;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getDistrictCode, [districtId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GDC10)");
        }
        if (queryResultObj !== undefined &&
            queryResultObj !== null &&
            queryResultObj.length > 0) {
            districtCode = queryResultObj[0].districtCode;
            if (districtCode !== undefined &&
                districtCode !== null &&
                districtCode.toString().trim().length > 0) {} else {
                throw new Error("Internal Server Error(District Code Not Set-sCandidateRegistrationCRS-GDC20)");
            }
            return districtCode;
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GDC30)");
        }
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let getDistrictName = co.wrap(function* (postParam, districtId, connection) {
    let queryResultObj = null;
    let districtName = null;
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getDistrictName, [districtId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GDN10)");
        }
        if (queryResultObj !== undefined &&
            queryResultObj !== null &&
            queryResultObj.length > 0) {
            districtName = queryResultObj;
            if (districtName !== undefined &&
                districtName !== null &&
                districtName.toString().trim().length > 0) {} else {
                throw new Error("Internal Server Error(District Code Not Set-sCandidateRegistrationCRS-GDN20)");
            }
            return districtName;
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GDN30)");
        }
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/
let getSectorName = co.wrap(function* (postParam, sectorId, connection) {
    let queryResultObj = null;
    let sectorName = [];
    try {
        try {
            queryResultObj = yield mysqlDB.query(connection, query.getSectorName, [postParam.obj.jvId, sectorId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GSN10)");
        }
        if (queryResultObj !== undefined &&
            queryResultObj !== null &&
            queryResultObj.length > 0) {
            sectorName = queryResultObj;
            if (sectorName !== undefined &&
                sectorName !== null &&
                sectorName.toString().trim().length > 0) {} else {
                throw new Error("Internal Server Error(District Code Not Set-sCandidateRegistrationCRS-GSN20)");
            }
            return sectorName;
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-GSN30)");
        }
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/


/****************************************************************************************/
/****************************************************************************************/
let getPaddedPartForward = co.wrap(function* (postParam, value, paddedLength, connection) {
    let newValue = "";
    try {
        for (let i = 0; i < paddedLength; i++) {
            if (value.charAt(i) !== undefined &&
                value.charAt(i) !== null &&
                value.charAt(i).toString().trim().length > 0) {
                newValue = newValue + value.charAt(i);
            } else {
                newValue = newValue + "1";
            }
        }
        return newValue;
    } catch (error) {
        throw error;
    }
});
/****************************************************************************************/
/****************************************************************************************/
let getPaddedPartReverse = co.wrap(function* (postParam, value, paddedLength, connection) {
    let newValue = "";
    try {
        for (let i = paddedLength - 1; i >= 0; i--) {
            if (value.charAt(i) !== undefined &&
                value.charAt(i) !== null &&
                value.charAt(i).toString().trim().length > 0) {
                newValue = newValue + value.charAt(i);
            } else {
                newValue = newValue + "0";
            }
        }
        return newValue;
    } catch (error) {
        throw error;
    }
});
/****************************************************************************************/
/****************************************************************************************/
let generateReferenceNo = co.wrap(function* (postParam, connection) {
    let districtCode = null;
    let candidateCount = 0;
    let referenceNo = null;
    let candidateCountLength = 0;
    let paddingLength = 0;
    try {
        /**********************************************************/
        districtCode = yield getDistrictCode(postParam, postParam.obj.districtId, connection);
        /**********************************************************/
        candidateCount = yield getCandidateCount(postParam, postParam.obj.districtId, postParam.obj.currentYear, postParam.obj.currentMonth, connection);
        candidateCount = candidateCount + 1;
        postParam.obj.candidateCount = candidateCount;
        candidateCountLength = candidateCount.toString().length;
        paddingLength = parseInt(CANDIDATE_COUNT_PADDED_LENGTH - candidateCountLength + districtCode.toString().trim().length);
        /**********************************************************/
        districtCode = yield getPaddedPartForward(postParam, districtCode.toString(), paddingLength, connection);
        referenceNo = postParam.obj.currentYear + postParam.obj.currentMonth + districtCode + candidateCount.toString();
        return referenceNo;
    } catch (error) {
        throw error;
    }
});
/****************************************************************************************/
/****************************************************************************************/
exports.sendEmailOtp = async (postParam, connection) => {
    let emailOTP = null;
    let otpExpireMinutes = 10;
    let startMoment = null;
    let startDate = null;
    let endMoment = null;
    let endDate = null;
    let currentDate = new Date();
    let emailStatus = false;
    let resultObj = {};
    let mysqlCon = null;
    let insertedId = null;
    let queryResultObj = [];
    let endDateServerFormat = null;

    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SEO100)");
        }
        await validateEmail(postParam, mysqlCon);
        emailOTP = await randomOTP(MIN_OTP, MAX_OTP);
        startMoment = moment();
        startDate = startMoment.toDate();
        endMoment = moment().add(otpExpireMinutes, 'minutes');
        endDate = endMoment.toDate();
        endDateServerFormat = moment(endDate).format(DATE_TIME_FORMAT);

        // begin transaction
        try {
            await mysqlDB.beginTransaction(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SEO110)");
        }
        // save email OTP
        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.saveEmailOtp,
                [postParam.obj.email1, emailOTP, "CANDIDATE_PUBLIC_REGISTRATION_CONTACT_VERIFICATION",
                    startDate, endDate, currentDate, currentDate
                ]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SEO120)");
        }

        insertedId = queryResultObj.insertId;
        if (insertedId !== undefined && insertedId !== null && insertedId.toString().trim().length > 0) {} else {
            throw new Error("Internal Server Error(OTP Cannot Send Now. Please try After Some Time)" +
                "(sCandidateRegistrationCRS-SEO130)");
        }

        emailStatus = await sendEmailForOTP(FROMEMAIL, postParam.obj.email1, emailOTP,
            endDateServerFormat);

        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.updateEmailOtp,
                [emailStatus, new Date(), insertedId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SEO140) " + error);
        }
        /**************************************************************************************/
        try {
            await mysqlDB.commit(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SEO150)");
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
    resultObj.status = 'success';
    resultObj.insertedId = insertedId;
    resultObj.email1 = postParam.obj.email1;
    resultObj.email1OTP = emailOTP;
    resultObj.endDate = endDate;
    return resultObj;
};

let sendEmailForOTP = async (fromEmail, toEmail, emailOTP, endDate) => {
    let locals = {};
    try {
        locals = {
            from: fromEmail,
            to: toEmail,
            subject: "OTP for Candidate Registration For Skill Training",
            template: 'candidateEmailVerification',
            context: {
                mailData: {
                    otp: emailOTP,
                    validTill: endDate,
                    jvName: 'Assam Skill Development Mission'
                }
            }
        };
        await mailService.sendEmail(locals);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

let validateEmail = async (postParam, mysqlCon) => {
    if (!postParam.obj.hasOwnProperty('email1')) {
        throw new Error("EMAIL ID Is Mandatory(sCandidateRegistrationCRS-VE100)");
    } else if (postParam.obj.email1 !== undefined &&
        postParam.obj.email1 !== null &&
        postParam.obj.email1.toString().trim().length > 100) {
        postParam.obj.email1 = postParam.obj.email1.toString().trim();
        throw new Error("EMAIL ID Must Be Less Than Or Equal To 100 Characters" +
            "(Excluding Whitespaces)(sCandidateRegistrationCRS-VE110)");
    } else if (!emailValidator.validate(postParam.obj.email1)) {
        throw new Error("Invalid EMAIL ID(sCandidateRegistrationCRS-VE120)");
    } else if (postParam.obj.email1.toString().trim().length === 0) {
        throw new Error("EMAIL ID Is Mandatory(sCandidateRegistrationCRS-VE130)");
    }
    await email1DuplicateCheck(postParam.obj.email1, mysqlCon);
};

let email1DuplicateCheck = async (email1, mysqlCon) => {
    let queryResultObj = {};
    try {
        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.email1DuplicateCheck, [email1]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-EDC100)");
        }

        if (queryResultObj && queryResultObj.length > 0) {
            if (queryResultObj[0].candidateCount > 0) {
                throw new Error("Email ID '" + email1 +
                    "' Is Already Present.Please Enter Another Email ID(sCandidateRegistrationCRS-EDC110)");
            }
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-EDC120)");
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
};

let randomOTP = async (min, max) => {
    let OTP = Math.floor(Math.random() * (max - min)) + min;
    return OTP;
};
/****************************************************************************************/
/****************************************************************************************/
exports.verifyEmailOtp = async (postParam, connection) => {
    let mysqlCon = null;
    let result = {};
    let queryResultObj = {};
    let currentDate = new Date();
    let currentDateMoment = null;
    let endDate = null;
    let endDateMoment = null;
    let insertedId = postParam.insertedId;
    let email1Verified = postParam.obj.email1Verified;

    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-VEO100)")
        }
        if (email1Verified) {
            try {
                queryResultObj = await mysqlDB.query(mysqlCon, query.verifyOtp, [insertedId]);
            } catch (error) {
                console.error(error);
                throw new Error("Internal Server Error(sCandidateRegistrationCRS-VEO110)");
            }
            if (queryResultObj && queryResultObj.length > 0) {
                currentDateMoment = moment(currentDate);
                endDate = queryResultObj[0].expiryDate;
                endDateMoment = moment(endDate);
                if (currentDateMoment.isAfter(endDateMoment)) {
                    throw new Error("The entered OTP has expired(sCandidateRegistrationCRS-VEO120)");
                }
            } else {
                console.error(error);
                throw error;
            }
        }
        queryResultObj = await mysqlDB.query(mysqlCon, query.updateEmail1Verified, [email1Verified, insertedId]);
    } catch (error) {
        console.error(error);
        throw error;
    }
    result.status = 'success';
    return result;
};
/****************************************************************************************/
/****************************************************************************************/
exports.sendSmsOtp = async (postParam, connection) => {
    let mobile1OTP = null;
    let otpExpireMinutes = 10;
    let startMoment = null;
    let startDate = null;
    let endMoment = null;
    let endDate = null;
    let smsStatus = false;
    let resultObj = {};
    let mysqlCon = null;
    let insertedId = null;
    let queryResultObj = {};
    let endDateServerFormat = null;
    let endDateServerFormatMoment = null;

    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SSO100)");
        }
        // if (postParam.insertedId) {} else {
        //     throw new Error(`Please Register Email First.`);
        // }
        await validateMobile(postParam, mysqlCon);
        mobile1OTP = await randomOTP(MIN_OTP, MAX_OTP);
        startMoment = moment();
        startDate = startMoment.toDate();
        endMoment = moment().add(otpExpireMinutes, 'minutes');
        endDate = endMoment.toDate();
        endDateServerFormat = moment(endDate).format(DATE_TIME_FORMAT);

        // begin transaction 
        try {
            await mysqlDB.beginTransaction(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationCRS-SSO110)`)
        }

        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.insertSmsOtp,
                [postParam.obj.mobile1, mobile1OTP, "CANDIDATE_PUBLIC_REGISTRATION_CONTACT_VERIFICATION",
                    startDate, endDate, startDate, startDate
                ]);
            insertedId = queryResultObj.insertId;
            if (insertedId !== undefined && insertedId !== null && insertedId.toString().trim().length > 0) {} else {
                throw new Error("Internal Server Error(OTP Cannot Send Now. Please try After Some Time)" +
                    "(sCandidateRegistrationCRS-SSO130)");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SSO120)");
        }

        smsStatus = await sendSmsForOtp(postParam.obj.mobile1, mobile1OTP, endDateServerFormat);

        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.updateSmsOtp,
                [smsStatus, new Date(), insertedId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SSO130) " + error);
        }

        try {
            await mysqlDB.commit(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SSO140)");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    resultObj.status = 'success';
    resultObj.mobile1 = postParam.obj.mobile1;
    resultObj.insertedId = insertedId;
    resultObj.mobile1OTP = mobile1OTP;

    return resultObj;
};

let sendSmsForOtp = async (mobile1, mobile1OTP, endDate) => {
    
    let message = `OTP is ${mobile1OTP} for mobile number verification and valid till 10mins`;
    let smsObj = {};
    try {
        smsObj.toMobileNumber = mobile1;
        smsObj.message = message;
        smsObj.smsTemplateId = '1407165674833300216';
        await smsService.sendSMS(smsObj);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

};

let validateMobile = async (postParam, mysqlCon) => {
    let regex = new RegExp(/^\d+$/);
    if (postParam.obj.mobile1 !== undefined &&
        postParam.obj.mobile1 !== null &&
        postParam.obj.mobile1.toString().trim().length > 0) {
        if (!postParam.obj.mobile1.toString().trim().match(regex)) {
            throw new Error("Please Enter MOBILE NUMBER ");
        }
        if (postParam.obj.mobile1.toString().trim().length !== 10) {
            throw new Error("MOBILE NUMBER  Must Be Equal To 10 Numeric Characters");
        }
        postParam.obj.mobile1 = postParam.obj.mobile1.toString().trim();
        await mobile1DuplicateCheck(postParam.obj.mobile1, mysqlCon);
    } else {
        throw new Error("Please Enter MOBILE NUMBER");
    }
};

let mobile1DuplicateCheck = async (mobile1, mysqlCon) => {
    let queryResultObj = {};
    try {
        try {
            queryResultObj = await mysqlDB.query(mysqlCon, query.mobile1DuplicateCheck, [mobile1]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-MDC100)");
        }

        if (queryResultObj && queryResultObj.length > 0) {
            if (queryResultObj[0].candidateCount > 0) {
                throw new Error(`Mobile Number: ${mobile1} Is Already Registered. Please Enter Another Number(sCandidateRegistrationCRS-MDC110)`);
            }
        } else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-MDC120)");
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
};
/****************************************************************************************/
/****************************************************************************************/
exports.verifySmsOtp = async (postParam, connection) => {
    let mysqlCon = null;
    let result = {};
    let queryResultObj = {};
    let currentDate = new Date();
    let currentDateMoment = null;
    let endDate = null;
    let endDateMoment = null;
    let insertedId = postParam.insertedId;
    let mobile1Verified = postParam.obj.mobile1Verified;
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-VSO100)");
        }
        if (mobile1Verified) {
            try {
                queryResultObj = await mysqlDB.query(mysqlCon, query.verifyOtp, [insertedId]);
            } catch (error) {
                console.error(error);
                throw new Error("Internal Server Error(sCandidateRegistrationCRS-VSO110)");
            }
            if (queryResultObj && queryResultObj.length > 0) {
                currentDateMoment = moment(currentDate);
                endDate = queryResultObj[0].expiryDate;
                endDateMoment = moment(endDate);
                if (currentDateMoment.isAfter(endDateMoment)) {
                    throw new Error("The entered OTP has expired(sCandidateRegistrationCRS-VEO120)");
                }
            } else {
                throw new Error("Register Email First (sCandidateRegistrationCRS-VSO130)")
            }
            queryResultObj = await mysqlDB.query(mysqlCon, query.updateMobile1Verified, [mobile1Verified, insertedId]);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    result.status = 'success';
    return result;
};
/****************************************************************************************/
/****************************************************************************************/
let saveRegistration = co.wrap(function* (postParam, connection) {
    let registrationId = null;
    let queryResultObj = null;
    let residentialType = null;
    let addressType = ["RESIDENTIAL", "PERMANENT"];
    let areaType = ["URBAN", "RURAL"]
    let certificateName = null;
    let genderName = null;

    if (postParam.obj.middleName && postParam.obj.middleName.toString().trim().length > 0) {
        certificateName = postParam.obj.firstName + " " + postParam.obj.middleName + " " + postParam.obj.lastName;
    } else {
        certificateName = postParam.obj.firstName + " " + postParam.obj.lastName;
    }
    if (postParam.obj.genderName == 1) {
        genderName = 'MALE';
    } else if (postParam.obj.genderName == 2) {
        genderName = 'FEMALE';
    } else if (postParam.obj.genderName == 3) {
        genderName = 'TRANSGENDER';
    }
    try {
        yield mysqlDB.beginTransaction(connection);
        try {
            // This will save the basic details of the candidate
            queryResultObj = yield mysqlDB.query(connection, query.saveBasicDetails, [
                postParam.obj.jvId, postParam.obj.firstName, postParam.obj.middleName, postParam.obj.lastName,
                certificateName, postParam.obj.fatherName, postParam.obj.motherName, postParam.obj.empExchangeNo, postParam.obj.dob,
                postParam.obj.idNumber, genderName, postParam.obj.religionId, 3,
                new Date(), postParam.obj.isBPLCardHolder, postParam.obj.isAntodayaCardHolder, postParam.obj.isNregaCardHolder,
                postParam.obj.isMinority, postParam.obj.isBocw, postParam.obj.isTeaTribe, postParam.obj.idType, "PENDING"
            ]);
            // This will save father details
            // INSERT INTO nw_candidate_family_dtl(fklCandidateId, fklRelationshipId, vsName, vsGender) VALUES (?,?,?,?)
            yield mysqlDB.query(connection, query.saveRelation, [queryResultObj.insertId, 1, postParam.obj.fatherName, 'MALE']);
            // this will save mother details
            yield mysqlDB.query(connection, query.saveRelation, [queryResultObj.insertId, 2, postParam.obj.motherName, 'FEMALE']);
            // This will save the candidate caste details
            yield mysqlDB.query(connection, query.saveCasteDetails, [queryResultObj.insertId, postParam.obj.categoryId, new Date()]);
            // This will save the candidate contact details
            yield mysqlDB.query(connection, query.saveContactDetails, [
                queryResultObj.insertId, "+91",
                postParam.obj.mobile1, postParam.obj.mobile2,
                postParam.obj.email1, new Date()
            ]);
            // This will save the candidate course preference details
            for (let i = 0; i < postParam.obj.selectedPreferenceArr.length; i++) {
                yield mysqlDB.query(connection, query.saveCoursePreference, [
                    postParam.obj.jvId, queryResultObj.insertId,
                    postParam.obj.selectedPreferenceArr[i].interestedDistrictId,
                    postParam.obj.selectedPreferenceArr[i].interestedTalukaId,
                    postParam.obj.selectedPreferenceArr[i].interestedCourseId,
                    new Date()
                ]);
            }
            // This will save the candidate disability detail's
            yield mysqlDB.query(connection, query.saveDisabilityDetails, [queryResultObj.insertId, postParam.obj.disability, new Date()]);
            // This will save the candidate qualification detail's
            yield mysqlDB.query(connection, query.saveQualificationDetails, [queryResultObj.insertId, postParam.obj.qualificationId]);
            //   This will save the candidate address detail's
            yield mysqlDB.query(connection, query.relocationPreference, [queryResultObj.insertId, 
                postParam.obj.preferenceDist1.interestedDistrictId, postParam.obj.preferenceDist2.interestedDistrictId, postParam.obj.preferenceDist3.interestedDistrictId, postParam.obj.preferenceState1.interestedStateId, 
                postParam.obj.preferenceState2.interestedStateId, postParam.obj.preferenceState3.interestedStateId, postParam.obj.isWillingState])
            if (postParam.obj.currentAddressSameAsPermanentAddress === 1) {
                /*This will decide that is current address same as present */
                for (let i = 0; i < 2; i++) {
                    if (postParam.obj.urban === 1) {
                        residentialType = areaType[0];
                        yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                            postParam.obj.countryId, postParam.obj.stateId,
                            postParam.obj.districtId, postParam.obj.talukaId, postParam.obj.ulbId,
                            residentialType, postParam.obj.address,
                            postParam.obj.placeName, postParam.obj.policeStation, postParam.obj.pin, addressType[i],
                            postParam.obj.assemblyId, postParam.obj.councilId, postParam.obj.postOffice
                        ]);
                    } else {
                        residentialType = areaType[1];
                        yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                            postParam.obj.countryId, postParam.obj.stateId,
                            postParam.obj.districtId, postParam.obj.talukaId, postParam.obj.ulbId,
                            residentialType, postParam.obj.address,
                            postParam.obj.placeName, postParam.obj.policeStation, postParam.obj.pin, addressType[i],
                            postParam.obj.assemblyId, postParam.obj.councilId, postParam.obj.postOffice
                        ]);
                    }
                }
            } else {
                if (postParam.obj.urban === 1) {
                    residentialType = areaType[0];
                    yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                        postParam.obj.countryId, postParam.obj.stateId,
                        postParam.obj.districtId, postParam.obj.talukaId, postParam.obj.ulbId,
                        residentialType, postParam.obj.address,
                        postParam.obj.placeName, postParam.obj.policeStation, postParam.obj.pin, addressType[0],
                        postParam.obj.assemblyId, postParam.obj.councilId, postParam.obj.postOffice
                    ]);
                } else {
                    residentialType = areaType[1];
                    yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                        postParam.obj.countryId, postParam.obj.stateId,
                        postParam.obj.districtId, postParam.obj.talukaId, postParam.obj.ulbId,
                        residentialType, postParam.obj.address,
                        postParam.obj.placeName, postParam.obj.policeStation, postParam.obj.pin, addressType[0],
                        postParam.obj.assemblyId, postParam.obj.councilId, postParam.obj.postOffice
                    ]);
                }

                if (postParam.obj.permanentUrban === 1) {
                    residentialType = areaType[0];
                    yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                        postParam.obj.permanentCountryId, postParam.obj.permanentStateId,
                        postParam.obj.permanentDistrictId, postParam.obj.permanentTalukaId, postParam.obj.permanentULBId,
                        residentialType, postParam.obj.permanentAddress,
                        postParam.obj.permanentPlaceName, postParam.obj.permanentPoliceStation, postParam.obj.permanentAddressPin, addressType[1],
                        postParam.obj.permanentAssemblyId, postParam.obj.permanentCouncilId, postParam.obj.permanentPostOffice
                    ]);
                } else {
                    residentialType = areaType[1];
                    yield mysqlDB.query(connection, query.saveAddressDetails, [queryResultObj.insertId, new Date(),
                        postParam.obj.permanentCountryId, postParam.obj.permanentStateId,
                        postParam.obj.permanentDistrictId, postParam.obj.permanentTalukaId, postParam.obj.permanentULBId,
                        residentialType, postParam.obj.permanentAddress,
                        postParam.obj.permanentPlaceName, postParam.obj.permanentPoliceStation, postParam.obj.permanentAddressPin, addressType[1],
                        postParam.obj.permanentAssemblyId, postParam.obj.permanentCouncilId, postParam.obj.permanentPostOffice
                    ]);
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(Please Try After Sometime-sCandidateRegistrationCRS-SR10)");
        }
        yield mysqlDB.commit(connection);
        registrationId = queryResultObj.insertId;
        if (registrationId !== undefined &&
            registrationId !== null &&
            registrationId.toString().trim().length > 0) {} else {
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-SR20)");
        }
        return registrationId;
    } catch (error) {
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/

exports.save = co.wrap(function* (postParam) {
    let queryResultObj = null;
    let resultObj = {};
    let mysqlCon = null;
    let registrationId = null;
    let mailStatus = false;
    let smsStatus = false;
    let districtName = null;
    let sectorName = [];
    let relocationPreferencepost = {}
    let sectorId = [];
    let districtId = [];
    try {
        /********************************************************************/
        try {
            mysqlCon = yield mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-S10)");
        }
        /********************************************************************/
        yield validateObj(postParam, mysqlCon);
        /********************************************************************/
        try {
            yield mysqlDB.beginTransaction(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-S20)");
        }
        /********************************************************************/
        postParam.obj.referenceNo = yield generateReferenceNo(postParam, mysqlCon);
        /********************************************************************/
        // 1.Generate Reference Number
        postParam.obj.candidateCount;
        //2. Save Registration With Reference Number and Generate Registration Id
        registrationId = yield saveRegistration(postParam, mysqlCon);
        /********************************************************************/
        // 3.Will save the candidate preference with there open pool id
        /********************************************************************/

        try {
            for (let i = 0; i < postParam.obj.selectedPreferenceArr.length; i++) {
            //4. Get District Name
            districtName = yield getDistrictName(postParam, postParam.obj.selectedPreferenceArr[i].interestedDistrictId, mysqlCon);
            //5.Get Sector Name
            sectorName = yield getSectorName(postParam, postParam.obj.selectedPreferenceArr[i].interestedSectorId, mysqlCon);
            //6.Send Mail
            // mailStatus = yield sendEmail(FROMEMAIL, postParam.obj.email1, postParam.obj.name, postParam.obj.referenceNo, districtName, sectorName); 
            //7.Send SMS.
            smsStatus = yield sendSms(postParam.obj.mobile1, postParam.obj.name, postParam.obj.referenceNo, districtName, sectorName); 
            }
        } catch (error) {
            console.error(error + postParam.obj);
        }
        
        /********************************************************************/
        try {
            queryResultObj = mysqlDB.query(mysqlCon, query.updateNotificationStatus, [smsStatus, postParam.obj.referenceNo, registrationId]);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-S30)");
        }
        /********************************************************************/
        try {
            yield mysqlDB.commit(mysqlCon);
        } catch (error) {
            console.error(error);
            throw new Error("Internal Server Error(sCandidateRegistrationCRS-S40)");
        }
        /********************************************************************/
        resultObj.status = "success";
        resultObj.message = 'Registration Successful. Your Reference No Is ' + postParam.obj.referenceNo + '. Please Note Down This Number And Quote It For Any Future Enquiry';
        return resultObj;
    } catch (error) {
        if (mysqlCon !== null) {
            try {
                yield mysqlDB.rollback(mysqlCon);
            } catch (error) {
                console.error(error);
                throw new Error("Internal Server Error(sCandidateRegistrationCRS-S50)");
            }
        }
        throw error;
    } finally {
        if (queryResultObj !== null) {
            queryResultObj = null;
        }
        if (mysqlCon !== null) {
            mysqlCon.release();
        }
    }
});
/****************************************************************************************/
/****************************************************************************************/

exports.getCourseByDistrictId = async (postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S10)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.course, [postParam.ditrictId, postParam.courseCategoryId, postParam.sectorId]);
        if (resultObj.objArr.length === 0) {
            throw new Error("No courses found in the selected district, Please check with another district, category and sector");
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}
/****************************************************************************************/
/****************************************************************************************/

// let relocationPreference = async (postParam) => {
//     let mysqlCon = null,
//         resultObj = {};
//     try {
//         try {
//             mysqlCon = await mysqlDB.getDB();
//         } catch (error) {
//             console.error(error);
//             throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S60)`);
//         }
//         resultObj.objArr = await mysqlDB.query(mysqlCon, query.relocationPreference, [queryResultObj.insertId, 
//             postParam.preferenceDist1.interestedDistrictId, postParam.preferenceDist2.interestedDistrictId, postParam.preferenceDist3.interestedDistrictId, postParam.preferenceState1.interestedDistrictId, 
//             postParam.preferenceState2.interestedDistrictId, postParam.preferenceState3.interestedDistrictId, postParam.isWillingState]);
//         if (resultObj.objArr.length === 0) {
//             throw new Error("No courses found in the selected district, Please check with another district, category and sector");
//         } else {
//             resultObj.status = "success";
//         }
//         try {
//             mysqlDB.commit(mysqlCon);
//         } catch (error) {
//             console.error(error);
//             throw new Error("Internal Server Error(sCandidateRegistrationCRS-S40)");
//         }
//         return resultObj;
//     } catch (error) {
//         throw error;
//     } 
    
//     finally {
//         if (resultObj) {
//             resultObj = null
//         }
//         mysqlCon.release();
//     }
// }

//new code by AnkitS 

exports.CourseCategoryNameFromId = async(postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.courseCategoryNameFromId, postParam.courseCategoryNameToSearch);
        if (resultObj.objArr.length === 0) {
            throw new Error("No States Found" + postParam);
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}

exports.DistrictNameFromId = async(postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.districtNameFromId, postParam.districtNameToSearch);
        if (resultObj.objArr.length === 0) {
            throw new Error("No States Found" + postParam);
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}

exports.CourseNameFromId = async(postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.courseNameFromId, postParam.courseNameToSearch);
        if (resultObj.objArr.length === 0) {
            throw new Error("No States Found" + postParam);
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}

exports.SectorNameFromId = async(postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.sectorNameFromId, postParam.sectorNameToSearch);
        if (resultObj.objArr.length === 0) {
            throw new Error("No States Found" + postParam);
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}

//new code by AnkitS ends

exports.stateList = async (postParam) => {
    let mysqlCon = null,
        resultObj = {};
    try {
        try {
            mysqlCon = await mysqlDB.getDB();
        } catch (error) {
            console.error(error);
            throw new Error(`Internal Server Error(sCandidateRegistrationGCBD-S70)`);
        }
        resultObj.objArr = await mysqlDB.query(mysqlCon, query.stateList);
        if (resultObj.objArr.length === 0) {
            throw new Error("No States Found");
        } else {
            resultObj.status = "success";
        }
        return resultObj;
    } catch (error) {
        throw error;
    } finally {
        if (resultObj) {
            resultObj = null
        }
        mysqlCon.release();
    }
}