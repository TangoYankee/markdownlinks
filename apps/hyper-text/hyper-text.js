const { setAllHyperTextPositions, validHyperTextPositions } = require('./positions')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText, setAllSharedAsHttpSecure,
  setHttpDestUrl, setUrlDomainKey, setSharedAsHttpSecure
} = require('./content')
const { getCacheThreats } = require('../cache/threats')
const { safeBrowse } = require('../safe-browse/safe-browse')

const hyperText = (text) => {
  /* receive markdown hypertext syntax, return slack hypertext syntax */
  var allHyperTextPositions = setAllHyperTextPositions(text)
  if (allHyperTextPositions) {
    let message = text
    for (var hyperTextPosition of allHyperTextPositions) {
      if (validHyperTextPositions(hyperTextPosition)) {
        var displayText = setDisplayText(hyperTextPosition, text)
        var destUrl = setDestUrl(hyperTextPosition, text)
        if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
          var httpDestUrl = setHttpDestUrl(destUrl)
          var slackHyperText = setSlackHyperText(httpDestUrl, displayText)
          var markdownHyperText = getMarkdownHyperText(hyperTextPosition, text)
          message = message.replace(markdownHyperText, slackHyperText, message)
        }
      }
    }
    return message
  } else {
    return text
  }
}

// Refactor to 'link-object'
const devFormat = (text, userId) => {
  var allHyperTextPositions = setAllHyperTextPositions(text)
  let messageData = setMessageData(text, userId)
  if (allHyperTextPositions) {
    let message = text
    for (var hyperTextPosition of allHyperTextPositions) {
      if (validHyperTextPositions(hyperTextPosition)) {
        var displayText = setDisplayText(hyperTextPosition, text)
        var destUrl = setDestUrl(hyperTextPosition, text)
        if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
          var urlDomainKey = setUrlDomainKey(destUrl)
          var sharedAsHttpSecure = setSharedAsHttpSecure(destUrl)
          var httpDestUrl = setHttpDestUrl(destUrl)
          var slackHyperText = setSlackHyperText(httpDestUrl, displayText)
          var markdownHyperText = getMarkdownHyperText(hyperTextPosition, text)
          var hyperTextData = setHyperTextData(markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure)
          messageData.links.push(hyperTextData)
          message = message.replace(markdownHyperText, slackHyperText, message) // Don't replace the original text until the link is checked for threats
        }
      }
    }
    messageData = setAllSharedAsHttpSecure(messageData)
    // Check cache
    cacheThreats = getCacheThreats(messageData.links)
    // send cache Threats and messageData to safebrowse, to parse through data
    // Check safe browse for links not found in cache
    messageData = safeBrowse(messageData, cacheThreats)
    return messageData
  } else {
    return messageData
  }
}

const setMessageData = (text, userId) => {
  return {
    message: text,
    sharedBy: userId,
    safeBrowseSuccess: false,
    allSharedAsHttpSecure: false,
    threatTypes: [],
    links: []
  }
}

const setHyperTextData = (markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure) => {
  return {
    urlDomainKey: urlDomainKey,
    cacheDuration: '',
    markdownLink: markdownHyperText,
    messageLink: slackHyperText,
    sharedAsHttpSecure: sharedAsHttpSecure,
    threatMatch: ''
  }
}

module.exports = {
  hyperText,
  devFormat
}
