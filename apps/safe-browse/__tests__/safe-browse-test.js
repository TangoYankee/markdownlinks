jest.mock('../post-safe-browse')

const { postSafeBrowse } = require('../post-safe-browse')
const { setRequestBody, setThreatEntries } = require('../safe-browse.js')

const { urlDomainKeysMeta, threatEntries, requestBody } = require('../test-data/threat-entries')
const { threatMatches } = require('../test-data/threat-matches')

// test('setThreatUrls() /* extract the urls from the message object */', () => {
//   expect(setThreatUrls(urlDomainKeysMeta)).toEqual(urlDomainKeys)
// })

test('setThreatEntries() /* urls have a specific format when placed into Lookup API body */', () => {
  expect(setThreatEntries(urlDomainKeysMeta)).toEqual(threatEntries)
})

test('setRequestBody() /* place urls with uncached threats into a json template for the Safe Browse API */', () => {
  expect(setRequestBody(threatEntries)).toEqual(requestBody)
})

it('postSafeBrowse() /* threats suspected by google safe-browse API */', async () => {
  expect.assertions(1)
  const threatMatchesResponse = await postSafeBrowse(requestBody)
  return expect(threatMatchesResponse).toEqual(threatMatches)
})
