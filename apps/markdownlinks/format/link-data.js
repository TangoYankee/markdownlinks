const messageDataTemplate = (text, userId) => {
  return {
    "message": text,
    "sharedBy": userId,
    "safeBrowseSuccess": true,
    "allSharedAsHttpSecure": true,
    "threatTypes": [],
    "links": []
  }
}

const linkDataTemplate = (markdownLink, messageLink, cacheKeyFromUrl, sharedAsHttpSecure) => {
  return {
    "cacheKeyFromUrl": cacheKeyFromUrl,
    "cacheDuration": "",
    "markdownLink": markdownLink,
    "messageLink": messageLink,
    "sharedAsHttpSecure": sharedAsHttpSecure,
    "threatMatch": ""
  }
}

const setThreatTypes = (messageData, threatMatches) => {
  messageData.safeBrowseSuccess = true
  for (var threatMatch of threatMatches.matches) {
    var threat = threatMatch.threat
    if (threat) {
      for (var link of messageData.links) {
        var lowerThreatUrl = threat.url.toLowerCase()
        if (link.cacheKeyFromUrl.toLowerCase() === lowerThreatUrl.toLowerCase()) {
          console.log(`message and safebrowse match ${link.cacheKeyFromUrl}`)
          link.threatMatch = threatMatch.threatType
          link.cacheDuration = threatMatch.cacheDuration
          messageData.threatTypes.push(threatMatch.threatType)
        }
      }
    }
  }
  return messageData
}

const setAllSharedAsHttpSecure = (messageData) => {
  messageData.allSharedAsHttpSecure = true
  for (var link in messageData.links) {
    if (!link.sharedAsHttpSecure) {
      messageData.allSharedAsHttpSecure = false
    }
  }
  return messageData
}

module.exports = {
  messageDataTemplate,
  linkDataTemplate,
  setThreatTypes,
  setAllSharedAsHttpSecure

}
