const process = require('process')
const request = require('request')

const safeBrowse = async (threatUrls) => {
  /* control the workflow of scanning urls for threats using Google safe browsing Lookup API */
  var lookupThreatEntries = setLookupThreatEntries(threatUrls)
  var lookupBody = setLookupBody(lookupThreatEntries)
  var lookupThreatMatches = postLookupThreatMatches(lookupBody)
  var allThreatMatches = lookupThreatMatches
  return allThreatMatches
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
  /* call the Google Safe Browse API to check for suspected threats */
  var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`
  request.post({
    url: requestUrl,
    body: lookupBody,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(`Error: ${error}`)
      return error
    } else {
      console.log(`Response: ${response}`)
      return body.matches
    }
  })
}

module.exports = {
  getThreatUrlsList,
  postLookupThreatMatches,
  safeBrowse,
  setLookupBody,
  setLookupThreatEntries
}
