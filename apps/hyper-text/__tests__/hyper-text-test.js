const { hyperText } = require('../hyper-text')
const { messages } = require('../test-data/hyper-text-data')

test.each(messages)(
  'hyperText() /* receive markdown hypertext syntax, return slack hypertext syntax */',
  (inputMessage, expectedMessage) => {
    expect(hyperText(inputMessage)).toEqual(expectedMessage)
  })
