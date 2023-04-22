/**
 * Created by sandeepsi.
 */
'use strict'
let co = require('co');
let index = require('./../../index');
let service = require("./../../services/sCandidateRegistration/candidateRegistrationService");
const express = require('express')
const Router = express.Router()

Router.post('/get', (req, res) => {
    let result = {}
    console.log(req.body)
    co(function* () {
        try {
            result = yield service.get(req.body.postParam);
            res.send(JSON.stringify(result));
        } catch (error) {
            console.error(error);
            result.status = "error";
            result.message = error.message;
            res.send(result);
        }
    });
})

Router.post('/save', (req, res) => {
    let result = {}
    console.log(req)
        co(function* () {
            try {
                result = yield service.save(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });
})

Router.post('/location', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.getLocation(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/sector', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.sectorArr(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });
})

Router.post('/course', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.getCourse(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });
})

Router.post('/assembly', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.getAssemblyArr(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/courseByDistrict', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.getCourseByDistrictId(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/sendEmailOtp', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.sendEmailOtp(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/verifyEmailOtp', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.verifyEmailOtp(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/sendSmsOtp', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.sendSmsOtp(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})

Router.post('/verifySmsOtp', (req, res) => {
    let result = {}
        co(function* () {
            try {
                result = yield service.verifySmsOtp(req.body.postParam);
                res.send(JSON.stringify(result));
            } catch (error) {
                console.error(error);
                result.status = "error";
                result.message = error.message;
                res.send(result);
            }
        });

})



module.exports = Router;
/***********************************************************************************/
/***********************************************************************************/


// let relocationPreferenceRoute = {
//     method: "POST",
//     path: index + "/registrati8/relocationPreference",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = {};
//         try {
//             postParam = request.payload.postParam;
//             result = await service.relocationPreference(postParam);
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//         finally {
//             if(postParam !== null) {
//                 postParam = null;
//             }
//         }
//     },
// };

// let stateList = {
//     method: "POST",
//     path: index + "/registrati8/stateList",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = {};
//         try {
//             result = await service.stateList();
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//     },
// };

// // new code by AnkitS

// let CourseCategoryNameFromId = {
//     method: "POST",
//     path: index + "/registrati8/CourseCategoryNameFromId",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = request.payload.postParam;
//         try {
//             result = await service.CourseCategoryNameFromId(postParam);
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//     },
// };

// let DistrictNameFromId = {
//     method: "POST",
//     path: index + "/registrati8/DistrictNameFromId",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = request.payload.postParam;
//         try {
//             result = await service.DistrictNameFromId(postParam);
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//     },
// };


// let CourseNameFromId = {
//     method: "POST",
//     path: index + "/registrati8/CourseNameFromId",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = request.payload.postParam;
//         try {
//             result = await service.CourseNameFromId(postParam);
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//     },
// };

// let SectorNameFromId = {
//     method: "POST",
//     path: index + "/registrati8/SectorNameFromId",
//     config: {
//         auth: false,
//         description: 'This will verify Mobile through SMS OTP',
//         notes: 'no notes',
//         tags: ['LOMS Home'],
//         validate: {}
//     },
//     handler: async (request, reply) => {
//         let result = {};
//         let postParam = request.payload.postParam;
//         try {
//             result = await service.SectorNameFromId(postParam);
//             reply(JSON.stringify(result));
//         } catch (error) {
//             result.status = 'error';
//             result.message = error.message;
//             reply(JSON.stringify(result));
//         }
//     },
// };

// // new code by AnkitS ends


// /***********************************************************************************/
// /***********************************************************************************/
// module.exports = [getRoute, saveRoute, locationRoute, statusRoute, homeRoute, courseRoute, 
//     sectorRoute, assemblyRoute, courseByDistrictSelectionRoute, 
//     sendEmailOtpRoute, verifyEmailOtpRoute, sendSmsOtpRoute, verifySmsOtpRoute, 
//     relocationPreferenceRoute, stateList, SectorNameFromId, CourseNameFromId, DistrictNameFromId, 
//     CourseCategoryNameFromId];