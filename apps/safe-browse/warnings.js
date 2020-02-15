'use strict'

class ThreatWarning {
  constructor (threatType) {
    this.threatType = threatType
    this.threatWarnings = this._threatWarnings()
    this.text = this._setText()
    this.threatEmoji = this._setEmoji()
  }

  _setEmoji () {
    return this.threatWarnings[this.threatType].emoji
  }
  
  _setText () {
    return this.threatWarnings[this.threatType].text
  }

  _threatWarnings () {
    return {
      SHARED_WITHOUT_HTTPS: {
        emoji: 'small_orange_diamond',
        text: 'shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
      },
      SAFE_BROWSE_ERROR: {
        emoji: 'heavy_multiplication_x',
        text: 'Error checking for threats in <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>'
      },
      MALWARE: {
        emoji: 'beetle',
        text: '<https://www.stopbadware.org/|malware> '
      },
      SOCIAL_ENGINEERING: {
        emoji: 'biohazard_sign',
        text: '<https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering> '
      },
      UNWANTED_SOFTWARE: {
        emoji: 'no_entry_sign',
        text: '<https://www.google.com/about/unwanted-software-policy.html|unwanted software> '
      },
      THREAT_TYPE_UNSPECIFIED: {
        emoji: 'exclamation',
        text: 'unspecified threat'
      },
      POTENTIALLY_HARMFUL_APPLICATION: {
        emoji: 'exclamation',
        text: 'potentially harmful app'
      },
      NONE_FOUND: {
        emoji: 'small_blue_diamond',
        text: '<https://developers.google.com/safe-browsing/v4/advisory|no threats suspected>'
      }
    }
  }

  warningText () {
  /* message for the emoji note left on destination urls */
    return `:${this.threatEmoji}: ${this.text}`
  }
}

module.exports = { ThreatWarning }
