'use strict'

const postToCacheOne = [
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
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '300s',
    inCache: false,
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'MALWARE'
  }
]

const postToCacheTwo = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
    cacheDuration: '300s',
    inCache: false,
    markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'SOCIAL_ENGINEERING'
  }
]

const postToCacheThree = [
  /* No urls will post because they are marked as already in the cache */
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
    cacheDuration: '',
    inCache: true,
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'MALWARE'
  }
]

module.exports = {
  postToCacheOne,
  postToCacheTwo,
  postToCacheThree
}
