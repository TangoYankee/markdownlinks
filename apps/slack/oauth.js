var config = require('./config.js');
var request = require('request');

oauth = (req, res) => {
    /*verify credentials with Slack*/
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

        }
    })
}


module.exports = oauth;
