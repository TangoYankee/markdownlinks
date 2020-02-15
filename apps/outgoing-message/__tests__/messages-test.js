'use strict'

const {
  setHelpMessage, setErrorMessage, setMarkdownMessage
} = require('../messages.js')
const {
  userId, helpMessage, errorMessage,
  messageData, messageFormat, messageDataSafe,
  messageFormatSafe, messageDataError, messageFormatError
} = require('../test-data/message-data')

test(
  'setHelpMessage() /* in message usage instructions */',
  () => {
    expect(setHelpMessage(userId)).toEqual(helpMessage)
  })

test(
  'setErrorMessage /* handle out of bounds cases */',
  () => {
    expect(setErrorMessage()).toEqual(errorMessage)
  })

test.each([
  [messageData, messageFormat],
  [messageDataSafe, messageFormatSafe],
  [messageDataError, messageFormatError]
])(
  'setMarkdownMessage() /* compose markdown message */',
  (messageData, messageFormat) => {
    expect(setMarkdownMessage(messageData)).toEqual(messageFormat)
  })
