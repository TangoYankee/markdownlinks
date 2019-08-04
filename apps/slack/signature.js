const crypto = require("crypto");
const qs = require("qs");

signature = (request, current_time) => {
  /* verify request is from slack */
  let timestamp_str = request.headers["x-slack-request-timestamp"];
  let timestamp = Number(timestamp_str);
  if (isRecent(timestamp, current_time)) {
    return isValidHash(timestamp, request);
  } else {
    return false;
  }
}

isRecent = (timestamp, current_time) => {
  /* Guard against replay attacks by checking the request was made recently */
  let time_tolerance = 3e2;
  let time_delta = Math.abs(current_time - timestamp);
  return (time_delta <= time_tolerance);
}

isValidHash = (timestamp, request) => {
  /* Check that the calculated application signature  and slack signature match */
  let version = "v0";
  let request_body = qs.stringify(request.body, { format: "RFC1738" });
  base_string = getBaseString(version, timestamp, request_body);
  hex_digest = getHexDigest(process.env.SLACK_SIGNING_SECRET, base_string);
  app_signature = getSignature(version, hex_digest);
  slack_signature = request.headers["x-slack-signature"];
  return (crypto.timingSafeEqual(
    Buffer.from(app_signature, "utf-8"),
    Buffer.from(slack_signature, "utf-8"))
  );
}

getBaseString = (version, timestamp, request_body) => {
  /* format raw string to use in calculation hash */
  return (`${version}:${timestamp}:${request_body}`);
}

getHexDigest = (signing_secret, base_string) => {
  /* calculate the raw hash */
  return crypto.createHmac("sha256", signing_secret).update(`${base_string}`).digest("hex");
}

getSignature = (version, hex_digest) => {
  /* format the full signature */
  return (`${version}=${hex_digest}`);
}

module.exports = { signature, isRecent, isValidHash };
