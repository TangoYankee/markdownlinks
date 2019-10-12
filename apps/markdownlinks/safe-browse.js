const process = require('process')
const request = require('request')
// Use the lookup API to determine whether the shared link is on a list of potentially harmful websites

// https://developers.google.com/safe-browsing/v4/lookup-api

// Construct the request to look for "phishing", "social_engineering", "malware" [for any OS], or "unwanted_software" [for any OS]
// If the link is associated with a risk, tag it as potentially harmful
// tag it as one of the listed categories. If there are multiple threats categories, use the tag 'multiple'. If there are no threats, use the tag "none"

// Master function
// - accept a list of "threat_urls"
// - read the cache (readCacheUrls(threat_urls))
//   - set cached_threat_url array equal to variable
//   - set uncached_threat_urls list equal to variable
// - call the Google safe browsing lookup API (lookupRequest(uncached_threat_urls))
//   - set uncached_threat_url array equal to a variable
// - write the checked_uncached_threat_url array to the cache (postCache(checked_uncached_threat_url))
// - combine the cached and uncached threat url arrays into one array ("checked_threat_urls")
// - return an array of "threat_url" and its "threat_type" (checked_threat_urls)
var safeBrowse = (threatUrls) => {
  /* control the workflow of scanning urls for threats using Google safe browsing */
  // var cacheResponse = getCache(threatUrls)
  // var uncachedUrls = cacheResponse[0]
  var uncachedUrls = threatUrls
  var urlsLookupApi = formatUrlsLookupApi(uncachedUrls)
  var bodyLookupApi = setBodyLookupApi(urlsLookupApi)
  // postLookupApi(bodyLookupApi)
  var scannedUrlsAndThreatTypes = bodyLookupApi
  return scannedUrlsAndThreatTypes
}

// getCache
// - accept full list of "threat_urls"
// - check against cached urls
// - return
//   - list of "uncached_threat_urls" that were not avaible in the cache
//   - array of "cached_threat_url" and "threat_type" [maybe "cache_error"]
var getCache = (threatUrls) => {
  /* check cache for suspected threats or urls that have not been cached */
  var uncachedUrls = ''
  var cachedUrlsAndThreatTypes = ''
  return (uncachedUrls, cachedUrlsAndThreatTypes)
}

var formatUrlsLookupApi = (uncachedThreatUrls) => {
  var urlsLookupApi = []
  for (var threatUrl of uncachedThreatUrls) {
    urlsLookupApi.push({ "url": threatUrl })
  }
  return urlsLookupApi
}

// jsonTemplate
// The template JSON Object of the Safe Browse API body
// accept the uncached_threat_urls
// return the JSON object with the urls inserted
//  - "phishing", "social_engineering", "malware" [for any OS], or "unwanted_software" [for any OS]
// {
//   "client": {
//     "clientId":      "process.env.GOOGLE_SAFE_BROWSING_CLKEY
//     "clientVersion": "1.5.2"
//   },
//   "threatInfo": {
//     "threatTypes":      ["PHISHING", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
//     "platformTypes":    ["ANY_PLATFORM"],
//     "threatEntryTypes": ["URL"],
//     "threatEntries": [
//       {"url": "http://www.urltocheck1.org/"},
//       {"url": "http://www.urltocheck2.org/"},
//       {"url": "http://www.urltocheck3.com/"}
//     ]
//   }
// }
var setBodyLookupApi = (urlsLookupApi) => {
  /* place urls with uncached threats into a JSON template for the Safe Browse API */
  return {
    "client": {
      "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes": ["PHISHING", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": urlsLookupApi
    }
  }
}

// postLookupApi (postLookupAPI?)
// - accept the "uncached_threat_urls"
// - https://safebrowsing.googleapis.com/v4/threatMatches:find?key=API_KEY HTTP/1.1
// - compose the body of the lookup request
// - make the post request to the Safe Browsing database
// - return the body or error of the lookup response
var postLookupApi = (bodyLookupApi) => {
  /* call the Google Safe Browse API to check for suspected threats */
  var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`
  request.post({
    url: requestUrl,
    body: bodyLookupApi,
    json: true
  }, function (error, response, body) {
    if (error) {
      console.log(`Error: ${error}`)
    } else {
      console.log(`Body: ${body}, Response ${response}`)
    }
  })
  var safeBrowseResponse = ''
  return safeBrowseResponse
}

// postCache
// - accept array of "uncached_threat_url" and "threat_type"
// - write the urls to the cache [threat_url, threat_type, cached_timeout]
// - return success or error state
var postCache = (uncachedUrlsAndThreatTypes) => {
  /* save newly checked urls to the cache */
  var cacheResponse = ''
  return cacheResponse
}

module.exports = {
  formatUrlsLookupApi,
  getCache,
  postCache,
  postLookupApi,
  safeBrowse,
  setBodyLookupApi
}
