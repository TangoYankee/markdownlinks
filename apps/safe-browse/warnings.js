const sharedWithoutHttpsData = {
  emoji: 'eyes',
  text: 'shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
}

const safeBrowseStatusData = {
  suspected_threats_found: {
    emoji: 'warning',
    text: 'Suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:'
  },
  no_suspected_threats_found: {
    emoji: 'small_blue_diamond',
    text: 'No suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:'
  },
  error_checking_safe_browse: {
    emoji: 'heavy_multiplication_x',
    text: 'Error checking for threats in <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:'
  }
}

const safeBrowseThreatsData = {
  MALWARE: {
    emoji: 'beetle',
    text: '<https://www.stopbadware.org/|malware> '
  },
  SOCIAL_ENGINEERING: {
    emoji: 'biohazard_sign',
    text: '<https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering>'
  },
  UNWANTED_SOFTWARE: {
    emoji: 'no_entry_sign',
    text: '<https://www.google.com/about/unwanted-software-policy.html|unwanted software>'
  },
  THREAT_TYPE_UNSPECIFIED: {
    emoji: 'exclamation',
    text: 'unspecified threat'
  },
  POTENTIALLY_HARMFUL_APPLICATION: {
    emoji: 'exclamation',
    text: 'potentially harmful app'
  }
}

module.exports = {
  sharedWithoutHttpsData,
  safeBrowseStatusData,
  safeBrowseThreatsData
}
