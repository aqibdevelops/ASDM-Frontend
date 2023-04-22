'use strict'

let co = require('co');
var request = require('supertest');
var configHelper = require('./configHelper');
/***************************************************************************************/
/***************************************************************************************/
exports.sendEmail = function(locals) {    
    return new Promise(function(resolve,reject){
        var emailserverPath =   configHelper.getConfig('emailGateway:path');
        request(emailserverPath)
        .post('/sendEmail')
        .send(locals)
        .end(function (err, res) {
            if (err) {
                console.error("Email sending error : " + err.stack);
                reject(err);
            }else{                
                resolve(res);
            }
        });
    }); 
};
/***************************************************************************************/
/***************************************************************************************/
exports.getEmailParametersObject  = co.wrap(function*() {
    try {
        var locals = {
            from: "jitendras@mkcl.org",
            to: '',
            subject: 'Subject',
            context: {
                cdnPath: ""
            }
        };
        return locals;
    } catch (er) {
        console.error(er.stack);
        return er.stack;
    }
});
/***************************************************************************************/
/***************************************************************************************/