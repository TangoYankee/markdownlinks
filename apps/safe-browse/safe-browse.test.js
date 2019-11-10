const process = require('process')
const {
  setLookupBody,
  setLookupThreatEntries,
  setThreatDomains,
  setUncachedThreatUrlPositions
} = require('./safe-browse.js')

test('strip address prefixes', () => {
  var threatUrls = [
    { "url": "dmv.ca.gov" },
    { "url": "https://nasa.gov" },
    { "url": "http://www.example.com" }
  ]
  var threatDomains = [
    "dmv.ca.gov",
    "nasa.gov",
    "example.com"
  ]
  expect(setThreatDomains(threatUrls)).toEqual(threatDomains)
})

test('determine which threat urls do not exist in the cache', () => {
  var threatUrls = [
    { "url": "https://dmv.ca.gov" },
    { "url": "github.com" }
  ]
  var cachedThreatMatches = [
    { "url": "dmv.ca.gov" },
    { "url": "https://nasa.gov" },
    { "url": "http://www.example.com" }
  ]
  var uncachedThreatUrlsLoc = [1]
  expect(setUncachedThreatUrlPositions(threatUrls, cachedThreatMatches)).toEqual(uncachedThreatUrlsLoc)
})

test('place urls in an array', () => {
  var uncachedThreatUrls = ["http://testsafebrowsing.appspot.com/s/phishing.html", "http://testsafebrowsing.appspot.com/s/malware.html"]
  var lookupThreatEntries = [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }]
  expect(setLookupThreatEntries(uncachedThreatUrls)).toEqual(lookupThreatEntries)
})

test('place urls in json object to send to safe browse api', () => {
  var lookupThreatEntries = [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }]
  var lookupBody = {
    "client": {
      "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntries": [
        { "url": "http://testsafebrowsing.appspot.com/s/phishing.html" },
        { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }
      ],
      "threatEntryTypes": ["URL"],
      "threatTypes": [
        "THREAT_TYPE_UNSPECIFIED",
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION"
      ]
    }
  }
  expect(setLookupBody(lookupThreatEntries)).toEqual(lookupBody)
})
