const cryptoRandomString = require('crypto-random-string')
const { encryptToken, decryptToken } = require('./oauth.js')

var createTokenFake = () => {
  /* emulate oauth token layouts */
  const prefix = 'xoxp'
  const numberArray = []
  for (let i = 0; i < 3; i++) {
    const number = cryptoRandomString({ length: 12, characters: '1234567890' })
    numberArray.push(number)
  }
  const hexString = cryptoRandomString({ length: 32, type: 'hex' })
  return (`${prefix}-${numberArray[0]}-${numberArray[1]}-${numberArray[2]}-${hexString}`)
}

/* encrypted tokens should not look like plain text tokens */
var tokenFakeKey = cryptoRandomString({ length: 32, type: 'hex' })
var tokenFakePlain = createTokenFake()
var tokenFakeCipher = encryptToken(tokenFakePlain, tokenFakeKey)
var checkCipher = (tokenFakeCipher) => {
  const validLen = (tokenFakeCipher.length === 176)
  const includesDash = tokenFakeCipher.includes('-')
  return (validLen && !includesDash)
}

test.each([tokenFakeCipher])(
  'verify that the generated cipher could be valid', (tokenFakeCipher) => {
    expect(checkCipher(tokenFakeCipher)).toBe(true)
  })

test.each([[tokenFakeCipher, tokenFakeKey, tokenFakePlain]])(
  'decryption matches originally generated token', (tokenFakeCipher, tokenFakeKey, tokenFakePlain) => {
    expect(decryptToken(tokenFakeCipher, tokenFakeKey)).toEqual(tokenFakePlain)
  })
