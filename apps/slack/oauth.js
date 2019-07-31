const process = require('process');
const request = require('request');
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const iv_len = 16;


oauth = (req, res) => {
    /*compose Slack oauth token request*/
    if (!req.query.code) {
        // TODO: Error State (message in header?)
        console.log("code not recieved")
        res.status(500);
        res.send({ "Error": "Code not received." });
    } else {
        console.log(req.query.code);
        var url = "https://slack.com/api/oauth.access";
        var query_string = { code: req.query.code, client_id: process.env.SLACK_CLIENT_ID, client_secret: process.env.SLACK_CLIENT_SECRET };
        postOAuth(res, url, query_string);
    }
}


postOAuth = (res, url, query_string) => {
    /*recieve authorization*/
    // Should be a post method (https://api.slack.com/methods/oauth.access)
    request.post({
        url: url,
        qs: query_string,
    }, (error, response, body) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            // TODO? Success state
            body_json = JSON.parse(body);
            team_id = body.team_id;
            access_token_plain = body.access_token;
            access_token_cipher = encryptToken(access_token_plain, process.env.SLACK_OAUTH_TOKEN_SECRET);
            // Add the encrypted token to the database
            console.log(`Body: ${body_json}, team id: ${team_id}, token: ${access_token_plain}, Response ${JSON.stringify(res)}`);
        }
    })
}


// TODO? Place crpyto functions in separate application
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
