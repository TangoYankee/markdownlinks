const { signature, isRecent, isValidHash } = require('../signature')
const { validRequest, timestamps, validHash } = require('../test-data/signature-data.js')

test.each(validRequest)(
  'signature() /* verify request is from slack */',
  (slackRequest, currentTime, expectedBoolean) => {
    expect(signature(slackRequest, currentTime)).toBe(expectedBoolean)
  })

test.each(timestamps)(
  'isRecent() /* guard against replay attacks */',
  (timestamp, currentTime, expectedBoolean) => {
    expect(isRecent(timestamp, currentTime)).toBe(expectedBoolean)
  })

test.each(validHash)(
  'isValidHash /* calculated application signature and slack signature match */',
  (timestamp, slackRequest, expectedBoolean) => {
    expect(isValidHash(timestamp, slackRequest)).toBe(expectedBoolean)
  })
