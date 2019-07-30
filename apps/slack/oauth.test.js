// import encrypt and decrypt functions
const crypto = require("crypto");
// dev only dependency?
const cryptoRandomString = require('crypto-random-string');
const {oauth, encryptToken, decryptToken} = require('./oauth.js');

createTokenFake = () => {
    let prefix = "xoxp"
    let number_array = [];
    for (i=0; i <3; i++){
        let number = cryptoRandomString({length: 12, characters: '1234567890'});
        number_array.push(number);
    }
    let hex_string = cryptoRandomString({length: 32, type: 'hex'});
    return (`${prefix}-${number_array[0]}-${number_array[1]}-${number_array[2]}-${hex_string}`);
}

var token_fake_secret = cryptoRandomString({length: 32, type: 'hex'});
var token_fake_plain = createTokenFake();
var token_fake_cipher = encryptToken(token_fake_plain, token_fake_secret);


checkCipher = (token_fake_cipher) => {
    // criteria of a valid token_fake_cipher
    // Test that the encrypted key meets the standards of the cypher
    // Return true if meets the criteria
    return false
}


// Test Cypher (Assertion)
test.each([token_fake_cipher])(
    // Recieve the cypher and the expected value (true)
    // Pass it to 'CheckCypher' function
    // Make assertion
    'verify that the generated cipher could be valid', (token_fake_cipher) => {
    expect(checkCipher(token_fake_cipher)).toBe(true);
});


// Decryption (Assertion)
test.each([[token_fake_cipher, token_fake_secret, token_fake_plain]])(
    'decryption should match originally generated token', (token_cipher, token_secret, token_plain) => {
    expect(decryptToken(token_cipher, token_secret)).toEqual(token_plain);
}); 
