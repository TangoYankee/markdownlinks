const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const process = require('process');
const queryString = require('querystring');
const request = require('request');
const { saveTeam } = require('../database/db.js');

var oauth = (req, res) => {
  /* compose Slack credentials */
  if (!req.query.code) {
    res.status(500);
    let query_message = queryString.stringify({ "message": "error" });
    res.redirect("/?" + query_message);
  } else {
    let url = "https://slack.com/api/oauth.access";
    let query_string = {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code
    };
    postOAuth(res, url, query_string);
  }
}

var postOAuth = (res, url, query_string) => {
  /* recieve authorization */
  request.post({
    url: url,
    qs: query_string,
  }, (error, response, body) => {
    let query_message;
    if (error) {
      query_message = queryString.stringify({ "message": "error" });
      res.redirect("/?" + query_message);
    } else {
      let body_json = JSON.parse(body);
      let team_id = body_json.team_id;
      let access_token_plain = body_json.access_token;
      if (team_id && access_token_plain) {
        let access_token_cipher = encryptToken(access_token_plain, process.env.SLACK_OAUTH_TOKEN_SECRET);
        saveTeam(team_id, access_token_cipher);
        query_message = queryString.stringify({ "message": "success" });
        res.redirect("/?" + query_message);
      } else {
        query_message = queryString.stringify({ "message": "error" });
        res.redirect("/?" + query_message);
      }
    }
  });
}

var algorithm = "aes-256-cbc";
var encryptToken = (token_plain, token_key) => {
  /* encrypt token to store at rest */
  let iv_len = 16;
  let iv = cryptoRandomString({ length: iv_len, type: 'hex' });
  let cipher = crypto.createCipheriv(algorithm, token_key, iv);
  let encrypted = cipher.update(token_plain, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${encrypted}${iv}`;
}

var decryptToken = (token_cipher, token_key) => {
  /* decrypt token to send for authorization */
  let encrypted = token_cipher.slice(0, 160);
  let iv = token_cipher.slice(160);
  let decipher = crypto.createDecipheriv(algorithm, token_key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { oauth, encryptToken, decryptToken };
