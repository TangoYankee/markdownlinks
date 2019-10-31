const { setAllLinkPositions, validLinkPositions } = require('./link-positions')
const {
  checkLinkAddress, checkLinkString, createMessageLink,
  findLinkAddress, findLinkString, findMarkdownLink,
  httpLinkAddress, replaceLink
} = require('./link-content')

const format = (text) => {
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
          message = replaceLink(markdownLink, messageLink, message)
        }
      }
    }
    return message
  } else {
    return text
  }
}

module.exports = {
  format
}
