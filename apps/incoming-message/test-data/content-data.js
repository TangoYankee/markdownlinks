'use strict'

const validUrls = [
  ['nasa', false], ['', false], ['http://.example.com', false],
  ['nasa. gov', false], ['h://nasa.gov', false], ['https://www.nasa.gov', true],
  ['http://na sa.gov', false], ['https://google.com/maps/place/Glen+Cove+Marina/@38.0677063,-122.2313533,15z/data=!4m5!3m4!1s0x80857235b7b561fb:0xa31992d9db3a4004!8m2!3d38.0677786!4d-122.213746', true]
]
const text = 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)'
const rawMarkdownHyperText = ['[ in my [car](dmv.ca.gov)', '[safest of all](https://www.osha.com/)', '[Example site](example.com)']
const simpleMarkdownHypertText = [
  ['[ in my [car](dmv.ca.gov)', '[car](dmv.ca.gov)'],
  ['[safest of all](https://www.osha.com/)', '[safest of all](https://www.osha.com/)'],
  ['[Example site](example.com)', '[Example site](example.com)']
]

const displayTexts = [
  ['0', true],
  ['', false],
  [' ', false]
]
const httpUrls = [
  ['dmv.ca.gov', 'https://dmv.ca.gov'],
  ['http://example.com', 'http://example.com'],
  ['https://www.osha.com/', 'https://www.osha.com/']
]

const inputMessageDataOne = {
  message: 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
  ],
  links: [
    {
      urlDomainKey: 'dmv.ca.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[car](dmv.ca.gov)',
      messageLink: '<https://dmv.ca.gov|car>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'osha.com/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[safest of all](https://www.osha.com/)',
      messageLink: '<https://www.osha.com/|safest of all>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      urlDomainKey: 'example.com',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Example site](example.com)',
      messageLink: '<https://example.com|Example site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

const outputMessageDataOne = {
  message: 'Here[ in my [car](dmv.ca.gov) I) feel [safest of all](https://www.osha.com/). [Example site](example.com)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
  ],
  links: [
    {
      urlDomainKey: 'dmv.ca.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[car](dmv.ca.gov)',
      messageLink: '<https://dmv.ca.gov|car>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'osha.com/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[safest of all](https://www.osha.com/)',
      messageLink: '<https://www.osha.com/|safest of all>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      urlDomainKey: 'example.com',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Example site](example.com)',
      messageLink: '<https://example.com|Example site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

const inputMessageDataTwo = {
  message: '[safest of all](https://www.osha.com/).',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: true,
  threatTypes: [
  ],
  links: [
    {
      urlDomainKey: 'osha.com/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[safest of all](https://www.osha.com/)',
      messageLink: '<https://www.osha.com/|safest of all>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    }
  ]
}

const outputMessageDataTwo = {
  message: '[safest of all](https://www.osha.com/).',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: true,
  threatTypes: [
  ],
  links: [
    {
      urlDomainKey: 'osha.com/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[safest of all](https://www.osha.com/)',
      messageLink: '<https://www.osha.com/|safest of all>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    }
  ]
}

module.exports = {
  validUrls,
  displayTexts,
  httpUrls,
  inputMessageDataOne,
  outputMessageDataOne,
  inputMessageDataTwo,
  outputMessageDataTwo,
  text,
  rawMarkdownHyperText,
  simpleMarkdownHypertText
}
