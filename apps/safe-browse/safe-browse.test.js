const process = require('process')
const {
  setLookupBody, setLookupThreatEntries,
  getThreatUrlsList, postLookupThreatMatches
} = require('./safe-browse.js')
const { 
  messageData, urlList, 
  lookupThreatEntries, lookupBody 
} = require('./test-data/threat-entries')

test('getThreatUrlsList() /* extract the urls from the message object */', () => {
  expect(getThreatUrlsList(messageData)).toEqual(urlList)
})

test('setLookupThreatEntries() /* urls have a specific format when placed into Lookup API body */', () => {
  expect(setLookupThreatEntries(urlList)).toEqual(lookupThreatEntries)
})

test('setLookupBody() /* place urls with uncached threats into a json template for the Safe Browse API */', () => {
  // var lookupThreatEntries = [{ "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" }, { "url": "testsafebrowsing.appspot.com/s/malware.html" }, { "url": "nasa.gov" }]
  // var lookupBody = {
  //   "client": {
  //     "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
  //     "clientVersion": "1.5.2"
  //   },
  //   "threatInfo": {
  //     "platformTypes": ["ANY_PLATFORM"],
  //     "threatEntries": [
  //       { "url": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/" },
  //       { "url": "testsafebrowsing.appspot.com/s/malware.html" },
  //       { "url": "nasa.gov" }
  //     ],
  //     "threatEntryTypes": ["URL"],
  //     "threatTypes": [
  //       "THREAT_TYPE_UNSPECIFIED",
  //       "MALWARE",
  //       "SOCIAL_ENGINEERING",
  //       "UNWANTED_SOFTWARE",
  //       "POTENTIALLY_HARMFUL_APPLICATION"
  //     ]
  //   }
  // }
  expect(setLookupBody(lookupThreatEntries)).toEqual(lookupBody)
})

// test('postLookupThreatMatches() /* threats suspected by google safe-browse API */', async () => {
//   var lookupBody = {
//     "client":
//     { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
//     "clientVersion": "1.5.2" },
//     "threatInfo": {
//       "platformTypes": ["ANY_PLATFORM"],
//       "threatEntries": [
//         { "url": "testsafebrowsing.appspot.com/s/malware.html" }
//       ],
//         "threatEntryTypes": ["URL"],
//         "threatTypes": [
//           "THREAT_TYPE_UNSPECIFIED",
//           "MALWARE", "SOCIAL_ENGINEERING",
//           "UNWANTED_SOFTWARE",
//           "POTENTIALLY_HARMFUL_APPLICATION"] } }

//   var mockSafeBrowseReponse = {
//     "matches": [
//       {
//         "threatType": "MALWARE",
//         "platformType": "ANY_PLATFORM",
//         "threat": {
//           "url": "testsafebrowsing.appspot.com/s/malware.html"
//         },
//         "cacheDuration": "300s",
//         "threatEntryType": "URL"
//       }
//     ]
//   }
//   const data = postLookupThreatMatches(lookupBody)
//   expect(data).toBe(mockSafeBrowseReponse)
// })

// it('works with promises', async () => {
//   var lookupBody = {
//     "client":
//     {
//       "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
//       "clientVersion": "1.5.2"
//     },
//     "threatInfo": {
//       "platformTypes": ["ANY_PLATFORM"],
//       "threatEntries": [
//         { "url": "testsafebrowsing.appspot.com/s/malware.html" }
//       ],
//       "threatEntryTypes": ["URL"],
//       "threatTypes": [
//         "THREAT_TYPE_UNSPECIFIED",
//         "MALWARE", "SOCIAL_ENGINEERING",
//         "UNWANTED_SOFTWARE",
//         "POTENTIALLY_HARMFUL_APPLICATION"]
//     }
//   }

//   var mockSafeBrowseReponse = {
//     "matches": [
//       {
//         "threatType": "MALWARE",
//         "platformType": "ANY_PLATFORM",
//         "threat": {
//           "url": "testsafebrowsing.appspot.com/s/malware.html"
//         },
//         "cacheDuration": "300s",
//         "threatEntryType": "URL"
//       }
//     ]
//   }
//   expect.assertions(1)
//   const threatMatches = await postLookupThreatMatches(lookupBody)
//   return expect(threatMatches).toEqual(mockSafeBrowseReponse)
// })
