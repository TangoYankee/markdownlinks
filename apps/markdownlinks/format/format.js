const {setAllLinkPositions, validLinkPositions} = require('./link-positions')

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

const findMarkdownLink = (linkPositions, text) => {
  /* identify entire portion of markdown syntax */
  return text.slice(linkPositions[0], linkPositions[2] + 1)
}

const findLinkString = (linkPositions, text) => {
  /* identify text portion of hyperlink from message string */
  return text.slice(linkPositions[0] + 1, linkPositions[1])
}

const checkLinkString = (linkString) => {
  /* link string cannot be blank or only spaces */
  var linkStringTrim = linkString.trim()
  if (linkStringTrim) {
    return true
  } else {
    return false
  }
}

const findLinkAddress = (linkPositions, text) => {
  /* identify url portion of link from message string */
  return text.slice(linkPositions[1] + 2, linkPositions[2])
}

const checkLinkAddress = (linkAddress) => {
  /* must fit the correct format of a url */
  var domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (linkAddress.match(domainRegex)) {
    return true
  } else {
    return false
  }
}

const httpLinkAddress = (linkAddress) => {
  /* ensure that each link has http or https in the url */
  if (linkAddress.startsWith('http://') || linkAddress.startsWith('https://')) {
    return linkAddress
  } else {
    return `https://${linkAddress}`
  }
}

const createMessageLink = (linkAddress, displayText) => {
  /* create slack syntax for text and url */
  return `<${linkAddress}|${displayText}>`
}

const replaceLink = (markdownLink, messageLink, message) => {
  /* identify and replace the hyperlink based on its exact structure */
  return message.replace(markdownLink, messageLink, message)
}

module.exports = {
  format,
  findMarkdownLink,
  httpLinkAddress,
  checkLinkString,
  checkLinkAddress
}
