jest.mock('../post-safe-browse')

const { postSafeBrowse } = require('../post-safe-browse')

it('postSafeBrowse /* threats suspected by google safe-browse API */', async () => {
  var threatMatches = {
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
  expect.assertions(1)
  const threatMatchesResponse = await postSafeBrowse('')
  return expect(threatMatchesResponse).toEqual(threatMatches)
})
