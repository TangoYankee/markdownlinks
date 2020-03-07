'use strict'

const requestPromise = require('request-promise')

class SafeBrowse {
  constructor(threatEntries) {
    this.threatEntries = threatEntries
  }

  get _requestBody() {
    return {
      client: {
        clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
        clientVersion: '1.5.2'
      },
      threatInfo: {
        platformTypes: ['ANY_PLATFORM'],
        threatEntries: this.threatEntries,
        threatEntryTypes: ['URL'],
        threatTypes: [
          'THREAT_TYPE_UNSPECIFIED',
          'MALWARE',
          'SOCIAL_ENGINEERING',
          'UNWANTED_SOFTWARE',
          'POTENTIALLY_HARMFUL_APPLICATION'
        ]
      }
    }
  }
}

module.exports = {
  SafeBrowse
}
