'use strict'
const Code=require('code');
const Lab=require('lab');
const lab=exports.lab=Lab.script();
const co=require('co');
const paymentService=require('./../services/sPayment/paymentService');
/*****************************************/
lab.experiment('PaymentServiceSpec',()=>{
  let postParam={};
  let resultObj={};

  lab.before((done)=>{
    postParam.centerId=9773;
    done();
  });

  lab.after((done)=>{
    postParam={};
    resultObj={};
    done();
  });

  lab.test('centerId:undefined',(done)=>{
    delete postParam.centerId;
    co(function *(){
      try{
        resultObj = yield paymentService.get(postParam);
      }catch(error){
        Code.expect(error.message).to.equal("Invalid Center Id");
      }
      done();
    });
  });

  lab.test('centerId:null',(done)=>{
    postParam.centerId=null;
    co(function *(){
      try{
        resultObj = yield paymentService.get(postParam);
      }catch(error){
        Code.expect(error.message).to.equal("Invalid Center Id");
      }
      done();
    });
  });

  lab.test('centerId:empty',(done)=>{
    postParam.centerId="";
    co(function *(){
      try{
        resultObj = yield paymentService.get(postParam);
      }catch(error){
        Code.expect(error.message).to.equal("Invalid Center Id");
      }
      done();
    });
  });
});
