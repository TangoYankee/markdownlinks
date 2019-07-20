const config = require('./config.js');
const { signature, isRecent, isValidHash } = require('./signature.js');

var slack_signing_secret = config.slack.signing_secret;
var slack_req_body = {
    token: 'HahF3EjsLLxyeO6eR5QL0oOW',
    team_id: 'THAM6S6CU',
    team_domain: 'usafbots',
    channel_id: 'DHC5KUGBG',
    channel_name: 'directmessage',
    user_id: 'UH89V07L0',
    user_name: 'miller.tim108',
    command: '/markdownlinks',
    text: '[example](example.com)',
    response_url: 'https://hooks.slack.com/commands/THAM6S6CU/694561840641/mNIzhaf762i1V8Emm8y1LqYC',
    trigger_id: '700917235301.588720890436.6ee3b2fc3ef9d9c3f702af0519663810'
}
var slack_req_header = {
    'user-agent': 'Slackbot 1.0 (+https://api.slack.com/robots)',
    'accept-encoding': 'gzip,deflate',
    accept: 'application/json,*/*',
    'x-slack-signature': 'v0=eb301488170e0a0670dfda7345a78c3218c56fa5165d545e607e0761bcb48ede',
    'x-slack-request-timestamp': '1563652528',
    'content-length': '398',
    'content-type': 'application/x-www-form-urlencoded',
    host: '87d8f208.ngrok.io',
    'cache-control': 'max-age=259200',
    'x-forwarded-for': '54.89.2.183'
}
var slack_request = {
    'body': slack_req_body,
    'headers': slack_req_header
};


test.each([[slack_request, true]])(
    'verify request is from slack', (slack_request, expected_boolean) => {
        expect(signature(slack_request)).toBe(expected_boolean);
    });


var timestamp = slack_req_header['x-slack-request-timestamp'];
var test_timestamps = [[timestamp, timestamp, true], [timestamp, (timestamp + 250), true], [timestamp, timestamp + 500, false]];


test.each(test_timestamps)(
    'verify request was made recently', (timestamp, current_time, expected_boolean) => {
        expect(isRecent(timestamp, current_time)).toBe(expected_boolean);
    });


test.each([[slack_request, timestamp, true]])(
    'verify application and slack signatures match', (slack_request, timestamp, expected_boolean) => {
        expect(isValidHash(slack_request, timestamp)).toBe(expected_boolean);
    });
