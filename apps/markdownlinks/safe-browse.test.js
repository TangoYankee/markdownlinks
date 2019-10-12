const process = require('process')
const {
  formatUrlsLookupApi,
  getCache,
  postCache,
  postLookupApi,
  safeBrowse,
  setBodyLookupApi
} = require('./safe-browse.js')

test('the main function demonstrate the integration of all functions', () => {
  expect(safeBrowse(["http://testsafebrowsing.appspot.com/s/phishing.html", "http://testsafebrowsing.appspot.com/s/malware.html"])).toEqual({ "client": { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID, "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
})

test('check the cache for saved threats', () => {
  expect(getCache('')).toBe('', '')
})

test('place urls in an array', () => {
  expect(formatUrlsLookupApi(["http://testsafebrowsing.appspot.com/s/phishing.html", "http://testsafebrowsing.appspot.com/s/malware.html"])).toEqual([{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }])
})

test('place urls in json object to send to safe browse api', () => {
  expect(setBodyLookupApi([{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }])).toEqual({ "client": { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID, "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
})

// it('calls the google safe browse lookup api', async () => {
//   expect.assertions(1)
//   const data = await postLookupApi({ "client": { "clientId": "", "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware_in_iframe.html" }, { "url": "http://testsafebrowsing.appspot.com/s/unwanted.html" }, { "url": "http://testsafebrowsing.appspot.com/apiv4/IOS/SOCIAL_ENGINEERING/URL/" }, { "url": "http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
//   expect(data).toEqual('')
// })

test('save checked urls to the cache', () => {
  expect(postCache('')).toBe('')
})

// https://developers.google.com/safe-browsing/v4/lookup-api
// Warning guidelines
// - must leave room for discretion
// - must inform advisory comes from google
//   - https://developers.google.com/safe-browsing/v4/advisory
//   - Advisory page provides information on phishing/unwanted software/software engineering/malware

// If no threats are found, add context message indicating as such
// If a threat is found, add context message with link to google advisory

// On the homepage, advise that the protection is not perfect.

// Must cache searches to prevent searching for the results multiple times within the specified cache time
//   - https://www.npmjs.com/package/node-cache

// Testing urls: http://testsafebrowsing.appspot.com/

// Curl
// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
// https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}

// curl -d '{"client": {"clientId": process.env.GOOGLE_SAFE_BROWSE_CLIENT_ID, "clientVersion": "1.5.2"}, "threatInfo": {"platformTypes": ["ANY_PLATFORM"], "threatEntries": [{"url": "http://testsafebrowsing.appspot.com/s/malware.html"}], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE",]}}' -H "Content-Type: application/json" -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}
