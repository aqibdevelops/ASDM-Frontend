/**
 * Created by sandeepss on 20/01/16.
 */
var hapiServer = require('./hapiServer');
var app = hapiServer.getServer();
var co = require('co');

/*app.method("setCache",function(param,next){
    console.log("hello cache");
    //var result = yield memberService.getMember();
    //console.log(result);
    next(null,param+" Hello bro");
},{
    cache:{expiresIn:10000,generateTimeout:100}
});*/

var cache = app.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });
app.method("setIntoExternalCache",function(key,value,next){
    console.log("key    :   "+key+" Value   :   "+value);

    cache.set(key,value, null, (err) => {
    });

});

/*app.method("getFromExternalCache",function(key,next){
    console.log("in ex file key  :   "+key);

    cache.get(key, (err, value, cached, log) => {
        console.log("in ex file value  :   "+value);
        return value;

        // value === { capital: 'oslo' };
    });

});*/




