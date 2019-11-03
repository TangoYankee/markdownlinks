const checkLinkAddress = (linkAddress) => {
  /* must fit the correct format of a url */
  var domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (linkAddress.match(domainRegex)) {
    return true
  } else {
    return false
  }
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

const createMessageLink = (linkAddress, displayText) => {
  /* create slack syntax for text and url */
  return `<${linkAddress}|${displayText}>`
}

const findLinkAddress = (linkPositions, text) => {
  /* identify url portion of link from message string */
  return text.slice(linkPositions[1] + 2, linkPositions[2])
}

const findLinkString = (linkPositions, text) => {
  /* identify text portion of hyperlink from message string */
  return text.slice(linkPositions[0] + 1, linkPositions[1])
}

const findMarkdownLink = (linkPositions, text) => {
  /* identify entire portion of markdown syntax */
  return text.slice(linkPositions[0], linkPositions[2] + 1)
}

const httpLinkAddress = (linkAddress) => {
  /* ensure that each link has http or https in the url */
  if (linkAddress.startsWith('http://') || linkAddress.startsWith('https://')) {
    return linkAddress
  } else {
    return `https://${linkAddress}`
  }
}

const setCacheKeyFromUrl = (unhttpedLinkAddress) => {
  /* remove http(s) and www */
  var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
  return unhttpedLinkAddress.replace(domainPrefixRegex, '')
}

const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
  return unhttpedLinkAddress.startsWith('https://')
}

module.exports = {
  checkLinkAddress,
  checkLinkString,
  createMessageLink,
  findLinkAddress,
  findLinkString,
  findMarkdownLink,
  httpLinkAddress,
  setCacheKeyFromUrl,
  setSharedAsHttpSecure
}
