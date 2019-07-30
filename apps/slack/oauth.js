var config = require('./config.js');
var request = require('request');


// Request for Authorization, completed by 'add to slack button'


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

const algorithm = "aes-256-cbc";

// Encrypt token to store at rest
encrytToken = (token_plain, token_key) => {

}
// Decrypt token to send for authorization
decryptToken = (token_)

// export encrypt, decrypt
module.exports = oauth;
