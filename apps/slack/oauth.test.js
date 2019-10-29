const cryptoRandomString = require('crypto-random-string')
const { encryptToken, decryptToken } = require('./oauth.js')

const createTokenFake = () => {
  /* emulate oauth token layouts */
  const prefix = 'xoxp'
  var numberArray = []
  for (let i = 0; i < 3; i++) {
    var number = cryptoRandomString({ length: 12, characters: '1234567890' })
    numberArray.push(number)
  }
  var hexString = cryptoRandomString({ length: 32, type: 'hex' })
  return (`${prefix}-${numberArray[0]}-${numberArray[1]}-${numberArray[2]}-${hexString}`)
}

/* encrypted tokens should not look like plain text tokens */
var tokenFakeKey = cryptoRandomString({ length: 32, type: 'hex' })
var tokenFakePlain = createTokenFake()
var tokenFakeCipher = encryptToken(tokenFakePlain, tokenFakeKey)
const checkCipher = (tokenFakeCipher) => {
  var validLen = (tokenFakeCipher.length === 176)
  var includesDash = tokenFakeCipher.includes('-')
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
