const { postSafeBrowse } = require('./post-safe-browse')

const getThreatMatches = async (lookupBody) => {
    var safeBrowseResponse = await postSafeBrowse(lookupBody)
    return (safeBrowseResponse.body)
}

module.exports = {
    getThreatMatches
}
