const { signature, isRecent, isValidHash } = require('./signature.js')
const slackRequest = require('./signature-test-request.js')

const timestampStr = slackRequest.headers['x-slack-request-timestamp']
const timestamp = Number(timestampStr)
/* TODO: create a variable to explain 1e2 is a fake offset for the fake current time */
const currentTime = (timestamp + 1e2)
test.each([[slackRequest, currentTime, true]])(
  'verify request is from slack', (slackRequest, currentTime, expectedBoolean) => {
    expect(signature(slackRequest, currentTime)).toBe(expectedBoolean)
  })

const testTimestamps = [[timestamp, timestamp, true], [timestamp, (timestamp + 2e2), true], [timestamp, (timestamp + 5e2), false]]
test.each(testTimestamps)(
  'verify request was made recently', (timestamp, currentTime, expectedBoolean) => {
    expect(isRecent(timestamp, currentTime)).toBe(expectedBoolean)
  })

test.each([[timestamp, slackRequest, true]])(
  'verify application and slack signatures match', (timestamp, slackRequest, expectedBoolean) => {
    expect(isValidHash(timestamp, slackRequest)).toBe(expectedBoolean)
  })
