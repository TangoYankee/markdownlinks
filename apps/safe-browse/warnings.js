const warnings = {
  "shared_without_https": {
    "type": "mrkdwn",
    "text": ":eyes: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>"
  },
  "safe_browse_status": [{
    "suspected_threats_found": {
      "type": "mrkdwn",
      "text": ":warning: Suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:"
    },
    "no_suspected_threats_found": {
      "type": "mrkdwn",
      "text": ":small_blue_diamond: No suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:"
    },
    "error_checking_safe_browse": {
      "type": "mrkdwn",
      "text": ":heavy_multiplication_x: Error checking for threats in <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:"
    }
  }],
  "safe_browse_threats": [{
    "malware": {
      "type": "mrkdwn",
      "text": ":beetle: <https://www.stopbadware.org/|malware> "
    },
    "social_engineering": {
      "type": "mrkdwn",
      "text": ":biohazard_sign: <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering>"
    },
    "unwanted_software": {
      "type": "mrkdwn",
      "text": ":no_entry_sign: <https://www.google.com/about/unwanted-software-policy.html|unwanted software>"
    },
    "general_harm": {
      "type": "mrkdwn",
      "text": ":exclamation: general harm"
    }
  }]
}

module.exports = {
  warnings
}
