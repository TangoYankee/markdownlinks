const process = require('process')
const {
  formatUrlsLookupApi,
  findUncachedUrls,
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
  expect(getCache('')).toBe('')
})

test('determine which threat urls do not exist in the cache', () => {
  expect(findUncachedUrls('')).toEqual('')
})

test('place urls in an array', () => {
  expect(formatUrlsLookupApi(["http://testsafebrowsing.appspot.com/s/phishing.html", "http://testsafebrowsing.appspot.com/s/malware.html"])).toEqual([{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }])
})

test('place urls in json object to send to safe browse api', () => {
  expect(setBodyLookupApi([{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }])).toEqual({ "client": { "clientId": process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID, "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
})

it('calls the google safe browse lookup api', async () => {
  expect.assertions(1)
  const data = await postLookupApi({ "client": { "clientId": "", "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [{ "url": "http://testsafebrowsing.appspot.com/s/phishing.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware.html" }, { "url": "http://testsafebrowsing.appspot.com/s/malware_in_iframe.html" }, { "url": "http://testsafebrowsing.appspot.com/s/unwanted.html" }, { "url": "http://testsafebrowsing.appspot.com/apiv4/IOS/SOCIAL_ENGINEERING/URL/" }, { "url": "http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/" }], "threatEntryTypes": ["URL"], "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"] } })
  expect(data).toEqual('')
})

test('save checked urls to the cache', () => {
  expect(postCache('')).toBe('')
})
