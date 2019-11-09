const process = require('process')

const postSafeBrowse = (lookupBody) => {
    /* threats suspected by google safe-browse API */
    var requestUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find`
    var options = {
        url: requestUrl,
        body: lookupBody,
        json: true,
        qs: process.env.GOOGLE_SAFE_BROWSING_KEY
    }
    
    return new Promise(resolve => {
        request.post(options, (error, body) => {
      if (error) {
        resolve(error)
      } else {
        resolve(body)
      }
    })
    })
  }

module.exports = {
  postSafeBrowse
}
