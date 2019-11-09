const process = require('process')
const request = require('request')

const postThreatMatches = (requestBody) => {
  /* find threats that safe browse suspects */
  var requestUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'
  var options = {
    url: requestUrl,
    body: requestBody,
    json: true,
    qs: process.env.GOOGLE_SAFE_BROWSING_KEY
  }

  return new Promise(resolve => {
    request.post(options, (error, response) => {
      if (error) {
        resolve(error)
      } else if (response.statusCode === 200) {
        resolve(response.body)
      }
    })
  })
}

module.exports = {
  postThreatMatches
}
