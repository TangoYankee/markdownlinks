const process = require('process')
const request = require('request')

// On the homepage, advise that the protection is not perfect.

var safeBrowse = async (threatUrls) => {
  /* control the workflow of scanning urls for threats using Google safe browsing */
  var cachedThreatMatches = await getCache(threatUrls)
  var uncachedThreatUrls = findUncachedUrls(threatUrls, cachedThreatMatches)
  var urlsLookupApi = formatUrlsLookupApi(uncachedThreatUrls)
  var bodyLookupApi = setBodyLookupApi(urlsLookupApi)
  var bodyThreatMatches = await postLookupApi(bodyLookupApi)
  var lookedupThreatMatches = bodyThreatMatches.matches
  postCache(lookedupThreatMatches)
  var allThreatMatches = lookedupThreatMatches + cachedThreatMatches
  return allThreatMatches
}

var getCache = async (threatUrls) => {
  /* check cache for previously saved suspected threats */
  // https://www.npmjs.com/package/node-cache
  // possible cache check error
  var cachedThreatMatches = '' // url and threat found in cache
  return (cachedThreatMatches)
}

var findUncachedUrls = (threatUrls, cachedThreatMatches) => {
  /* determine which threat urls do not exist in the cache */
  return threatUrls
}

var formatUrlsLookupApi = (uncachedThreatUrls) => {
  var urlsLookupApi = []
  for (var threatUrl of uncachedThreatUrls) {
    urlsLookupApi.push({ "url": threatUrl })
  }
  return urlsLookupApi
}

var setBodyLookupApi = (urlsLookupApi) => {
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
      "threatEntries": urlsLookupApi
    }
  }
}

var postLookupApi = async (bodyLookupApi) => {
  /* call the Google Safe Browse API to check for suspected threats */
  var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`
  request.post({
    url: requestUrl,
    body: bodyLookupApi,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(`Error: ${error}`)
      return error
    } else {
      console.log(`Response: ${response}`)
      return body
    }
  })
}

// postCache
// - accept array of "uncached_threat_url" and "threat_type"
// - write the urls to the cache [threat_url, threat_type, cached_timeout]
// - return success or error state
var postCache = (threatMatches) => {
  /* save newly checked urls to the cache */
  // If there are matches
  if (threatMatches) {

  }
  var cacheResponse = ''
  return cacheResponse
}

module.exports = {
  formatUrlsLookupApi,
  findUncachedUrls,
  getCache,
  postCache,
  postLookupApi,
  safeBrowse,
  setBodyLookupApi
}
