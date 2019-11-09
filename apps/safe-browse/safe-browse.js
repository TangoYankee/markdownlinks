const process = require('process')
const request = require('request')

const safeBrowse = (messageData) => {
  /* scan urls for threats using Google safe browse 'lookup' API */
  var threatEntries = setThreatEntries(messageData.links)
  var requestBody = setRequestBody(threatEntries)
  // Add handling for unsuccessful requests
  var threatMatches = postThreatMatches(requestBody)
  messageData = setThreatTypes(messageData, threatMatches)
  return messageData
}

const setThreatEntries = (links) => {
  /* pair urls with key for safe browse threat entries */
  var threatEntries = []
  for (var link of links) {
    threatEntries.push({ "url": link.cacheKeyFromUrl })
  }
  return threatEntries
}

const setRequestBody = (threatEntries) => {
  /* pair threat entries urls with threat types to check */
  return {
    "client": {
      "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": threatEntries
    }
  }
}

const postThreatMatches = (requestBody) => {
  /* find threats that safe browse suspects */
  var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find`
  var options = {
    url: requestUrl,
    body: requestBody,
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
  /* add threat type data to information about the original message */
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
  postThreatMatches,
  safeBrowse,
  setRequestBody,
  setThreatEntries
}
