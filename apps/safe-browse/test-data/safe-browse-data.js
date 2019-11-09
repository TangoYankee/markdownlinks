const threatEntries = [
  { url: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/' },
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const urlDomainKeys = [
  {
    cacheKeyFromUrl: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
    cacheDuration: '300s',
    markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
    messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>',
    sharedAsHttpSecure: true,
    threatMatch: 'SOCIAL_ENGINEERING'
  },
  {
    cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '300s',
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'MALWARE'
  },
  {
    cacheKeyFromUrl: 'nasa.gov',
    cacheDuration: '',
    markdownLink: '[Nasa](nasa.gov)',
    messageLink: '<https://nasa.gov|Nasa>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  }
]

const requestBody = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/' },
      { url: 'testsafebrowsing.appspot.com/s/malware.html' },
      { url: 'nasa.gov' }
    ],
    threatEntryTypes: ['URL'],
    threatTypes: [
      'THREAT_TYPE_UNSPECIFIED',
      'MALWARE',
      'SOCIAL_ENGINEERING',
      'UNWANTED_SOFTWARE',
      'POTENTIALLY_HARMFUL_APPLICATION'
    ]
  }
}

const inputMessageData = {
  message: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [],
  links: [
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
      cacheDuration: '',
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '300s',
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

const outputMessageData = {
  message: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE'
  ],
  links: [
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
      cacheDuration: '',
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '300s',
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

module.exports = {
  threatEntries,
  urlDomainKeys,
  requestBody,
  inputMessageData,
  outputMessageData
}
