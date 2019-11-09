const process = require('process')
const request = require('request')

const safeBrowse = (messageData) => {
  /* scan urls for threats using Google safe browse 'lookup' API */
  var threatUrlsList = getThreatUrlsList(messageData.links)
  var lookupThreatEntries = setLookupThreatEntries(threatUrlsList)
  var lookupBody = setLookupBody(lookupThreatEntries)
  setLookupBody(lookupThreatEntries)
  // var threatMatches = postLookupThreatMatches(lookupBody)
  var threatMatches = 'mockSafeBrowseReponse'
  messageData = setThreatTypes(messageData, threatMatches)
  return messageData
}

const getThreatUrlsList = (links) => {
  /* extract the urls from the message object */
  var threatUrls = []
  for (var link of links) {
    threatUrls.push(link.cacheKeyFromUrl)
  }
  return threatUrls
}

const setLookupThreatEntries = (uncachedThreatUrls) => {
  /* urls have a specific format when placed into Lookup API body */
  var lookupThreatEntries = []
  for (var threatUrl of uncachedThreatUrls) {
    lookupThreatEntries.push({ "url": threatUrl })
  }
  return lookupThreatEntries
}

const setLookupBody = (lookupThreatEntries) => {
  /* place urls with uncached threats into a json template for the Safe Browse API */
  return {
    "client": {
      "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": lookupThreatEntries
    }
  }
}

const postLookupThreatMatches = (lookupBody) => {
  /* threats suspected by google safe-browse API */
  var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find`
  var options = {
    url: requestUrl,
    body: lookupBody,
    json: true,
    qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
  }
  return new Promise(resolve => {
    request.post(options, (error, response) => {
      if (error) {
        resolve(error)
      } else if (response.statusCode === 200) {
        resolve(response.body)
      }
    })
  })
}

const setThreatTypes = (messageData, threatMatches) => {
  messageData.safeBrowseSuccess = true
  for (var threatMatch of threatMatches.matches) {
    var threat = threatMatch.threat
    if (threat) {
      for (var link of messageData.links) {
        var lowerThreatUrl = threat.url.toLowerCase()
        if (link.cacheKeyFromUrl.toLowerCase() === lowerThreatUrl.toLowerCase()) {
          link.threatMatch = threatMatch.threatType
          link.cacheDuration = threatMatch.cacheDuration
          messageData.threatTypes.push(threatMatch.threatType)
        }
      }
    }
  }
  return messageData
}

module.exports = {
  getThreatUrlsList,
  postLookupThreatMatches,
  safeBrowse,
  setLookupBody,
  setLookupThreatEntries
}
