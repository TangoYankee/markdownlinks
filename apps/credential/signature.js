const crypto = require('crypto')
const qs = require('qs')

const signature = (request, currentTime) => {
  /* verify request is from slack */
  var timestampStr = request.headers['x-slack-request-timestamp']
  var timestamp = Number(timestampStr)
  if (isRecent(timestamp, currentTime)) {
    return isValidHash(timestamp, request)
  } else {
    return false
  }
}

const isRecent = (timestamp, currentTime) => {
  /* guard against replay attacks */
  const timeTolerance = 3e2
  var timeDelta = Math.abs(currentTime - timestamp)
  return (timeDelta <= timeTolerance)
}

const isValidHash = (timestamp, request) => {
  /* calculated application signature and slack signature match */
  const version = 'v0'
  var requestBody = qs.stringify(request.body, { format: 'RFC1738' })
  var baseString = getBaseString(version, timestamp, requestBody)
  var signingSecret = process.env.SLACK_SIGNING_SECRET
  var hexDigest = getHexDigest(signingSecret, baseString)
  var appSignature = getSignature(version, hexDigest)
  var slackSignature = request.headers['x-slack-signature']
  return (crypto.timingSafeEqual(
    Buffer.from(appSignature, 'utf-8'),
    Buffer.from(slackSignature, 'utf-8'))
  )
}

const getBaseString = (version, timestamp, requestBody) => {
  /* format raw string to use in calculation hash */
  return (`${version}:${timestamp}:${requestBody}`)
}

const getHexDigest = (signingSecret, baseString) => {
  /* calculate the raw hash */
  return crypto.createHmac('sha256', signingSecret).update(`${baseString}`).digest('hex')
}

const getSignature = (version, hexDigest) => {
  /* format the full signature */
  return (`${version}=${hexDigest}`)
}

module.exports = { signature, isRecent, isValidHash }
