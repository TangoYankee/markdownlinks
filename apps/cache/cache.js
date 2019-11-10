const nodeCache = require('node-cache')
let cache = null;

const cacheStart = (done) => {
    if (cache) {
        return done()
    }
    cache = new nodeCache()
}

const cacheInstance = () => {
    return cache
}
module.exports = {
    cacheStart,
    cacheInstance
}
