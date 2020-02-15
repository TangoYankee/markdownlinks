'use strict'

const messageDataOutOfHyperTextOne = {
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

module.exports = {
  messageDataOutOfHyperTextOne
}
