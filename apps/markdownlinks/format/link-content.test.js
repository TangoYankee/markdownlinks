const {
  checkLinkAddress, checkLinkString,
  findMarkdownLink, httpLinkAddress
} = require('./link-content')

var linkAddresses = [
  ['nasa', false], ['', false], ['http://.example.com', false],
  ['nasa. gov', false], ['h://nasa.gov', false], ['https://www.nasa.gov', true],
  ['http://na sa.gov', false], ['https://google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746', true]
]
test.each(linkAddresses)(
  'must fit the correct format of a url', (linkAddress, expectedBoolean) => {
    expect(checkLinkAddress(linkAddress)).toBe(expectedBoolean)
  })

var linkStrings = [['0', true], ['', false], [' ', false]]
test.each(linkStrings)(
  'link string cannot be blank or only spaces', (linkString, expectedBoolean) => {
    expect(checkLinkString(linkString)).toBe(expectedBoolean)
  })

var testMessageOne = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
var markdownLink = [[[12, 16, 28], testMessageOne, '[car](dmv.ca.gov)'], [[38, 52, 75], testMessageOne, '[safest of all](https://www.osha.com/)'], [[78, 91, 104], testMessageOne, '[Example site](example.com)']]
test.each(markdownLink)(
  'identify entire portion of markdown syntax', (linkPositions, text, expectedMarkdown) => {
    expect(findMarkdownLink(linkPositions, text)).toEqual(expectedMarkdown)
  })

var httpLinks = [['dmv.ca.gov', 'https://dmv.ca.gov'], ['http://example.com', 'http://example.com'], ['https://www.osha.com/', 'https://www.osha.com/']]
test.each(httpLinks)(
  'each link has http or https in the url', (inputLink, expectedLink) => {
    expect(httpLinkAddress(inputLink)).toEqual(expectedLink)
  })
