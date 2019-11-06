const {
  helpMessage,
  errorMessage,
  markdownMessage,
  devMarkdownMessage
} = require('./messages.js')

test('help message', () => {
  var userId = 12345678
  var helpMessageData = {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*returned message*\n _create <https://markdownguide.org/|nice links>._"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "visit https://markdownlinks.io"
          }
        ]
      }
    ]
  }
  expect(helpMessage(userId)).toEqual(helpMessageData)
})

test('error message', () => {
  var errorMessageData = {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":warning:please provide input text"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*For instructions, write...* _/markdownlinks help_"
        }
      }
    ]
  }
  expect(errorMessage()).toEqual(errorMessageData)
})

test('markdown message', () => {
  var markdownFormat = "example text"
  var userId = 12345678
  var markdownMessageData = {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `${markdownFormat}`
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `-shared by <@${userId}>`
          }
        ]
      }
    ]
  }
  expect(markdownMessage(markdownFormat, userId)).toEqual(markdownMessageData)
})

test('format message based on object data', () => {
  var messageData = {
    "message": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)",
    "sharedBy": "TangoYankee",
    "safeBrowseSuccess": true,
    "allSharedAsHttpSecure": false,
    "threatTypes": [
      "SOCIAL_ENGINEERING",
      "MALWARE"
    ],
    "links": [
      {
        "cacheKeyFromUrl": "testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/",
        "cacheDuration": "300s",
        "markdownLink": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)",
        "messageLink": "<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>",
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

  var messageFormat = {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/):biohazard_sign:, [Malware Site](testsafebrowsing.appspot.com/s/malware.html):beetle::eyes:, and <https://nasa.gov|Nasa>:eyes:"
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

  expect(devMarkdownMessage(messageData)).toEqual(messageFormat)
})
