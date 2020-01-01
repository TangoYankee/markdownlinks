const { setMessageData, setHyperTextData } = require('./message-object')
const { setAllHyperTextPositions, validHyperTextPositions } = require('./positions')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText,
  setAllSharedAsHttpSecure, setHttpDestUrl, setUrlDomainKey,
  setSharedAsHttpSecure
} = require('./content')
const { getCacheThreats, setCacheThreatTypes, postCacheThreats } = require('../cache/threats')
const { setSafeBrowseThreats, setSafeBrowseThreatTypes } = require('../safe-browse/safe-browse')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  var allHyperTextPositions = setAllHyperTextPositions(text)
  let messageData = setMessageData(text, userId)
  // console.log()
  if (allHyperTextPositions.length >= 1) {
    messageData = setHyperText(messageData, allHyperTextPositions, text)
    messageData = setAllSharedAsHttpSecure(messageData)
    messageData = getCache(messageData)
    messageData = await setSafeBrowse(messageData)
    // Refactor to length greater than or equal to one/ greater than zero
    if (messageData.links) {
      var postCacheThreatsStatus = postCacheThreats(messageData.links)
      if (postCacheThreatsStatus === false){
        console.error('error saving to cache')
      }
    }
    messageData = setNoneFound(messageData)
  }
  return messageData
}

const setHyperText = (messageData, allHyperTextPositions, text) => {
  /* destination urls, display text, and their meta data */
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
      }
    }
  }
  return messageData
}

const getCache = (messageData) => {
  /* reference threat urls that are already saved locally */
  var cacheThreats = getCacheThreats(messageData.links)
  if ( cacheThreats === undefined ){
    console.error('error retrieving cache values')
  } else {
    messageData = setCacheThreatTypes(messageData, cacheThreats)
  }
  return messageData
}

const setSafeBrowse = async (messageData) => {
  /* check whether url is a suspected threat by google safe browse api */
  var safeBrowseThreats = await setSafeBrowseThreats(messageData.links)
  if (safeBrowseThreats !== undefined) {
    if (safeBrowseThreats === 'error') {
      messageData.safeBrowseSuccess = false
    } else {
      messageData.safeBrowseSuccess = true
      messageData = setSafeBrowseThreatTypes(messageData, safeBrowseThreats)
    }
  }
  return messageData
}

const setNoneFound = (messageData) => {
  /* identify if there are links that are not suspected of threats */
  for (var link of messageData.links) {
    if (link.threatMatch === '') {
      var noneFoundInThreatTypes = messageData.threatTypes.includes('NONE_FOUND')
      if (!noneFoundInThreatTypes) {
        messageData.threatTypes.push('NONE_FOUND')
      }
    }
  }
  return messageData
}

module.exports = {
  setMessage,
  setHyperText,
  getCache,
  setSafeBrowse,
  setNoneFound
}
