'use strict'

const messageDataOutOfCacheOne = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '',
      inCache: true,
      markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'SOCIAL_ENGINEERING'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '',
      inCache: true,
      markdownLink: '[Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: false,
      threatMatch: 'UNWANTED_SOFTWARE'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '', // no value recieved when already in cache
      inCache: true,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    }
  ]
}

const messageDataOutOfCacheTwo = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'SOCIAL_ENGINEERING'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '',
      inCache: true,
      markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'SOCIAL_ENGINEERING'
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
      cacheDuration: '', // no value recieved when already in cache
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

const messageDataOutOfCacheThree = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [],
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
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

module.exports = {
  messageDataOutOfCacheOne,
  messageDataOutOfCacheTwo,
  messageDataOutOfCacheThree
}
