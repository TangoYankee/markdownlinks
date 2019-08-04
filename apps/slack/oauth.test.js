const cryptoRandomString = require('crypto-random-string');
const { oauth, encryptToken, decryptToken } = require('./oauth.js');

createTokenFake = () => {
  /* emulate oauth token layouts */
  let prefix = "xoxp"
  let number_array = [];
  for (i = 0; i < 3; i++) {
    let number = cryptoRandomString({ length: 12, characters: '1234567890' });
    number_array.push(number);
  }
  let hex_string = cryptoRandomString({ length: 32, type: 'hex' });
  return (`${prefix}-${number_array[0]}-${number_array[1]}-${number_array[2]}-${hex_string}`);
}

/* encrypted tokens should not look like plain text tokens */
var token_fake_key = cryptoRandomString({ length: 32, type: 'hex' });
var token_fake_plain = createTokenFake();
var token_fake_cipher = encryptToken(token_fake_plain, token_fake_key);
checkCipher = (token_fake_cipher) => {
  valid_len = (token_fake_cipher.length == 176);
  includes_dash = token_fake_cipher.includes("-");
  return (valid_len && !includes_dash);
}

test.each([token_fake_cipher])(
  'verify that the generated cipher could be valid', (token_fake_cipher) => {
    expect(checkCipher(token_fake_cipher)).toBe(true);
  });

test.each([[token_fake_cipher, token_fake_key, token_fake_plain]])(
  'decryption should match originally generated token', (token_fake_cipher, token_fake_key, token_fake_plain) => {
    expect(decryptToken(token_fake_cipher, token_fake_key)).toEqual(token_fake_plain);
  });
