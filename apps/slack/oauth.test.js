const cryptoRandomString = require('crypto-random-string');
const {oauth, encryptToken, decryptToken} = require('./oauth.js');


/*Emulate OAuth token layouts*/
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


/*Encrypted tokens should not look like plain text tokens*/
var token_fake_key = cryptoRandomString({length: 32, type: 'hex'});
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

// Go through the process once, pull the data from Slack
// Reuse on multiple tests with dummy requests
// https://hackernoon.com/api-testing-with-jest-d1ab74005c0a


// oAuth process testing
// 1) Make a request to the Slack (Summarized in Button)
    // Pretend to be the user 
    //  - https://slack.com/oauth/authorize 
    // - client_id
    // - scope
// 2) Recieve response from Slack
    // Slack will call markdownlinks.io/oauth
    // Contains code
// 3) Markdownlinks makes a post request to Slack
    // - Application calls to https://slack.com/api/oauth.access
    // - Sends: code, client id, client secret
// 4) Slack sends a respose to the post request
    // Contains team id and access token