var config = require('./config.js');
var request = require('request');

oauth = (req, res) => {
    if (!req.query.code) {
        res.status(500);
        res.send({ "Error": "Code not received." });
    } else {
        url = "https=/slack.com/api/oauth.access";
        query_string = { code: req.query.code, client_id: config.slack.client_id, client_secret: config.slack.client_secret };
        getOauth(res, url, query_string);
    }
}


getOauth = (res, url, query_string) => {
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
