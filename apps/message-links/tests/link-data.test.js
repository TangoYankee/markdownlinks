const { urlData } = require('../link-data')

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
var testMessageFour = "What if it's a [space](nas a.gov) [ ](nasa.gov)?"
var expectedMessageFour = "What if it's a [space](nas a.gov) [ ](nasa.gov)?"
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
