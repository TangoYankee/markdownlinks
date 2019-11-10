const { encryptToken, decryptToken } = require('../oauth.js')
const { tokenKey, tokenPlain, checkCipher } = require('../test-data/oauth-data')

const tokenCipher = encryptToken(tokenPlain, tokenKey)

test(
  'encryptToken() /* encrypt token to store at rest */',
  () => {
    expect(checkCipher(tokenCipher)).toBe(true)
  })

test(
  'decryptToken() /* decrypt token to send for authorization */',
  () => {
    expect(decryptToken(tokenCipher, tokenKey)).toEqual(tokenPlain)
  })
