'use strict'

const { cacheStart, cacheInstance } = require('./cache')

cacheStart()

class ThreatCache {
  constructor (uncheckedHypertexts) {
    this.cache = cacheInstance()
    this.uncheckedHypertexts = uncheckedHypertexts
    this.urlDomainKeys = this.setUrlDomainKeys()
  }

  setUrlDomainKeys () {
    /* list of urls to look for in cache */
    var incomingUrlDomainKeys = []
    for (var hypertext of this.uncheckedHypertexts) {
      try {
        incomingUrlDomainKeys.push(hypertext.urlDomainKey)
      } catch (error) {
        console.warn(`set urldomainkey error: ${error}`)
        throw error
      }
    }
    return incomingUrlDomainKeys
  }

  getCacheThreats () {
    /* previously encountered threats */
    try {
      return this.cache.mget(this.urlDomainKeys)
    } catch (error) {
      return error
    }
  }

  postCacheThreats (checkedThreatUrls) {
    /* remember threats */
    try {
      return this.cache.mset(this.formatThreatUrls(checkedThreatUrls))
    } catch (error) {
      return error
    }
  }

  formatThreatUrls (checkedThreatUrls) {
    /* cache-friendly threat format */
    var incomingThreatUrls = []
    for (var hypertext of checkedThreatUrls) {
      var threatMatch = hypertext.threatMatch
      if (threatMatch && !hypertext.inCache) {
        var urlDomainKeyInCacheThreats = incomingThreatUrls.find(cacheThreat => cacheThreat.key === hypertext.urlDomainKey)
        if (urlDomainKeyInCacheThreats === undefined) {
          incomingThreatUrls.push(
            {
              key: hypertext.urlDomainKey,
              val: {
                threatMatch: hypertext.threatMatch
              },
              ttl: this.setCacheDuration(hypertext.cacheDuration)
            }
          )
        }
      }
    }
    return incomingThreatUrls
  }

  setCacheDuration (cacheDurationUnits) {
    /* string with units to integer */
    var numberRegex = /[0-9]/g
    var durationSplit = cacheDurationUnits.match(numberRegex)
    var durationJoined = durationSplit.join('')
    var cacheDuration = parseInt(durationJoined)
    return cacheDuration
  }

  clearCache () {
    /* reset data */
    this.cache.flushAll()
  }
}

module.exports = {
  ThreatCache
}
