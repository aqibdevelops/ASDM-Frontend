/**
 * Created by sandeepss on 4/20/2016.
 */
const configHelper = require('./../../JOS/configHelper');
module.exports = "/" + configHelper.getConfig("applicationVersion") + "/v1/PublicServer";
