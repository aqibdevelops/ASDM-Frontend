/**
 * Created by sandeepss on 1/16/2016.
 */



var co = require('co');
exports.registerSchemas = co.wrap(function*(db) {
    //register your schemas 
    db.baseCollection = yield db.collection('baseCollection');
    db.district = yield db.collection('district');
    db.block = yield db.collection('block');
    db.school = yield db.collection('school');
    db.videoDetails = yield db.collection('video_details');
    db.login = yield db.collection('login');
    return db;
});
