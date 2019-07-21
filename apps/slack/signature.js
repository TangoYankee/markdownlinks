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
    console.log(`base string: ${base_string}`);
    let signing_secret = process.env.SLACK_SIGNING_SECRET;
    hex_digest = getHexDigest(signing_secret, base_string);
    console.log(`hex digest: ${hex_digest}`);
    app_signature = getSignature(version, hex_digest);
    console.log(`app sig: ${app_signature}`);
    slack_signature = request.headers['x-slack-signature'];
    console.log(`slack sig: ${slack_signature}`);
    return (app_signature === slack_signature);
}


getBaseString = (version, timestamp, request_body) => {
    /*format raw string to use in calculation hash*/
    return (`${version}:${timestamp}:${serializeBody(request_body)}`);
}

serializeBody = (request_body) => {
    /*http body should not be deserialized*/
    let token = request_body.token;
    let team_id = request_body.team_id;
    let team_domain = request_body.team_domain;
    let channel_id = request_body.channel_id;
    let channel_name = request_body.channel_name;
    let user_id = request_body.user_id;
    let user_name = request_body.user_name;
    let command = request_body.command;
    let text = request_body.text;
    let response_url = request_body.response_url;
    let trigger_id = request_body.trigger_id;
    return (`token=${token}&team_id=${team_id}&team_domain=${team_domain}&channel_id=${channel_id}&channel_name=${channel_name}&user_id=${user_id}&user_name=${user_name}&command=${command}&text=${text}&response_url=${response_url}&trigger_id=${trigger_id}`);
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
