const { response } = require('../test-data/post-response')
  
  const postSafeBrowse = (lookupBody) => {
    return new Promise(resolve => {
      if (response.statusCode === 200) {
        resolve(response.body)
      }
    })
  }
  
  module.exports = {
    postSafeBrowse
  }
