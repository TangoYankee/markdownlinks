'use strict'

const { IncomingMessage } = require('./incoming-message')
const { ThreatCache } = require('../cache/threats')
const { SafeBrowse } = require('../safe-browse/safe-browse')

const setIncomingMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  var incomingMessage = new IncomingMessage(text, userId)
  var threatCache = new ThreatCache(incomingMessage.hypertexts)
  var inCacheThreatMatches = threatCache.getCacheThreats()
  incomingMessage.setInCacheThreatMatches(inCacheThreatMatches)
  var safeBrowse = new SafeBrowse(incomingMessage.hypertexts)
  var safeBrowseThreatMatches = await safeBrowse.getSafeBrowseThreats()
  if (safeBrowseThreatMatches !== undefined) {
    if (safeBrowseThreatMatches === 'error') {
      incomingMessage.safeBrowseSuccess = false
    } else {
      incomingMessage.safeBrowseSuccess = true
      incomingMessage.setSafeBrowseThreatMatches(safeBrowseThreatMatches)
    }
  }
  threatCache.postCacheThreats(incomingMessage.hypertexts)
  return incomingMessage
}

module.exports = {
  setIncomingMessage
}
