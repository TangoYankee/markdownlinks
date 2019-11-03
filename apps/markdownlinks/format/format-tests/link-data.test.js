const { devFormat } = require('../format')

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
