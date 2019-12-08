const {
  setHelpMessage, setErrorMessage,
  setMarkdownMessage, setDevMarkdownMessage
} = require('../messages.js')
const {
  userId, helpMessage, errorMessage,
  markdownSyntax, markdownMessage,
  messageData, messageFormat
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

test(
  'setMarkdownMessage() /* formatted hyperlinks in slack message */',
  () => {
    expect(setMarkdownMessage(markdownSyntax, userId)).toEqual(markdownMessage)
  })

test(
  'setDevMarkdownMessage() /* compose markdown message */',
  () => {
    expect(setDevMarkdownMessage(messageData)).toEqual(messageFormat)
  })
