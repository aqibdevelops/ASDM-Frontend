'use strict'
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const co = require('co');
const searchService =  require('./../services/sSearch/searchService');

lab.experiment('searchServiceSpec', ()=>{
  let postParam = {};
  let resultObj = {};

  lab.before((done)=>{
    postParam.registrationId;
    done();
  });

  lab.after((done)=>{
    postParam = {};
    resultObj = {};
    done();
  });


  lab.test('registrationId:undefined',(done)=>{
    postParam.registrationId;
    co(function *(){
      try {
        resultObj = yield searchService.get(postParam);
      } catch (error) {
        Code.expect(error.message).to.equal("Please Enter Valid Registration Id");
      }
      done();
    });
  });

  lab.test('registrationId:null', (done)=>{
    postParam.registrationId = null;
    co(function *(){
      try {
        resultObj = yield searchService.get(postParam);
      } catch (error) {
        Code.expect(error.message).to.equal("Please Enter Valid Registration Id");
      }
      done();
    });
  });

  lab.test('registrationId:empty', (done)=>{
    postParam.registrationId = "";
    co(function *(){
      try {
        resultObj = yield searchService.get(postParam);

      } catch (error) {
        Code.expect(error.message).to.equal("Please Enter Valid Registration Id");
      }
      done();
    });
  });
});
