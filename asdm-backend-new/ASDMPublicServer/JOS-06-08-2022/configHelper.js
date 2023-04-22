/**
 * Created by ajitjagtap on 11/07/15.
 */
var nconf = require('nconf');


var loadedFlag = false;

exports.getConfig = function getConfig(key){
    // do not load config again and again
    if(! loadedFlag)
    {
        //nconf.env().argv();
        nconf.file(__dirname + '/../config.json');
        nconf.load();

        loadedFlag = true;

    }
    return(nconf.get(key));


};