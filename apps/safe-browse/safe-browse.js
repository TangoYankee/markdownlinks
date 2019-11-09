const process = require('process')
const postThreatMatches = require('./post-threat-matches')

const safeBrowse = (messageData) => {
  /* scan urls for threats using Google safe browse 'lookup' API */
  var threatEntries = setThreatEntries(messageData.links)
  var requestBody = setRequestBody(threatEntries)
  var threatMatches = postThreatMatches(requestBody)  
  messageData.safeBrowseSuccess = true
  messageData = setThreatTypes(messageData, threatMatches)
  return messageData
}

const setThreatEntries = (links) => {
  /* pair urls with key for safe browse threat entries */
  var threatEntries = []
  for (var link of links) {
    threatEntries.push({ url: link.cacheKeyFromUrl })
  }
  return threatEntries
}

const setRequestBody = (threatEntries) => {
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
      threatEntries: threatEntries
    }
  }
}

const setThreatTypes = (messageData, threatMatches) => {
  /* add threat type to the original message */
  for (var threatMatch of threatMatches.matches) {
    for (var link of messageData.links) {
      if (link.cacheKeyFromUrl === threatMatch.threat.url) {
        link.threatMatch = threatMatch.threatType
        link.cacheDuration = threatMatch.cacheDuration
        messageData.threatTypes.push(threatMatch.threatType)
      }
    }
  }
  return messageData
}

module.exports = {
  safeBrowse,
  setRequestBody,
  setThreatEntries,
  setThreatTypes
}
