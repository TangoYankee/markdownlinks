const nodeCache = require(`node-cache`)
let cacheThreats = null

const cacheStart = (done) => {
    if (cacheThreats) {
        return done()
    }
    cacheThreats = new nodeCache()
}

const cacheInstance = () => {
    return cacheThreats
}

const getCacheThreatMatches = (threatUrls) => {
    /* check cache for previously saved suspected threats */
    // threatUrls syntax: ["cacheKeyFromUrlOne", "cacheKeyFromUrlTwo"]
    // May need to perform regex
    cacheInstance.mget(threatUrls, (err, value) => {
        if (err) {
            console.log(err)
            return err
        } else if (value) {
            console.log(value)
            return value
        }
    })
}

const postCacheThreatMatches = (threatMatch) => {
    /* save threat matches to the threat cache */
    var cacheKeyFromUrl = threatMatch.threat.url
    var cacheDuration = threatMatch.cacheDuration
    cacheInstance.set(cacheKeyFromUrl, threatMatch, cacheDuration, (err, success) => {
        if(err){
            console.log(err)
            return err
        } else if(success) {
            console.log(success)
            return success
        }
    })
}

module.exports = {
    cacheStart,
    cacheInstance,
    getCacheThreatMatches,
    postCacheThreatMatches
}
