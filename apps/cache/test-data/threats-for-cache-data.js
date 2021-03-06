'use strict'

const threatsForCache = [
  {
    key: 'testsafebrowsing.appspot.com/s/phishing.html',
    val: { threatMatch: 'SOCIAL_ENGINEERING' },
    ttl: 300
  },
  {
    key: 'testsafebrowsing.appspot.com/s/unwanted.html',
    val: { threatMatch: 'UNWANTED_SOFTWARE' },
    ttl: 300
  },
  {
    key: 'testsafebrowsing.appspot.com/s/malware.html',
    val: { threatMatch: 'MALWARE' },
    ttl: 300
  }
]

const threatsForCacheRepeat = [
  {
    key: 'testsafebrowsing.appspot.com/s/phishing.html',
    val: { threatMatch: 'SOCIAL_ENGINEERING' },
    ttl: 300
  },
  {
    key: 'testsafebrowsing.appspot.com/s/unwanted.html',
    val: { threatMatch: 'UNWANTED_SOFTWARE' },
    ttl: 300
  },
  {
    key: 'testsafebrowsing.appspot.com/s/malware.html',
    val: { threatMatch: 'MALWARE' },
    ttl: 300
  }
]

const threatsForCacheNone = [
]

module.exports = {
  threatsForCache,
  threatsForCacheRepeat,
  threatsForCacheNone
}
