// import encrypt and decrypt functions
const crypto = require("crypto");
const cryptoRandomString = require('crypto-random-string');

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

const key_fake = cryptoRandomString({length: 20, type: 'base64'});
const token_fake = createTokenFake();
console.log(`key: ${key_fake}\ntoken: ${token_fake}`);

// Fake oAuth token generator (No Assertion)


// Input nothing
// Generate a fake oAuth token
// return fake oAuth token 

// Fake secret key generator (No Assertion)

// Encrypt (No assertion)
// Receive dummy oAuth Token and secret key
// Encrypt the token with the oauth function
// Return the cypher


// Check Cypher (No Assertion)
// Recieve the cypher from the encryption function
// Test that the encrypted key meets the standards of the cypher
// Return true if meets the criteria


// Test Cypher (Assertion)
// Recieve the cypher and the expected value (true)
// Pass it to 'CheckCypher' function
// Make assertion

// Decryption (Assertion)
// Recieve the original value, cypher and fake secret key
// Pass parameters to oauth decryption function
// Assert that the returned value should match the original token


// 
