'use strict'

const process = require('process')
const { _postThreatMatches } = require('./post-threat-matches')

class SafeBrowse {
  constructor (hypertexts) {
    this.hypertexts = hypertexts
    this.uncachedThreatEntries = this._setUncachedThreatEntries()
    this.requestBody = this._setRequestBody()
  }

  _setUncachedThreatEntries () {
    /* pair urls with key for safe browse threat entries */
    var uncachedThreatEntries = []
    for (this.hypertext of this.hypertexts) {
      if (!this.hypertext.inCache) {
        var threatEntryInArray = uncachedThreatEntries.find(threatEntry => threatEntry.url === this.hypertext.urlDomainKey)
        if (threatEntryInArray === undefined) {
          uncachedThreatEntries.push({ url: this.hypertext.urlDomainKey })
        }
      }
    }
    return uncachedThreatEntries
  }

  _setRequestBody () {
    /* pair threat entries urls with threat types to check */
    return {
      client: {
        clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
        clientVersion: '1.5.2'
      },
      threatInfo: {
        threatTypes: ['THREAT_TYPE_UNSPECIFIED', 'MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: this.uncachedThreatEntries
      }
    }
  }

  // TODO: Don't pass 'undefined' !
  async getSafeBrowseThreats () {
    /* find suspected threats in safe browse API */
    var threatMatches
    if (this._uncachedThreatEntriesExist()) {
      threatMatches = await _postThreatMatches(this.requestBody)
      return threatMatches
    } else {
      return threatMatches
    }
  }

  _uncachedThreatEntriesExist () {
    /* prevent unnecessary calls to the SafeBrowse API, where there are no uncached threat urls */
    if (this.uncachedThreatEntries.length >= 1) {
      return true
    } else {
      return false
    }
  }
}

module.exports = {
  SafeBrowse
}
