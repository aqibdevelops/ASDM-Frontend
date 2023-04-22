const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');


// Create the express app
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const routes= require('./apps/PublicServer/routes/rCandidateRegistration/candidateRegistrationRoute')

const PORT = 7012

app.use('/app1/v1/PublicServer/registrati8', routes)

// Start server
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:' + PORT)
})


// 'use strict'
// const hapi = require('hapi');
// const hapiServer = require('./JOS/hapiServer');
// const configHelper = require('./JOS/configHelper');
// let config = require('./default.config');
// require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" });
// /**************************************************************/
// /**************************************************************/
// hapiServer.startServer();
// const server = hapiServer.getServer();
// const app = server.select('restServer');
// /**************************************************************/
// /**************************************************************/
// app.register({
//     register: require('hapi-rbac')
// }, function(err) {
//     if (err != undefined) {
//         console.error(err);
//     }
// });
// /**************************************************************/
// /**************************************************************/
// if (configHelper.getConfig("environment") != "production") {
//     app.register([require('vision'), require('inert'), { register: require('lout') }], function(err) {});
// }
// /**************************************************************/
// /**************************************************************/
// var options = {
//     opsInterval: 1000,
//     filter:{
//         access_token: 'censor'
//     },
//     reporters: [{
//         reporter: require('good-console'),
//         events: { log: '*', response: '*' }
//     }]
// };
// /**************************************************************/
// /**************************************************************/
// app.register({
//     register: require('hapi-router'),
//     options: { routes: 'apps/*/routes/*/*.js' }
// }, function(err) {
//     if (err) throw err;
// });
// /**************************************************************/
// /**************************************************************/
// app.register({
//     register: require('good'),
//     options: options
// }, function(err) {});
// /**************************************************************/
// /**************************************************************/
// server.start((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Server running at:', app.info.uri);
// });
// /**************************************************************/
// /**************************************************************/
