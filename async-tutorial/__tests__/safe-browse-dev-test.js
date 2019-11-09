jest.mock('../post-safe-browse')

const { getThreatMatches } = require('../safe-browse-dev')

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
    const threatMatchesResponse = await getThreatMatches('')
    return expect(threatMatchesResponse).toEqual(threatMatches)
})
