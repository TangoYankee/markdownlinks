const { setAllLinkPositions, validLinkPositions } = require('./link-positions')
const {
  checkLinkAddress, checkLinkString, createMessageLink,
  findLinkAddress, findLinkString, findMarkdownLink,
  httpLinkAddress, setCacheKeyFromUrl, setSharedAsHttpSecure
} = require('./link-content')
const { messageDataTemplate, linkDataTemplate, setThreatTypes, setAllSharedAsHttpSecure } = require('./link-data')
// const { getThreatUrlsList, setLookupThreatEntries, setLookupBody } = require('../../safe-browse/safe-browse')
const { mockSafeBrowseReponse } = require('../../safe-browse/safe-browse-mock')

const format = (text, userId) => {
  /* receive markdown hyperlink syntax, return slack hyperlink syntax */
  var allLinkPositions = setAllLinkPositions(text)
  if (allLinkPositions) {
    let message = text
    for (var linkPositions of allLinkPositions) {
      if (validLinkPositions(linkPositions)) {
        var linkString = findLinkString(linkPositions, text)
        var linkAddress = findLinkAddress(linkPositions, text)
        var linkAddressTrimmed = linkAddress.trim()
        var linkAddressTrimmedLowered = linkAddressTrimmed.toLowerCase()
        if (checkLinkString(linkString) && checkLinkAddress(linkAddressTrimmedLowered)) {
          var linkAddressHttped = httpLinkAddress(linkAddressTrimmedLowered)
          var messageLink = createMessageLink(linkAddressHttped, linkString)
          var markdownLink = findMarkdownLink(linkPositions, text)
          message = message.replace(markdownLink, messageLink, message)
        }
      }
    }
    return message
  } else {
    return text
  }
}

const devFormat = (text, userId) => {
  /* receive markdown hyperlink syntax, return slack hyperlink syntax */
  var allLinkPositions = setAllLinkPositions(text)
  let messageData = messageDataTemplate(text, userId)
  if (allLinkPositions) {
    let message = text
    for (var linkPositions of allLinkPositions) {
      if (validLinkPositions(linkPositions)) {
        var linkString = findLinkString(linkPositions, text)
        var linkAddress = findLinkAddress(linkPositions, text)
        var linkAddressTrimmed = linkAddress.trim()
        var linkAddressTrimmedLowered = linkAddressTrimmed.toLowerCase()
        if (checkLinkString(linkString) && checkLinkAddress(linkAddressTrimmedLowered)) {
          var cacheKeyFromUrl = setCacheKeyFromUrl(linkAddressTrimmedLowered)
          var sharedAsHttpSecure = setSharedAsHttpSecure(linkAddressTrimmedLowered)
          var linkAddressHttped = httpLinkAddress(linkAddressTrimmedLowered)
          var messageLink = createMessageLink(linkAddressHttped, linkString)
          var markdownLink = findMarkdownLink(linkPositions, text)
          var linkData = linkDataTemplate(markdownLink, messageLink, cacheKeyFromUrl, sharedAsHttpSecure)
          messageData.links.push(linkData)
          message = message.replace(markdownLink, messageLink, message)
        }
      }
    }
    // For future use
    // var threatUrls = getThreatUrlsList(messageData.links)
    // var lookupThreatEntries = setLookupThreatEntries(threatUrls)
    // var lookupBody = setLookupBody(lookupThreatEntries)
    var threatMatches = mockSafeBrowseReponse
    messageData = setThreatTypes(messageData, threatMatches)
    messageData = setAllSharedAsHttpSecure(messageData)
    return messageData
  } else {
    return messageData
  }
}

module.exports = {
  format,
  devFormat
}
