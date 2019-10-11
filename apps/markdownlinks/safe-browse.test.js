const {
  safeBrowseMain,
  getCache,
  jsonTemplate,
  safeBrowseRequest,
  postCache
} = require('./safe-browse.js')

test('the main function demonstrate the integration of all functions', () => {
  expect(safeBrowseMain('')).toBe('')
})

test('check the cache for saved threats', () => {
  expect(getCache('')).toBe('', '')
})

test('place urls in json object to send to safe browse api', () => {
  expect(jsonTemplate('')).toBe('')
})

test('call the google safe browse api', () => {
  expect(safeBrowseRequest('')).toBe('')
})

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
