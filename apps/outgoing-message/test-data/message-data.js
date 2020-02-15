'use strict'

var userId = 12345678
var helpMessage = {
  response_type: 'ephemeral',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*returned message*\n _create <https://markdownguide.org/|nice links>._'
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'visit https://markdownlinks.io'
        }
      ]
    }
  ]
}

var errorMessage = {
  response_type: 'ephemeral',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':warning:please provide input text'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*For instructions, write...* _/markdownlinks help_'
      }
    }
  ]
}

var messageData = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'SOCIAL_ENGINEERING'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: false,
      threatMatch: 'UNWANTED_SOFTWARE'
    },
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

var messageFormat = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html):biohazard_sign::small_orange_diamond:, [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html):no_entry_sign::small_orange_diamond:, [Malware Site](testsafebrowsing.appspot.com/s/malware.html):beetle::small_orange_diamond:, and <https://nasa.gov|Nasa>:small_blue_diamond::small_orange_diamond:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by <@TangoYankee>'
        },
        {
          type: 'mrkdwn',
          text: ':small_orange_diamond: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ':biohazard_sign: <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering> '
        },
        {
          type: 'mrkdwn',
          text: ':no_entry_sign: <https://www.google.com/about/unwanted-software-policy.html|unwanted software> '
        },
        {
          type: 'mrkdwn',
          text: ':beetle: <https://www.stopbadware.org/|malware> '
        },
        {
          type: 'mrkdwn',
          text: ':small_blue_diamond: <https://developers.google.com/safe-browsing/v4/advisory|no threats suspected>'
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Remove Message'
          },
          value: 'remove_message',
          style: 'danger',
          confirm: {
            title: {
              type: 'plain_text',
              text: 'Confirm Message Removal'
            },
            text: {
              type: 'mrkdwn',
              text: 'Are you sure you would like to remove this message?'
            },
            confirm: {
              type: 'plain_text',
              text: 'Yes, remove message'
            },
            deny: {
              type: 'plain_text',
              text: 'No, keep message'
            }
          }
        }
      ]
    }
  ]
}

var messageDataSafe = {
  message: '[Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'NONE_FOUND'
  ],
  links: [
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

var messageFormatSafe = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '<https://nasa.gov|Nasa>:small_blue_diamond::small_orange_diamond:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by <@TangoYankee>'
        },
        {
          type: 'mrkdwn',
          text: ':small_orange_diamond: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ':small_blue_diamond: <https://developers.google.com/safe-browsing/v4/advisory|no threats suspected>'
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Remove Message'
          },
          value: 'remove_message',
          style: 'danger',
          confirm: {
            title: {
              type: 'plain_text',
              text: 'Confirm Message Removal'
            },
            text: {
              type: 'mrkdwn',
              text: 'Are you sure you would like to remove this message?'
            },
            confirm: {
              type: 'plain_text',
              text: 'Yes, remove message'
            },
            deny: {
              type: 'plain_text',
              text: 'No, keep message'
            }
          }
        }
      ]
    }
  ]
}

var messageDataError = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Error destination url](https://error.io) [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: false,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE',
    'NONE_FOUND'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'error.io',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Error destination url](https://error.io)',
      messageLink: '<https://error.io|Error destination url>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '',
      inCache: true,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      urlDomainKey: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

var messageFormatError = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>:small_orange_diamond:, <https://error.io|Error destination url> <https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>:small_orange_diamond:, [Malware Site](testsafebrowsing.appspot.com/s/malware.html):beetle::small_orange_diamond:, and <https://nasa.gov|Nasa>:small_orange_diamond:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by <@TangoYankee>'
        },
        {
          type: 'mrkdwn',
          text: ':small_orange_diamond: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
        }
      ]
    },
    {
      type: 'divider'
    }, {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ':heavy_multiplication_x: Error checking for threats in <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>'
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ':beetle: <https://www.stopbadware.org/|malware> '
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Remove Message'
          },
          value: 'remove_message',
          style: 'danger',
          confirm: {
            title: {
              type: 'plain_text',
              text: 'Confirm Message Removal'
            },
            text: {
              type: 'mrkdwn',
              text: 'Are you sure you would like to remove this message?'
            },
            confirm: {
              type: 'plain_text',
              text: 'Yes, remove message'
            },
            deny: {
              type: 'plain_text',
              text: 'No, keep message'
            }
          }
        }
      ]
    }
  ]
}

module.exports = {
  userId,
  helpMessage,
  errorMessage,
  messageData,
  messageFormat,
  messageDataSafe,
  messageFormatSafe,
  messageDataError,
  messageFormatError
}
