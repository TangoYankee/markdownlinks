const { setAllLinkPositions, 
  validLinkPositions } = require('./link-positions.js')
const { 
    findLinkString,
    findLinkAddress,
    checkLinkString,
    checkLinkAddress,
    setSharedAsHttpSecure,
    httpLinkAddress,
    createMessageLink,
    findMarkdownLink,
    replaceLink,
    setCacheKeyFromUrl } = require('./link-content.js')

// Good for checking whether it is a valid address? Handles instances like ht:// or ww.
// domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

const urlData = (text) => {
  /* receive markdown hyperlink syntax, return slack hyperlink syntax */
var allLinkPositions = setAllLinkPositions(text)
if (allLinkPositions) {
    var thisUrlData = urlDataTemplate(text)
    let message = text
    for (var linkPositions of allLinkPositions) {
      if (validLinkPositions(linkPositions)) {
        var linkString = findLinkString(linkPositions, text)
        var unhttpedLinkAddress = findLinkAddress(linkPositions, text)
        if (checkLinkString(linkString) && checkLinkAddress(unhttpedLinkAddress)) {
            var cacheKeyFromUrl = setCacheKeyFromUrl(unhttpedLinkAddress)
            var sharedAsHttpSecure = setSharedAsHttpSecure(unhttpedLinkAddress)
            var linkAddress = httpLinkAddress(unhttpedLinkAddress)
            var messageLink = createMessageLink(linkAddress, linkString)
            var markdownLink = findMarkdownLink(linkPositions, text)
            var linkData = setLinkData(markdownLink, messageLink, cacheKeyFromUrl, sharedAsHttpSecure)
            thisUrlData.links.push(linkData)
            message = replaceLink(markdownLink, messageLink, message)
        }
      }
    }
    return message
  } else {
    return text
  }
}

const urlDataTemplate = (text) => {
    return {
    "message": text,
    "threatTypes": "",
    "links": []
    }
}

const setLinkData = (markdownLink, messageLink, cacheKeyFromUrl, sharedAsHttpSecure) => {
    return {
        "cacheKeyFromUrl": cacheKeyFromUrl, // (remove the prefixes to standardize the cacheKey and threatUrl syntax)
        "markdownLink": markdownLink, // (to replace value in message)
        "messageLink": messageLink, // (to be replaced in orignal message)
        "sharedAsHttpSecure": sharedAsHttpSecure,// (boolean. make a function to specifically check for https in original link)
        "threatMatch": "" // (to have value added later)         
        }

}

module.exports = { urlData }
