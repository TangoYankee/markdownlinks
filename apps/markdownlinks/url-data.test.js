const {
  urlData, validLinkPositions, findMarkdownLink, 
  httpLinkAddress, checkLinkString, checkLinkAddress
} = require('./url-data')

/* reference message for remainder of tests */
var testMessageOne = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
var expectedMessageOne = 'Here[ in my <https://dmv.ca.gov|car> I) feel <https://www.osha.com/|safest of all>. <https://example.com|Example site>'

/* messages exclusive to format function */
/* second set */
var testMessageTwo = '[code](codeforamerica.com)'
var expectedMessageTwo = '<https://codeforamerica.com|code>'
/* third set */
var testMessageThree = "What if it's [blank]() []() [](www.osha.com)?"
var expectedMessageThree = "What if it's [blank]() []() [](www.osha.com)?"
/* fourth set */
var testMessageFour = "What it's a [space](nas a.gov) [ ](nasa.gov)?"
var expectedMessageFour = "What it's a [space](nas a.gov) [ ](nasa.gov)?"
/* fifth set */
var testMessageFive = ')( [] :warning: A mess of [(]Directions to Glen Cove ](google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746)Marina)'
var expectedMessageFive = ')( [] :warning: A mess of <https://google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746|(]Directions to Glen Cove >Marina)'

var formatText = [
  [testMessageOne, expectedMessageOne], [testMessageTwo, expectedMessageTwo],
  [testMessageThree, expectedMessageThree], [testMessageFour, expectedMessageFour],
  [testMessageFive, expectedMessageFive]]
test.each(formatText)(
  'receive markdown hyperlink syntax, return slack hyperlink syntax', (testMessage, expectedMessage) => {
    expect(urlData(testMessage)).toEqual(expectedMessage)
  })

var isValidLinkPositions = [[[12, 16, 28], true], [[undefined, 34, 23], false], [[56], false], [[12, 6, 20], false], [['0', 1, 2], false]]
test.each(isValidLinkPositions)(
  'check that the set of positions for characters could represent a hyperlink', (linkPositions, expectedBoolean) => {
    expect(validLinkPositions(linkPositions)).toBe(expectedBoolean)
  })

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
