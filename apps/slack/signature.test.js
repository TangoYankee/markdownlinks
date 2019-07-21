const { signature, isRecent, isValidHash } = require('./signature.js');
const slack_request = require('./test_request.js');


let timestamp_str = slack_request.headers['x-slack-request-timestamp'];
let timestamp = Number(timestamp_str);
let current_time = (timestamp + 1e2);
test.each([[slack_request, current_time, true]])(
    'verify request is from slack', (slack_request, current_time, expected_boolean) => {
        expect(signature(slack_request, current_time)).toBe(expected_boolean);
    });


let test_timestamps = [[timestamp, timestamp, true], [timestamp, (timestamp + 2e2), true], [timestamp, (timestamp + 5e2), false]];
test.each(test_timestamps)(
    'verify request was made recently', (timestamp, current_time, expected_boolean) => {
        expect(isRecent(timestamp, current_time)).toBe(expected_boolean);
    });


test.each([[timestamp, slack_request, true]])(
    'verify application and slack signatures match', (timestamp, slack_request, expected_boolean) => {
        expect(isValidHash(timestamp, slack_request)).toBe(expected_boolean);
    });
