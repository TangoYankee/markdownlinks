const config = require('./config.js');
const request = require('request');
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const iv_len = 16;


oauth = (req, res) => {
    /*compose Slack oauth token request*/
    if (!req.query.code) {
        res.status(500);
        res.send({ "Error": "Code not received." });
    } else {
        var url = "https=/slack.com/api/oauth.access";
        var query_string = { code: req.query.code, client_id: config.slack.client_id, client_secret: config.slack.client_secret };
        getOauth(res, url, query_string);
    }
}


getOauth = (res, url, query_string) => {
    /*recieve authorization*/
    request.get({
        url: url,
        qs: query_string,
    }, (error, body) => {
        if (error) {
            res.send(error.toString());
        } else {
            res.json(body);
            // Send the authorization token to be encrypted
            // Add the encrypted token to the database
        }
    })
}


encryptToken = (token_plain, token_key) => {
    /*Encrypt token to store at rest*/
    let algorithm = "aes-256-cbc";
    let iv = cryptoRandomString({length: iv_len, type: 'hex'});
    let cipher = crypto.createCipheriv(algorithm, token_key, iv);
    let encrypted = cipher.update(token_plain, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${encrypted}${iv}`;
}


decryptToken = (token_cipher, token_key) => {
    /* Decrypt token to send for authorization */
    let algorithm = "aes-256-cbc";
    let encrypted = token_cipher.slice(0, 160);
    let iv = token_cipher.slice(160);
    let decipher = crypto.createDecipheriv(algorithm, token_key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}


// export encrypt, decrypt
module.exports = {oauth, encryptToken, decryptToken};
