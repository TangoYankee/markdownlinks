// import encrypt and decrypt functions
const crypto = require("crypto");
const cryptoRandomString = require('crypto-random-string');
const key = cryptoRandomString({length: 20, type: 'base64'});
console.log(key);
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
