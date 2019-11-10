const cryptoRandomString = require('crypto-random-string')

const setTokenPlain = () => {
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

const checkCipher = (tokenCipher) => {
  var validLen = (tokenCipher.length === 176)
  var includesDash = tokenCipher.includes('-')
  return (validLen && !includesDash)
}

const tokenKey = cryptoRandomString({ length: 32, type: 'hex' })
const tokenPlain = setTokenPlain()

module.exports = {
  tokenKey,
  tokenPlain,
  checkCipher
}
