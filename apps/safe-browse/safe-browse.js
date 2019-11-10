const process = require('process')
const request = require('request')

// On the homepage, advise that the protection is not perfect.

var safeBrowse = async (threatUrls) => {
  /* control the workflow of scanning urls for threats using Google safe browsing Lookup API */
  var cachedThreatMatches = getCacheThreatMatches(threatUrls)
  var uncachedThreatUrls = setUncachedThreatUrlPositions(threatUrls, cachedThreatMatches)
  var lookupThreatEntries = setLookupThreatEntries(uncachedThreatUrls)
  var lookupBody = setLookupBody(lookupThreatEntries)
  var lookupThreatMatches = postLookupThreatMatches(lookupBody)
  postCacheThreatMatches(lookupThreatMatches)
  var allThreatMatches = lookupThreatMatches + cachedThreatMatches
  return allThreatMatches
}

// TODO: move to cache folder/application
var getCacheThreatMatches = (threatUrls) => {
  /* check cache for previously saved suspected threats */
  // https://www.npmjs.com/package/node-cache
  // possible cache check error
  var cachedThreatMatches = threatUrls // url and threat found in cache
  return cachedThreatMatches
}

var setUncachedThreatUrlPositions = (threatUrls, cachedThreatMatches) => {
  /* determine which threat urls do not exist in the cache */
  var threatDomains = setThreatDomains(threatUrls)
  var cachedThreatDomains = setThreatDomains(cachedThreatMatches)
  var uncachedThreatDomains = threatDomains.filter(threatDomain => !cachedThreatDomains.includes(threatDomain))
  var uncachedThreatDomainsLoc = uncachedThreatDomains.map(threatDomain => threatDomains.indexOf(threatDomain))
  return uncachedThreatDomainsLoc
}

const setThreatDomains = (threatUrls) => {
  /* strip the address prefixes, as they may not have been used in previous requests */
  const removeDomainPrefixes = (threatUrls) => {
    /* nested regex function to remove http(s) and www */
    var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return threatUrls.url.replace(domainPrefixRegex, '')
  }
  return threatUrls.map(removeDomainPrefixes)
}

var setLookupThreatEntries = (uncachedThreatUrls) => {
  /* urls have a specific format when placed into Lookup API body */
  var lookupThreatEntries = []
  for (var threatUrl of uncachedThreatUrls) {
    lookupThreatEntries.push({ "url": threatUrl })
  }
  return lookupThreatEntries
}

var setLookupBody = (lookupThreatEntries) => {
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

var postLookupThreatMatches = (lookupBody) => {
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

// TODO: move to cache folder/application
// postCache
// - accept array of "uncached_threat_url" and "threat_type"
// - write the urls to the cache [threat_url, threat_type, cached_timeout]
// - return success or error state
var postCacheThreatMatches = (lookupThreatMatches) => {
  /* save newly checked urls to the cache */
  // If there are matches
  if (lookupThreatMatches) {

  }
  var cacheResponse = ''
  return cacheResponse
}

module.exports = {
  getCacheThreatMatches,
  postCacheThreatMatches,
  postLookupThreatMatches,
  safeBrowse,
  setLookupBody,
  setLookupThreatEntries,
  setThreatDomains,
  setUncachedThreatUrlPositions
}
