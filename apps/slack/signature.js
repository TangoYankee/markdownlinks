// Confirm request is from slack by checking the signing secret
// Receives request from slack
// Returns boolean as to whether it matches markdownlinks calculations, and the request was made within five minutes

signature = (request) => {

}
//Export function takes in request
   // timestamp = request.headers['X-Slack-Request-Timestamp'];
    // check isRecent(timestamp, current_time);
        // if false, immediately return false (to save calculations);
        // if true, continue
            // request_body = request.body();



isRecent = (timestamp) => {}
    // Guard against replay attacks by checking the request was made recently
    // Recieve the timestamp and current time. Compare within five minutes
    // Return boolean 


isValidHash = (request_body, timestamp) => {}
    // Checks that the calculated application signature  and slack signature match
    // Receives the timestamp and request body
        // version = "v0";
        // base_string = getBaseString(timestamp, version, request_body);
        // signing_secret = process.env.SLACK_SIGNING_SECRET;
        // hex_digest = getHexDigest(signing_secret, base_string);
        // app_signature = getSignature(version, hex_digest);
        // slack_signature = request.headers['X-Slack-Signature'];
        // return hmac.compare(app_signature, slack_signature);
    // Returns boolean

// getBasestring = (timestamp, version, request_body) => {}
    // raw string to use in calculation hash
    // receive timestamp, version number, request_body
    // return colon delimited base string


// getHexDigest = (signing_secret, base_string) => {}
    // calculate the raw hash
    // receive base string and signing secret
    // return hex digest/hash

    
// getSignature = (version, hex_digest) = {}
    // format the full signature
    // receive version and hex digest
    // return formated 'string'



// export main function for use and testing.
// export isRecent and isValidHash function for testing.

module.exports = {signature, isRecent, isValidHash};
