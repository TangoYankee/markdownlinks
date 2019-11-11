const { cacheInstance } = require('./cache')

const getCacheThreats = (hyperTexts) => {
  /* previously encountered threats */
  var urlDomainKeys = setUrlDomainKeys(hyperTexts)
  cacheInstance.mget(urlDomainKeys, (err, value) => {
    if (err) {
      console.log(err)
      return err
    } else if (value) {
      console.log(value)
      return value
    }
  })
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
  return cacheThreats.mset(cacheThreats)
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
          val: { threatMatch: hyperText.threatMatch },
          ttl: setCacheDuration(hyperText.cacheDuration)
        }
      )
    }
  }
  return cacheThreats
}

module.exports = {
  getCacheThreats,
  setUrlDomainKeys,
  postCacheThreats,
  setCacheDuration,
  setCacheThreats
}
