const {
    findMarkdownLink, httpLinkAddress, 
    checkLinkString, checkLinkAddress
  } = require('../link-content')

/* reference message for remainder of tests */
var testMessageOne = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'

var markdownLink = [[[12, 16, 28], testMessageOne, '[car](dmv.ca.gov)'], [[38, 52, 75], testMessageOne, '[safest of all](https://www.osha.com/)'], [[78, 91, 104], testMessageOne, '[Example site](example.com)']]
test.each(markdownLink)(
  'identify entire portion of markdown syntax', (linkPositions, text, expectedMarkdown) => {
    expect(findMarkdownLink(linkPositions, text)).toEqual(expectedMarkdown)
  })

var httpLinks = [['dmv.ca.gov', 'https://dmv.ca.gov'], ['hTtp://example.com', 'hTtp://example.com'], ['Https://www.osha.com/', 'Https://www.osha.com/']]
test.each(httpLinks)(
'ensure that each link has http or https in the url', (inputLink, expectedLink) => {
    expect(httpLinkAddress(inputLink)).toEqual(expectedLink)
})

var linkStrings = [['0', true], ['', false], [' ', false]]
test.each(linkStrings)(
  'link string cannot be blank or only spaces', (linkString, expectedBoolean) => {
    expect(checkLinkString(linkString)).toBe(expectedBoolean)
  })

var linkAddresses = [[' nasa.gov ', true], ['', false], [' ', false], ['nasa. gov ', false]]
test.each(linkAddresses)(
  'unhttpedLinkAddress cannot blank or contains a space in the url itself', (linkAddress, expectedBoolean) => {
    expect(checkLinkAddress(linkAddress)).toBe(expectedBoolean)
  })
