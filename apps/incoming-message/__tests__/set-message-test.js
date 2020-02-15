'use strict'

jest.mock('../../safe-browse/post-threat-matches')
// Test Modules
const {
  setMessage, setHyperText, getCache,
  setSafeBrowse, setNoneFound
} = require('../set-message')
const { postCacheThreats, clearCache } = require('../../cache/threats')
// Test Data
// Set Message
const {
  setMessagePostToCacheOne, setMessagePostToCacheTwo, setMessagePostToCacheThree,
  setMessagePostToCacheFour, setMessagePostToCacheFive
} = require('../test-data/set-message-data/set-message-post-to-cache-data')
const {
  inputTextOne, inputTextTwo, inputTextThree,
  inputTextFour, inputTextFive
} = require('../test-data/set-message-data/input-text-data')
const {
  outputMessageOne, outputMessageTwo, outputMessageThree,
  outputMessageFour, outputMessageFive
} = require('../test-data/set-message-data/output-message-data')
const {
  userIdOne, userIdTwo, userIdThree,
  userIdFour, userIdFive
} = require('../test-data/set-message-data/user-id-data')
// HyperText
const { messageDataIntoHyperTextOne } = require('../test-data/hyper-text-data/into-hyper-text-data')
const { textOne } = require('../test-data/hyper-text-data/text-data')
const { messageDataOutOfHyperTextOne } = require('../test-data/hyper-text-data/out-of-hyper-text-data')
// getCache
const { postToCacheOne, postToCacheTwo, postToCacheThree } = require('../test-data/get-cache-data/post-to-cache-data')
const { messageDataIntoCacheOne, messageDataIntoCacheTwo, messageDataIntoCacheThree } = require('../test-data/get-cache-data/into-cache-data')
const { messageDataOutOfCacheOne, messageDataOutOfCacheTwo, messageDataOutOfCacheThree } = require('../test-data/get-cache-data/out-of-cache-data')
// setSafeBrowse
const { messageDataIntoSafeBrowseFull, messageDataIntoSafeBrowseEmpty, messageDataIntoSafeBrowseError } = require('../test-data/set-safe-browse-data/into-safe-browse-data')
const { messageDataOutOfSafeBrowseFull, messageDataOutOfSafeBrowseEmpty, messageDataOutOfSafeBrowseError } = require('../test-data/set-safe-browse-data/out-of-safe-browse-data')
// setNoneFound
const { messageDataIntoNoneFoundOne } = require('../test-data/set-none-found-data/into-none-found-data')
const { messageDataOutOfNoneFoundOne } = require('../test-data/set-none-found-data/out-of-none-found-data')

describe.each([
  [setMessagePostToCacheOne, inputTextOne, userIdOne, outputMessageOne],
  [setMessagePostToCacheTwo, inputTextTwo, userIdTwo, outputMessageTwo],
  [setMessagePostToCacheThree, inputTextThree, userIdThree, outputMessageThree],
  [setMessagePostToCacheFour, inputTextFour, userIdFour, outputMessageFour],
  [setMessagePostToCacheFive, inputTextFive, userIdFive, outputMessageFive]
])(
  'setMessage() suite /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  (setMessagePostToCache, inputText, userId, outputMessage) => {
    beforeAll(() => {
      postCacheThreats(setMessagePostToCache)
    })
    afterAll(() => {
      clearCache()
    })
    test(
      'setMessage()',
      async () => {
        expect.assertions(1)
        var message = await setMessage(inputText, userId)
        expect(message).toEqual(outputMessage)
      }
    )
  }
)

test.each([
  [messageDataIntoHyperTextOne, textOne, messageDataOutOfHyperTextOne]
])(
  'setHyperText() /* destination urls, display text, and their meta data */',
  (messageDataIntoHyperText, text, messageDataOutOfHyperText) => {
    expect(setHyperText(messageDataIntoHyperText, text)).toEqual(messageDataOutOfHyperText)
  }
)

describe.each([
  [postToCacheOne, messageDataIntoCacheOne, messageDataOutOfCacheOne],
  [postToCacheTwo, messageDataIntoCacheTwo, messageDataOutOfCacheTwo],
  [postToCacheThree, messageDataIntoCacheThree, messageDataOutOfCacheThree]
])(
  'getCache() suite /* reference threat urls that are already saved locally */',
  (postToCache, messageDataIntoCache, messageDataOutOfCache) => {
    beforeAll(() => {
      postCacheThreats(postToCache)
    })
    afterAll(() => {
      clearCache()
    })
    test(
      'getCache()',
      () => {
        expect(getCache(messageDataIntoCache)).toEqual(messageDataOutOfCache)
      })
  }
)

// Why is this test in set message?
test.each([
  [messageDataIntoSafeBrowseFull, messageDataOutOfSafeBrowseFull],
  [messageDataIntoSafeBrowseEmpty, messageDataOutOfSafeBrowseEmpty],
  [messageDataIntoSafeBrowseError, messageDataOutOfSafeBrowseError]
])(
  'setSafeBrowse() /* check whether url is a suspected threat by google safe browse api */',
  async (messageDataIntoSafeBrowse, messageDataOutOfSafeBrowse) => {
    expect.assertions(1)
    var messageDataOut = await setSafeBrowse(messageDataIntoSafeBrowse)
    expect(messageDataOut).toEqual(messageDataOutOfSafeBrowse)
  }
)

test.each([
  [messageDataIntoNoneFoundOne, messageDataOutOfNoneFoundOne]
])(
  'setNoneFound () /* identify if there are links that are not suspected of threats*/',
  (messageDataIntoNoneFound, messageDataOutOfNoneFound) => {
    expect(setNoneFound(messageDataIntoNoneFound)).toEqual(messageDataOutOfNoneFound)
  }
)
