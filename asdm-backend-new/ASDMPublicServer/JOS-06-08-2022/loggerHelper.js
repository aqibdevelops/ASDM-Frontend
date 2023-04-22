/**
 * Created by ajitjagtap on 11/07/15.
 */
var winston = require('winston');
var configHelper = require('./../JOS/configHelper');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true, level: configHelper.getConfig("logger:level") })

       // , new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true })
        //,new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
    ],
    exitOnError: false
});

module.exports = logger;