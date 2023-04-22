/**
 * Created by sandeepsi
 */
'use strict'
const hapi = require('hapi');
const configHelper = require('./configHelper');
const config = require('../default.config');
var app;
let JWT = require('jsonwebtoken');
/**************************************************/
/**************************************************/
exports.startServer = function () {
    app = new hapi.Server({         
    });    
    app.connection({
        host: configHelper.getConfig("host"),
        port: configHelper.getConfig("port"),
        labels : ['restServer']        
    });        
};
/**************************************************/
exports.getServer = function () {
    return app;
};
/**************************************************/
