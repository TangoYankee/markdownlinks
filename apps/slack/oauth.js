const crypto = require('crypto')
const cryptoRandomString = require('crypto-random-string')
const process = require('process')
const queryString = require('querystring')
const request = require('request')
const { saveTeam } = require('../database/db.js')

var oauth = (req, res) => {
  /* compose Slack credentials */
  if (!req.query.code) {
    res.status(500)
    const thisQueryMessage = queryString.stringify({ message: 'error' })
    res.redirect('/?' + thisQueryMessage)
  } else {
    const url = 'https://slack.com/api/oauth.access'
    const thisQueryString = {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code
    }
    postOAuth(res, url, thisQueryString)
  }
}

var postOAuth = (res, url, thisQueryString) => {
  /* recieve authorization */
  request.post({
    url: url,
    qs: thisQueryString
  }, (error, response, body) => {
    if (error) {
      const thisQueryMessage = queryString.stringify({ message: 'error' })
      res.redirect('/?' + thisQueryMessage)
    } else {
      const bodyJson = JSON.parse(body)
      const teamId = bodyJson.team_id
      const accessTokenPlain = bodyJson.access_token
      if (teamId && accessTokenPlain) {
        const accessTokenCipher = encryptToken(accessTokenPlain, process.env.SLACK_OAUTH_TOKEN_SECRET)
        saveTeam(teamId, accessTokenCipher)
        const thisQueryMessage = queryString.stringify({ message: 'success' })
        res.redirect('/?' + thisQueryMessage)
      } else {
        const thisQueryMessage = queryString.stringify({ message: 'error' })
        res.redirect('/?' + thisQueryMessage)
      }
    }
  })
}

var algorithm = 'aes-256-cbc'
var encryptToken = (tokenPlain, tokenKey) => {
  /* encrypt token to store at rest */
  const ivLen = 16
  const iv = cryptoRandomString({ length: ivLen, type: 'hex' })
  const cipher = crypto.createCipheriv(algorithm, tokenKey, iv)
  let encrypted = cipher.update(tokenPlain, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${encrypted}${iv}`
}

var decryptToken = (tokenCipher, tokenKey) => {
  /* decrypt token to send for authorization */
  const encrypted = tokenCipher.slice(0, 160)
  const iv = tokenCipher.slice(160)
  const decipher = crypto.createDecipheriv(algorithm, tokenKey, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

module.exports = { oauth, encryptToken, decryptToken }
