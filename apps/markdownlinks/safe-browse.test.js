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
  expect(safeBrowse(["test_one", "test_two"])).toEqual({"client": {"clientId": process.env.GOOGLE_SAFE_BROWSING_KEY, "clientVersion": "1.5.2"}, "threatInfo": {"platformTypes": ["ANY_PLATFORM"], "threatEntries": [{"url": "test_one"}, {"url": "test_two"}], "threatEntryTypes": ["URL"], "threatTypes": ["PHISHING", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"]}})
})

test('check the cache for saved threats', () => {
  expect(getCache('')).toBe('', '')
})

test('place urls in an array', () => {
  expect(formatUrlsLookupApi( ["test_one", "test_two"] )).toEqual([{"url": "test_one"}, {"url":"test_two"}])
})

test('place urls in json object to send to safe browse api', () => {
  expect(setBodyLookupApi([{"url" : "test_one"}, {"url" : "test_two"}])).toEqual({"client": {"clientId": process.env.GOOGLE_SAFE_BROWSING_KEY, "clientVersion": "1.5.2"}, "threatInfo": {"platformTypes": ["ANY_PLATFORM"], "threatEntries": [{"url": "test_one"}, {"url": "test_two"}], "threatEntryTypes": ["URL"], "threatTypes": ["PHISHING", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"]}})
})

// test('call the google safe browse api', () => {
//   expect(postLookupApi('')).toBe('')
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
