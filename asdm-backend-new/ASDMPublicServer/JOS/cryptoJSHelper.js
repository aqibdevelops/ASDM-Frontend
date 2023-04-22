var CryptoJS = require('crypto-js');
var key = 'QH2WDcEBj8/E3cLiuGJADt92';
/*********************************************************************************/
exports.cryptoService = function (ciphertext) {
    try {
        var bytes = CryptoJS.AES.decrypt(ciphertext, key);
        var decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedText;
    } catch (e) {
        console.error("error in : " + e.stack);
    }
};
/*********************************************************************************/
/*********************************************************************************/

