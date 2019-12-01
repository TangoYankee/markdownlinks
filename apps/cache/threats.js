const { cacheStart, cacheInstance } = require('./cache')

cacheStart()
const cache = cacheInstance()

// TODO: 'inCache' Boolean value
const setCacheThreatTypes = (messageData, threatMatches) => {
  /* save threat matches to message object */
  // Look for every instance of the url
  // console.log(`threatMatches ${threatMatches}`)
  for (urlDomainKey in threatMatches) {
    console.log(`urlDomainKey: ${urlDomainKey}\n threat Match: ${threatMatches[urlDomainKey].threatMatch}`)

  }
  return false
}

const getCacheThreats = (hyperTexts) => {
  /* previously encountered threats */
  var urlDomainKeys = setUrlDomainKeys(hyperTexts)
  return cache.mget(urlDomainKeys)
}

const setUrlDomainKeys = (hyperTexts) => {
  /* list of urls to look for in cache */
  var urlDomainKeys = []
  for (var hyperText of hyperTexts) {
    urlDomainKeys.push(hyperText.urlDomainKey)
  }
  return urlDomainKeys
}

const postCacheThreats = (hyperTexts) => {
  /* remember threats */
  var cacheThreats = setCacheThreats(hyperTexts)
  return cache.mset(cacheThreats)
}

const setCacheDuration = (cacheDurationUnits) => {
  /* string with units to integar */
  var numberRegex = /[0-9]/g
  var durationSplit = cacheDurationUnits.match(numberRegex)
  var durationJoined = durationSplit.join('')
  var cacheDuration = parseInt(durationJoined)
  return cacheDuration
}

const setCacheThreats = (hyperTexts) => {
  /* cache-friendly threat format */
  var cacheThreats = []
  for (var hyperText of hyperTexts) {
    var threatMatch = hyperText.threatMatch
    if (threatMatch) {
      cacheThreats.push(
        {
          key: hyperText.urlDomainKey,
          val: {
            threatMatch: hyperText.threatMatch
          },
          ttl: setCacheDuration(hyperText.cacheDuration)
        }
      )
    }
  }
  return cacheThreats
}

module.exports = {
  setCacheThreatTypes,
  getCacheThreats,
  setUrlDomainKeys,
  postCacheThreats,
  setCacheDuration,
  setCacheThreats
}
