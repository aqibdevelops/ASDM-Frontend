'use strict'
let co = require('co');
let crypto = require('crypto');
let algo = 'aes-128-cbc';
let key = 'ups1234567891231';
let iv = 'AAAAAAAAAAAAAAAA';

exports.AESEncrypt = co.wrap(function*(upsJSONString) {
    try {
        //upsJSONString = '{"amount":3.6,"clientApplicationId":14,"clientTranscationRefNumber":"2151","description":"Test transaction","accounts":null,"clientAppTranscationDate":"27/07/2014 03:57:20","otherParameters":"{1,2,3}","loginId":"admin","multipleTransaction":true,"paymentModeId":11,"status":"Completed","paymentModeName":null,"transactionReferenceNumber":null,"upsBankId":31,"bankBranchId":1000,"transactionPurposeId":22,"errorCode":991,"errorMessage":null,"bankStatus":null,"clientTransactionExpiryDate":null,"ref1":null,"ref2":null,"ref3":null,"ref4":null,"ref5":null,"billingCustName":"Test Student","billingCustAddress":"Address","billingCustCountry":"IND","billingCustTel":"9874512340","billingCustEmail":"qwerety@gmail.com","billingCustState":"Maharashtra","billingCustCity":"Pune","billingZipCode":"411360","bankAccountNumber":null,"upsTransactionID":1210865,"additionalParams":null}';
        let encrypted = "";
        let cipher = crypto.Cipheriv(algo, key, iv);
        encrypted += cipher.update(upsJSONString, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    } catch (err) {
        console.error(err.stack);
        return null;
    }
});

exports.AESDecrypt = co.wrap(function*(upsEncryptedtring) {
    try {
        //upsEncryptedtring = "lOIV2rbwDj1PS0bvHPCmBO3Xfb6BF55wUjIsTRDUBPDk1aHOM2jlrRF6ORhNHNgoWJHQPTZPCCl1kC+WT4szTLHo1/gneie5bSjpVmOLB5IGKMJqZEr0HCwNyoFcPiWI6YP4M3haBfgNKj7ig3S32Gq1YRxNpg44gE4rUQwKHHlF980NHfe3hPPxqCahXwCZRqm8BbfARFMJK+7b4YbzrPAAosQ1Mi+pDNU6AaDVSGeo4ktE0ZV3WQ1wDHgKnl1Of+7uwMvVghwdd0JuDeSMImtT05BWt6f/0HvwWxEYy7v3vowQBIqLF+Ezj1xdigaf+/F5Jx2uN1Vasut6bsV8IO+9J/Pznuk26fiszOYm9cWD3LP95vbfx4wmmylhMLYjkZuqK6cDxUHg4esGR5cEWKeWvK/3c2sJcz+pHzuh9fd3dkZAas0XtJddAUPeu9c+VH3V9cugRGeejUeb3ANb0W1EABRzwzWEvOKhUrovyzPjBU0kX+22j/Y124HNbb5LdiP2S6BMzQt57BxVh7MXNOIlQox1iwI8KDC9weUTBAX0dAWIgG5EDVmK4XGatpqTrxZPHHp2xAI2nSqhM2ANfQgVqNwcidZFtd9HsRKvJGfy8b25OY0kpuuyEr142C9hYm0wXk0RuoIrOg4fa9QRvRt3E2IaEu4FgA7BtsnzL7XTka7s3ehWvZF2rxLufMKMF9mT8iXd+ZRf8e9T8BsrUihIUfKlGZStwocnLolTqdWNKaP+3up4k6jjTV3SDoz0M6XJXg+K759lc5cKY/n7/HvyO6kyKHzUb6BwtW0lBerUnQaegIU3sQQij/NXSiJKHe6NMBWUcHKmzLELoDkA2szEOhyBO/lNQUsjmzZifexXeXP72Qkc/ucG68+jl7VamJ09QgkducaBwjGlbuALOBgY2YGa9rL2mV4eWooqqOt9foKlCbfV1SGBJaUsUC15G2Nw/9fikw5fvlpIBrXUug//uiDN0rfJ4kJiYF2RgwsU+BovGddaaNT1mx98hAzR+3JUBmwKwl9Gb4ARF2mWqLrp2XaVSj4c/9xx1lvs/BpebNzrilw18ixztrAXvFNsMxWQIh7P8lh2Som4/d9DUZmToIqjBoQG5ebqRtMByyJ+/bphuG5VXJMvtQc0p042yNIZn8tLoSG2tl1KG9RV3A==";
        upsEncryptedtring = new Buffer(upsEncryptedtring, 'base64').toString('binary');
        let decipher = crypto.createDecipheriv(algo, key, iv);
        decipher.setAutoPadding(false);
        let dec = decipher.update(upsEncryptedtring,'binary','utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (err) {
        console.error(err.stack);
        return null;
    }
});
