'use strict'

const linkThreats = [
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

const linkThreatsRepeat = [
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

const linkThreatsNone = []

module.exports = {
  linkThreats,
  linkThreatsRepeat,
  linkThreatsNone
}
