const { cacheInstance } = require('./cache')

const getCacheThreats = (hyperTexts) => {
    /* previously encountered threats */
    var urlDomainKeys = setUrlDomainKeys(hyperTexts)
    cacheInstance.mget(urlDomainKeys, (err, value) => {
        if (err){
            console.log(err)
            return err
        } else if (value) {
            console.log(value)
            return value
        }
    })
}

const setUrlDomainKeys = (hyperTexts) => {
    /* list of urls to check in cache */
    var urlDomainKeys = []
    for( key of hyperTexts.urlDomainKey){
        urlDomainKeys.push(key)
    }
    return urlDomainKeys
}

const postCacheThreats = (hyperTexts) => {
    /* remember threats */
    var cacheThreats = setCacheThreats(hyperTexts)
    return cacheThreats.mset(cacheThreats)
}

const setCacheThreats = (hyperTexts) => {
    /* cache-friendly threat format */
    var cacheThreats = []
    for(hyperText of hyperTexts){
        threatMatch = hyperText.threatMatch
        if(threatMatch){
        cacheThreats.push(
            {
                key: threatMatch.urlDomainKey, 
                val: { threatMatch: threatMatch },
                ttl: threatMatch.cacheDuration
            },
        )
        }
    }
    return cacheThreats
}

module.exports = {
    getCacheThreats,
    postCacheThreats
}
