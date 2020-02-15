'use strict'

const crypto = require('crypto')
const cryptoRandomString = require('crypto-random-string')

class TokenEncryption {
  constructor () {
    this.algorithm = 'aes-256-cbc'
    this.tokenKey = process.env.SLACK_OAUTH_TOKEN_SECRET
  }

  encryptToken (tokenPlain) {
    /* encrypt token to store at rest */
    var ivLen = 16
    var iv = cryptoRandomString({ length: ivLen, type: 'hex' })
    var cipher = crypto.createCipheriv(this.algorithm, this.tokenKey, iv)
    let encrypted = cipher.update(tokenPlain, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return `${encrypted}${iv}`
  }

  decryptToken (tokenCipher) {
    /* decrypt token to send for authorization */
    var encrypted = tokenCipher.slice(0, 160)
    var iv = tokenCipher.slice(160)
    var decipher = crypto.createDecipheriv(this.algorithm, this.tokenKey, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
}

module.exports = {
  TokenEncryption
}
