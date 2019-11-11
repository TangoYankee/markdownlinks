const NodeCache = require('node-cache')
let cache = null

const cacheStart = (done) => {
  if (cache) {
    return done()
  }
  cache = new NodeCache()
}

const cacheInstance = () => {
  return cache
}
module.exports = {
  cacheStart,
  cacheInstance
}
