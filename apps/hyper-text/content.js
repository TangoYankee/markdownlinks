const validateDestUrl = (linkAddress) => {
  /* must fit the correct format of a url */
  var domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (linkAddress.match(domainRegex)) {
    return true
  } else {
    return false
  }
}

const validateDisplayText = (displayText) => {
  /* link string cannot be blank or only spaces */
  var displayTextTrim = displayText.trim()
  if (displayTextTrim) {
    return true
  } else {
    return false
  }
}

const setSlackHyperText = (linkAddress, displayText) => {
  /* slack hypertext syntax for urls and text */
  return `<${linkAddress}|${displayText}>`
}

const setDestUrl = (linkPositions, text) => {
  /* identify url portion of link from message string, lowercase and without padding spaces */
  let destUrl = text.slice(linkPositions[1] + 2, linkPositions[2])
  destUrl = destUrl.trim()
  destUrl = destUrl.toLowerCase()
  return destUrl
}

const setDisplayText = (linkPositions, text) => {
  /* identify text portion of hyperlink from message string */
  return text.slice(linkPositions[0] + 1, linkPositions[1])
}

const getMarkdownHyperText = (linkPositions, text) => {
  /* identify entire portion of markdown syntax from original user input */
  return text.slice(linkPositions[0], linkPositions[2] + 1)
}

const setHttpDestUrl = (linkAddress) => {
  /* each link has http or https in the url */
  if (linkAddress.startsWith('http://') || linkAddress.startsWith('https://')) {
    return linkAddress
  } else {
    return `https://${linkAddress}`
  }
}

const setUrlDomainKey = (unhttpedLinkAddress) => {
  /* remove http(s) and www for consistency across safe browse, cache, and multiple user requests */
  var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
  return unhttpedLinkAddress.replace(domainPrefixRegex, '')
}

const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
  /* url was originally prefaced with 'https' */
  return unhttpedLinkAddress.startsWith('https://')
}

const setAllSharedAsHttpSecure = (messageData) => {
  /* all urls were originally prefaced with 'https' */
  messageData.allSharedAsHttpSecure = true
  for (var link in messageData.links) {
    if (!link.sharedAsHttpSecure) {
      messageData.allSharedAsHttpSecure = false
    }
  }
  return messageData
}

module.exports = {
  validateDestUrl,
  validateDisplayText,
  setSlackHyperText,
  setDestUrl,
  setDisplayText,
  getMarkdownHyperText,
  setHttpDestUrl,
  setUrlDomainKey,
  setSharedAsHttpSecure,
  setAllSharedAsHttpSecure
}
