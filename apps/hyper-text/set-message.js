'use strict'

const { setMessageData, setHyperTextData } = require('./message-object')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText,
  setAllSharedAsHttpSecure, setHttpDestUrl, setUrlDomainKey,
  setSharedAsHttpSecure, getRawMarkdownHyperTexts
} = require('./content')
const { getCacheThreats, setCacheThreatTypes, postCacheThreats } = require('../cache/threats')
const { setSafeBrowseThreats, setSafeBrowseThreatTypes } = require('../safe-browse/safe-browse')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  let messageData = setMessageData(text, userId)
  messageData = setHyperText(messageData, text)
  messageData = setAllSharedAsHttpSecure(messageData)
  messageData = getCache(messageData)
  messageData = await setSafeBrowse(messageData)
  if (messageData.links.length > 0) {
    var postCacheThreatsStatus = postCacheThreats(messageData.links)
    if (postCacheThreatsStatus === false) {
      console.error('error saving to cache')
    }
  }
  messageData = setNoneFound(messageData)
  return messageData
}

const setHyperText = (messageData, text) => {
  /* destination urls, display text, and their meta data */
  var rawMarkdownHyperTexts = getRawMarkdownHyperTexts(text)
  if (rawMarkdownHyperTexts !== null) {
    for (var rawMarkdownHyperText of rawMarkdownHyperTexts) {
      // console.log(`rawmarkdownhypertext: ${rawMarkdownHyperText}`)
      var markdownHyperText = getMarkdownHyperText(rawMarkdownHyperText)
      // console.log(`markdownhypertext: ${markdownHyperText}`)
      var displayText = setDisplayText(markdownHyperText)
      // console.log(`display text: ${displayText}`)
      var destUrl = setDestUrl(markdownHyperText)
      // console.log(`desturl ${destUrl}`)
      if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
        var urlDomainKey = setUrlDomainKey(destUrl)
        var sharedAsHttpSecure = setSharedAsHttpSecure(destUrl)
        var httpDestUrl = setHttpDestUrl(destUrl)
        var slackHyperText = setSlackHyperText(httpDestUrl, displayText)
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
  if (cacheThreats === undefined) {
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
