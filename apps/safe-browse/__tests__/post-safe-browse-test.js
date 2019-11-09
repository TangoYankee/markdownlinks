jest.mock('../post-safe-browse')

const { postSafeBrowse } = require('../post-safe-browse')
const { threatMatches } = require('../test-data/threat-matches')

it('postSafeBrowse() /* threats suspected by google safe-browse API */', async () => {
  expect.assertions(1)
  const threatMatchesResponse = await postSafeBrowse('')
  return expect(threatMatchesResponse).toEqual(threatMatches)
})
