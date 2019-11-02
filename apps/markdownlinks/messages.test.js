const messages = require('./messages.js')

test('format message based on object data', () => {
  var messageData = {
    "message": "[Social Engineering Site](http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](https://nasa.gov)",
    "sharedBy": "TangoYankee",
    "safeBrowseSuccess": true,
    "allSharedAsHttpSecure": false,
    "threatTypes": [
      "SOCIAL_ENGINEERING",
      "MALWARE"
    ],
    "links": [
      {
        "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/",
        "cacheDuration": "300s",
        "markdownLink": "[Social Engineering Site](http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
        "messageLink": "<http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/|Social Engineering Site>",
        "sharedAsHttpSecure": false,
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
        "cacheKeyFromUrl": "https://nasa.gov",
        "cacheDuration": "",
        "markdownLink": "[Nasa](https://nasa.gov)",
        "messageLink": "<https://nasa.gov|Nasa>",
        "sharedAsHttpSecure": true,
        "threatMatch": ""
      }
    ]
  }

  var messageFormat = {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "<http://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/|Social Engineering Site>:biohazard_sign::eyes:, <https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>:beetle::eyes:, and <https://nasa.gov|Nasa>"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "-shared by @TangoYankee"
          },
          {
            "type": "mrkdwn",
            "text": ":eyes: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ":warning: Suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:"
          }
        ]
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ":biohazard_sign: <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering>"
          }, {
            "type": "mrkdwn",
            "text": ":beetle: <https://www.stopbadware.org/|malware> "
          }
        ]
      }
    ]
  }
  expect(messages.data.devMarkdownMessage(messageData)).toEqual(messageFormat)
})
