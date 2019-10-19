const findLinkString = (linkPositions, text) => {
    /* identify text portion of hyperlink from message string */
    return text.slice(linkPositions[0] + 1, linkPositions[1])
  }

const findLinkAddress = (linkPositions, text) => {
    /* identify url portion of link from message string */
    return text.slice(linkPositions[1] + 2, linkPositions[2])
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

const checkLinkAddress = (linkAddress) => {
    /* unhttpedLinkAddress cannot blank or contains a space in the url itself */
    var linkAddressTrim = linkAddress.trim()
    var linkAddressSpace = linkAddressTrim.includes(' ')
    if (linkAddressTrim && !linkAddressSpace) {
      return true
    } else {
      return false
    }
  }

const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
    return unhttpedLinkAddress.includes('https://')
}

const httpLinkAddress = (linkAddress) => {
    /* ensure that each link has http or https in the url */
    var lowerCaseAddress = linkAddress.toLowerCase()
    if (lowerCaseAddress.includes('http://') || lowerCaseAddress.includes('https://')) {
      return linkAddress
    } else {
      return `https://${linkAddress}`
    }
  }

const createMessageLink = (linkAddress, displayText) => {
    /* create slack syntax for text and url */
    return `<${linkAddress}|${displayText}>`
  }

const findMarkdownLink = (linkPositions, text) => {
    /* identify entire portion of markdown syntax */
    return text.slice(linkPositions[0], linkPositions[2] + 1)
  }

const replaceLink = (markdownLink, messageLink, message) => {
    /* identify and replace the hyperlink based on its exact structure */
    return message.replace(markdownLink, messageLink, message)
  }

const setCacheKeyFromUrl = (unhttpedLinkAddress) => {
    /* remove http(s) and www */
    var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return unhttpedLinkAddress.replace(domainPrefixRegex, '')
}

module.exports = {
    findLinkString,
    findLinkAddress,
    checkLinkString,
    checkLinkAddress,
    setSharedAsHttpSecure,
    httpLinkAddress,
    createMessageLink,
    findMarkdownLink,
    replaceLink,
    setCacheKeyFromUrl
}
