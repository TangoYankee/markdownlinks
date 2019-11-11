const hyperTexts = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
    cacheDuration: '',
    markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
    messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
    sharedAsHttpSecure: true,
    threatMatch: ''
  },
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '',
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  },
  {
    urlDomainKey: 'nasa.gov',
    cacheDuration: '',
    markdownLink: '[Nasa](nasa.gov)',
    messageLink: '<https://nasa.gov|Nasa>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  }
]

const urlDomainKeys = [
  'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
  'testsafebrowsing.appspot.com/s/malware.html',
  'nasa.gov'
]

const hyperTextThreats = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
    cacheDuration: '',
    markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
    messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
    sharedAsHttpSecure: true,
    threatMatch: ''
  },
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '300s',
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'MALWARE'
  },
  {
    urlDomainKey: 'nasa.gov',
    cacheDuration: '',
    markdownLink: '[Nasa](nasa.gov)',
    messageLink: '<https://nasa.gov|Nasa>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  }
]

const cacheThreats = [
  {
    key: 'testsafebrowsing.appspot.com/s/malware.html',
    val: { threatMatch: 'MALWARE' },
    ttl: 300
  }
]

const cacheDurationUnits = '300s'
const cacheDuration = 300

module.exports = {
  hyperTexts,
  urlDomainKeys,
  hyperTextThreats,
  cacheThreats,
  cacheDurationUnits,
  cacheDuration
}
