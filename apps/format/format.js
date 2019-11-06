const { setAllHyperTextPositions, validHyperTextPositions } = require('./link-positions')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText, setAllSharedAsHttpSecure,
  setHttpDestUrl, setUrlDomainKey, setSharedAsHttpSecure
} = require('./link-content')
const { safeBrowse } = require('../safe-browse/safe-browse')

const format = (text, userId) => {
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
          message = message.replace(markdownHyperText, slackHyperText, message)
        }
      }
    }
    messageData = setAllSharedAsHttpSecure(messageData)
    messageData = safeBrowse(messageData)
    return messageData
  } else {
    return messageData
  }
}

const setMessageData = (text, userId) => {
  return {
    "message": text,
    "sharedBy": userId,
    "safeBrowseSuccess": true,
    "allSharedAsHttpSecure": true,
    "threatTypes": [],
    "links": []
  }
}

const setHyperTextData = (markdownHyperText, slackHyperText, cacheKeyFromUrl, sharedAsHttpSecure) => {
  return {
    "cacheKeyFromUrl": cacheKeyFromUrl,
    "cacheDuration": "",
    "markdownLink": markdownHyperText,
    "messageLink": slackHyperText,
    "sharedAsHttpSecure": sharedAsHttpSecure,
    "threatMatch": ""
  }
}

module.exports = {
  format,
  devFormat
}
