'use strict'

let co = require('co');
var request = require('supertest');
/************************************************************************************************************/
/************************************************************************************************************/
// exports.sendSMS = function(smsObject) {
//     return new Promise(function (resolve,reject){
//         request('http://hapi.smsapi.org')
//         .get('/SendSMS.aspx?UserName=bsdm_trans&password=trans123&MobileNo=' + smsObject.toMobileNumber + '&SenderID=MKCLTD&CDMAHeader=MKCLTD&Message=' + encodeURIComponent(smsObject.message))
//         .end(function (error, res) {
//             if (error) {
//                 reject(error);
//             }
//             resolve(JSON.stringify(res));
//         });
//     });    
// };
// /************************************************************************************************************/
// /************************************************************************************************************/
// exports.sendSMS = function (smsObject) {
//     return new Promise(function (resolve, reject) {
//         let mobileNo = "+91" + smsObject.toMobileNumber;
//         request('http://hapi.smsapi.org/SendSMS.aspx')
//             .get("?UserName=bsdm_trans&password=trans123&MobileNo=" + mobileNo + "&SenderID=MKCLTD&CDMAHeader=MKCLTD&Message=" + encodeURIComponent(smsObject.message))
//             .end(function (error, res) {
//                 if (error) {
//                     reject(error);
//                 }
//                 resolve(JSON.stringify(res));
//             });
//     });
// };
/************************************************************************************************************/
/************************************************************************************************************/
// exports.sendSMS = function (smsObject) {
//     return new Promise(function (resolve, reject) {
//         let mobileNo = "+91" + smsObject.toMobileNumber;
//         request('http://smsjust.com/sms/user/urlsms.php')
//             .get("?username=bsdmtrans1&pass=Trans@123&senderid=ASDMSN&dest_mobileno=" + mobileNo + "&msgtype=TXT&dltentityid=1201158047881908712&dlttempid=" + smsObject.smsTemplateId + "&response=Y&message=" + encodeURIComponent(smsObject.message))
//             .end(function (error, res) {
//                 if (error) {
//                     reject(error);
//                 }
//                 resolve(JSON.stringify(res));
//             });
//     });
// };

/************************************************************************************************************/
/************************************************************************************************************/
exports.sendSMS = function (smsObject) {
    return new Promise(function (resolve, reject) {
        let mobileNo = smsObject.toMobileNumber;
        request('http://103.8.249.55/smsgwam/form_/send_api_master_get.php?')
            .get("agency=AMTRON&password=skill@123&district=ALL&app_id=ASDM&sender_id=ASDMSM&unicode=false&to=" +
                mobileNo + "&te_id=" + smsObject.smsTemplateId + "&msg=" + encodeURIComponent(smsObject.message))
        .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                resolve(JSON.stringify(res));
            });
    });
};

/************************************************************************************************************/
/************************************************************************************************************/