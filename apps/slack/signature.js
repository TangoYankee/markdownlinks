const crypto = require('crypto')
const qs = require('qs')

var signature = (request, currentTime) => {
  /* verify request is from slack */
  const timestampStr = request.headers['x-slack-request-timestamp']
  const timestamp = Number(timestampStr)
  if (isRecent(timestamp, currentTime)) {
    return isValidHash(timestamp, request)
  } else {
    return false
  }
}

var isRecent = (timestamp, currentTime) => {
  /* guard against replay attacks by checking the request was made recently */
  const timeTolerance = 3e2
  const timeDelta = Math.abs(currentTime - timestamp)
  return (timeDelta <= timeTolerance)
}

var isValidHash = (timestamp, request) => {
  /* check that the calculated application signature  and slack signature match */
  const version = 'v0'
  const requestBody = qs.stringify(request.body, { format: 'RFC1738' })
  const baseString = getBaseString(version, timestamp, requestBody)
  const signingSecret = process.env.SLACK_SIGNING_SECRET
  const hexDigest = getHexDigest(signingSecret, baseString)
  const appSignature = getSignature(version, hexDigest)
  const slackSignature = request.headers['x-slack-signature']
  return (crypto.timingSafeEqual(
    Buffer.from(appSignature, 'utf-8'),
    Buffer.from(slackSignature, 'utf-8'))
  )
}

var getBaseString = (version, timestamp, requestBody) => {
  /* format raw string to use in calculation hash */
  return (`${version}:${timestamp}:${requestBody}`)
}

var getHexDigest = (signingSecret, baseString) => {
  /* calculate the raw hash */
  return crypto.createHmac('sha256', signingSecret).update(`${baseString}`).digest('hex')
}

var getSignature = (version, hexDigest) => {
  /* format the full signature */
  return (`${version}=${hexDigest}`)
}

module.exports = { signature, isRecent, isValidHash }
