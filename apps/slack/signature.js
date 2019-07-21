const crypto = require('crypto');
const qs = require('qs');

signature = (request) => {
    /*verify request is from slack*/
    let timestamp_str = request.headers['X-Slack-Request-Timestamp'];
    let timestamp = Number(timestamp_str);
    let current_time = Date.now();
    if (isRecent(timestamp, current_time)) {
        return isValidHash(request, timestamp);
    } else {
        return false;
    }

}


isRecent = (timestamp, current_time) => {
    /*Guard against replay attacks by checking the request was made recently*/
    var time_tolerance = 3e2;
    var time_delta = current_time - timestamp;
    return (time_delta <= time_tolerance);
}


isValidHash = (timestamp, request) => {
    /*Check that the calculated application signature  and slack signature match*/
    let version = 'v0';
    let request_body = qs.stringify(request.body,{format:'RFC1738'});
    base_string = getBaseString(version, timestamp, request_body);
    let signing_secret = process.env.SLACK_SIGNING_SECRET;
    hex_digest = getHexDigest(signing_secret, base_string);
    app_signature = getSignature(version, hex_digest);
    slack_signature = request.headers['x-slack-signature'];
    return (app_signature === slack_signature);
}


getBaseString = (version, timestamp, request_body) => {
    /*format raw string to use in calculation hash*/
    return (`${version}:${timestamp}:${request_body}`);
}


getHexDigest = (signing_secret, base_string) => {
    /*calculate the raw hash*/
    return crypto.createHmac('sha256', signing_secret).update(`${base_string}`).digest('hex');
}


getSignature = (version, hex_digest) => {
    /*format the full signature*/
    return (`${version}=${hex_digest}`);
}


module.exports = { signature, isRecent, isValidHash };
