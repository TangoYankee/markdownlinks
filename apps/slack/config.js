var config = {};

const process = require('process');

config.slack = {};
config.slack.client_id = process.env.SLACK_CLIENT_ID;
config.slack.client_secret = process.env.SLACK_CLIENT_SECRET;
config.slack.signing_secret = process.env.SLACK_SIGNING_SECRET;
config.slack.oauth_token = process.env.SLACK_OAUTH_TOKEN;

module.exports = config;
