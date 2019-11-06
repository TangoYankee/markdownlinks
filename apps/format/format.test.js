const { format, devFormat } = require('./format')

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
var testMessageFive = ')( [] :warning: A mess of [(]Directions to Glen Cove ](Google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746)Marina)'
var expectedMessageFive = ')( [] :warning: A mess of <https://google.com/maps/place/glen+cove+marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746|(]Directions to Glen Cove >Marina)'

var formatText = [
  [testMessageOne, expectedMessageOne], [testMessageTwo, expectedMessageTwo],
  [testMessageThree, expectedMessageThree], [testMessageFour, expectedMessageFour],
  [testMessageFive, expectedMessageFive]]
test.each(formatText)(
  'receive markdown hyperlink syntax, return slack hyperlink syntax', (testMessage, expectedMessage) => {
    expect(format(testMessage)).toEqual(expectedMessage)
  })

test('construct message object', () => {
  var userId = "TangoYankee"
  var message = "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)"
  var messageObject = {
    "message": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)",
    "sharedBy": "TangoYankee",
    "safeBrowseSuccess": true,
    "allSharedAsHttpSecure": false,
    "threatTypes": [
      "MALWARE",
      "SOCIAL_ENGINEERING"
    ],
    "links": [
      {
        "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/",
        "cacheDuration": "300s",
        "markdownLink": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
        "messageLink": "<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>",
        "sharedAsHttpSecure": true,
        "threatMatch": "SOCIAL_ENGINEERING"
      },
      {
        "cacheKeyFromUrl": "testsafebrowsing.appspot.com/s/malware.html",
        "cacheDuration": "300s",
        "markdownLink": "[Malware Site](testsafebrowsing.appspot.com/s/malware.html)",
        "messageLink": "<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>",
        "sharedAsHttpSecure": false,
        "threatMatch": "MALWARE"
      },
      {
        "cacheKeyFromUrl": "nasa.gov",
        "cacheDuration": "",
        "markdownLink": "[Nasa](nasa.gov)",
        "messageLink": "<https://nasa.gov|Nasa>",
        "sharedAsHttpSecure": false,
        "threatMatch": ""
      }
    ]
  }
  expect(devFormat(message, userId)).toEqual(messageObject)
})
