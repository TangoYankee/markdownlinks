'use strict'

const { Hypertext } = require('./hypertext')

class IncomingMessage {
  constructor (text, userId) {
    /* message with meta data stored in an object */
    this.text = text
    this.sharedBy = userId
    this.safeBrowseSuccess = true
    this.rawHypertexts = this._setRawHypertexts()
    this.hypertexts = this._setHyperTexts()
    this.allSharedAsHttpSecure = this._setAllSharedAsHttpSecure()
    this.threatTypes = []
  }

  _setRawHypertexts () {
    /* identify entire portion of markdown syntax from original user input */
    var markdownHyperTextRegex = /(\[.*?\]\(.*?\))/gm
    return this.text.match(markdownHyperTextRegex)
  }

  _setHyperTexts () {
    /* destination urls, display text, and their meta data */
    var hypertexts = []
    if (this.rawHypertexts !== null) {
      for (var rawHypertext of this.rawHypertexts) {
        var hypertext = new Hypertext(rawHypertext)
        if (hypertext.isValid) {
          hypertexts.push(hypertext)
        }
      }
    }
    return hypertexts
  }

  _setAllSharedAsHttpSecure () {
    /* all urls were originally prefaced with 'https' */
    for (var hypertext of this.hypertexts) {
      if (!hypertext.sharedAsHttpSecure) {
        return false
      }
    }
    return true
  }

  setInCacheThreatMatches (inCacheThreatMatches) {
    /* save threat matches to message object */
    for (var urlDomainKey in inCacheThreatMatches) {
      var threatMatch = inCacheThreatMatches[urlDomainKey].threatMatch
      for (this.hypertext of this.hypertexts) {
        if (this.hypertext.urlDomainKey === urlDomainKey) {
          this.hypertext.threatMatch = threatMatch
          this.hypertext.inCache = true
          var threatMatchInThreatTypes = this.threatTypes.includes(threatMatch)
          if (!threatMatchInThreatTypes) {
            this.threatTypes.push(threatMatch)
          }
        }
      }
    }
  }

  setSafeBrowseThreatMatches (safeBrowseThreatMatches) {
    /* add threat type to the original message */
    if (safeBrowseThreatMatches.matches) {
      for (var threatMatch of safeBrowseThreatMatches.matches) {
        for (this.hypertext of this.hypertexts) {
          if (this.hypertext.urlDomainKey === threatMatch.threat.url) {
            this.hypertext.threatMatch = threatMatch.threatType
            this.hypertext.cacheDuration = threatMatch.cacheDuration
            this.hypertext.inCache = false
            var threatMatchInThreatTypes = this.threatTypes.includes(threatMatch.threatType)
            if (!threatMatchInThreatTypes) {
              this.threatTypes.push(threatMatch.threatType)
            }
          }
        }
      }
    }
  }

  setNoneFound () {
    /* identify whether there is url for a hypertext object that is not suspected of threats */
    for (var hypertext of this.hypertexts) {
      if (hypertext.threatMatch === '') {
        var noneFoundInThreatTypes = this.threatTypes.includes('NONE_FOUND')
        if (!noneFoundInThreatTypes) {
          this.threatTypes.push('NONE_FOUND')
        }
      }
    }
  }
}

module.exports = {
  IncomingMessage
}
