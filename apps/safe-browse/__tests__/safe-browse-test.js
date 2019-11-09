jest.mock('../post-safe-browse')

const { postSafeBrowse } = require('../post-safe-browse')
const { setLookupBody, setLookupThreatEntries, getThreatUrlsList } = require('../safe-browse.js')

const { messageData, urlList, lookupThreatEntries, lookupBody } = require('../test-data/threat-entries')
const { threatMatches } = require('../test-data/threat-matches')

test('getThreatUrlsList() /* extract the urls from the message object */', () => {
  expect(getThreatUrlsList(messageData)).toEqual(urlList)
})

test('setLookupThreatEntries() /* urls have a specific format when placed into Lookup API body */', () => {
  expect(setLookupThreatEntries(urlList)).toEqual(lookupThreatEntries)
})

test('setLookupBody() /* place urls with uncached threats into a json template for the Safe Browse API */', () => {
  expect(setLookupBody(lookupThreatEntries)).toEqual(lookupBody)
})

it('postSafeBrowse() /* threats suspected by google safe-browse API */', async () => {
  expect.assertions(1)
  const threatMatchesResponse = await postSafeBrowse('')
  return expect(threatMatchesResponse).toEqual(threatMatches)
})
