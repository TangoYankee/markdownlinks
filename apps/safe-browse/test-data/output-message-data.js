const outputMessageOne = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
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
}

const outputMessageTwo = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](https://testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
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
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Unwanted Software](https://testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: true,
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
}

const outputMessageThree = {
  message: 'Takeoff with [Nasa](https://nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: true,
  threatTypes: [
  ],
  links: [
    {
      urlDomainKey: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](https://nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    }
  ]
}

const outputMessageFour = {
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), \
  [Phishing Site HTTP](http://testsafebrowsing.appspot.com/s/phishing.html), \
  [Unwanted Software](https://testsafebrowsing.appspot.com/s/unwanted.html), \
  [Unwanted Software Repeat](https://testsafebrowsing.appspot.com/s/unwanted.html), \
  [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
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
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '',
      inCache: true,
      markdownLink: '[Phishing Site HTTP](http://testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<http://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'SOCIAL_ENGINEERING'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Unwanted Software](https://testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: true,
      threatMatch: 'UNWANTED_SOFTWARE'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Unwanted Software Repeat](https://testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: true,
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
}

module.exports = {
  outputMessageOne,
  outputMessageTwo,
  outputMessageThree,
  outputMessageFour
}
