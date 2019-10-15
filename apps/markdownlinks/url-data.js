const { setAllLinkPositions, validLinkPositions } = require('./link-positions.js')

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

const setCacheKeyFromUrl = (unhttpedLinkAddress) => {
    /* remove http(s) and www */
    var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return unhttpedLinkAddress.replace(domainPrefixRegex, '')
}

const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
    return unhttpedLinkAddress.includes('https://')
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
  /* unhttpedLinkAddress cannot blank or contains a space in the url itself */
  var linkAddressTrim = linkAddress.trim()
  var linkAddressSpace = linkAddressTrim.includes(' ')
  if (linkAddressTrim && !linkAddressSpace) {
    return true
  } else {
    return false
  }
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

const replaceLink = (markdownLink, messageLink, message) => {
  /* identify and replace the hyperlink based on its exact structure */
  return message.replace(markdownLink, messageLink, message)
}

module.exports = {
  urlData,
  findMarkdownLink,
  httpLinkAddress,
  checkLinkString,
  checkLinkAddress
}
