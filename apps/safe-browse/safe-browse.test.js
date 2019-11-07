const process = require('process')
const {
  setLookupBody,
  setLookupThreatEntries,
  getThreatUrlsList,
  postLookupThreatMatches
} = require('./safe-browse.js')

test('getThreatUrlsList() /* extract the urls from the message object */', () => {
  var messageData = [
    {
      "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/",
      "cacheDuration": "300s",
      "markdownLink": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
      "messageLink": "<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>",
      "sharedAsHttpSecure": true,
      "threatMatch": "SOCIAL_ENGINEERING"
    },
    {
      "cacheKeyFromUrl": "testsafebrowsing.appspot.com/s/malware.html",
      "cacheDuration": "300s",
      "markdownLink": "[Malware Site](testsafebrowsing.appspot.com/s/malware.html)",
      "messageLink": "<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>",
      "sharedAsHttpSecure": false,
      "threatMatch": "MALWARE"
    },
    {
      "cacheKeyFromUrl": "nasa.gov",
      "cacheDuration": "",
      "markdownLink": "[Nasa](nasa.gov)",
      "messageLink": "<https://nasa.gov|Nasa>",
      "sharedAsHttpSecure": false,
      "threatMatch": ""
    }
  ]
  var urlList = ["testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/", "testsafebrowsing.appspot.com/s/malware.html", "nasa.gov"]

  expect(getThreatUrlsList(messageData)).toEqual(urlList)
})

test('setLookupThreatEntries() /* urls have a specific format when placed into Lookup API body */', () => {
  var uncachedThreatUrls = ["testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/", "testsafebrowsing.appspot.com/s/malware.html", "nasa.gov"]
  var lookupThreatEntries = [{ "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" }, { "url": "testsafebrowsing.appspot.com/s/malware.html" }, { "url": "nasa.gov" }]
  expect(setLookupThreatEntries(uncachedThreatUrls)).toEqual(lookupThreatEntries)
})

test('setLookupBody() /* place urls with uncached threats into a json template for the Safe Browse API */', () => {
  var lookupThreatEntries = [{ "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" }, { "url": "testsafebrowsing.appspot.com/s/malware.html" }, { "url": "nasa.gov" }]
  var lookupBody = {
    "client": {
      "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntries": [
        { "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" },
        { "url": "testsafebrowsing.appspot.com/s/malware.html" },
        { "url": "nasa.gov" }
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

test('postLookupThreatMatches() /* threats suspected by google safe-browse API */', async () => {
  var lookupBody = { 
    "client": 
    { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID, 
    "clientVersion": "1.5.2" }, 
    "threatInfo": { 
      "platformTypes": ["ANY_PLATFORM"], 
      "threatEntries": [
        { "url": "testsafebrowsing.appspot.com/s/malware.html" }
      ], 
        "threatEntryTypes": ["URL"], 
        "threatTypes": [
          "THREAT_TYPE_UNSPECIFIED", 
          "MALWARE", "SOCIAL_ENGINEERING", 
          "UNWANTED_SOFTWARE", 
          "POTENTIALLY_HARMFUL_APPLICATION"] } }

  var mockSafeBrowseReponse = {
    "matches": [
      {
        "threatType": "MALWARE",
        "platformType": "ANY_PLATFORM",
        "threat": {
          "url": "testsafebrowsing.appspot.com/s/malware.html"
        },
        "cacheDuration": "300s",
        "threatEntryType": "URL"
      }
    ]
  }
  const data = await postLookupThreatMatches(lookupBody)
  expect(data).toBe(mockSafeBrowseReponse)
})
