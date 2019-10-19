const request = require('request')
const { cacheStart, cacheInstance } = require('./cache-threats.js')
const CACHE_DURATION = 6e2
const CACHE_KEY = 'CACHE_KEY'

const cacheableRequest = (cb) => {
    cacheInstance().get(CACHE_KEY, (err, value) => {
        if (err) {
            console.error(err)
        }
        if (value === undefined) {
            request.get(
                
            )
        }
    })
}

module.exports = {
    cacheableRequest
}
