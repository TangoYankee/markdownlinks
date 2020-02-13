'use strict'

const { Message } = require('./message')
const {
  validateDestUrl, validateDisplayText, setSlackHypertext,
  setDestUrl, setDisplayText, getMarkdownHyperText,
  setAllSharedAsHttpSecure, setHttpDestUrl, setUrlDomainKey,
  setSharedAsHttpSecure, getRawMarkdownHyperTexts
} = require('./content')
const { getCacheThreats, setCacheThreatTypes, postCacheThreats } = require('../cache/threats')
const { setSafeBrowseThreats, setSafeBrowseThreatTypes } = require('../safe-browse/safe-browse')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  var message = new Message(text, userId)
  // message.hypertexts = setHyperText(text)
  // message.setAllSharedAsHttpSecure = setAllSharedAsHttpSecure(message.hypertexts)
  message = getCache(message)
  message = await setSafeBrowse(message)
  if (message.hypertexts.length > 0) {
    var postCacheThreatsStatus = postCacheThreats(message.hypertexts)
    if (postCacheThreatsStatus === false) {
      console.error('error saving to cache')
    }
  }
  message = setNoneFound(message)
  return message
}

// Make part of the Message Object?
// const setHyperText = (text) => {
//   /* destination urls, display text, and their meta data */
//   var rawHypertextInputs = getRawMarkdownHyperTexts(text)
//   var hypertexts = []
//   if (rawHypertextInputs !== null) {
//     for (var rawHypertextInput of rawHypertextInputs) {
//       var refinedHypertextInput = getRefinedHypertextInput(rawHypertextInput)
//       var displayText = setDisplayText(refinedHypertextInput)
//       var destUrl = setDestUrl(refinedHypertextInput)
//       if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
//         var hypertext = new Hypertext(destUrl, displayText)
//         hypertexts.push(hypertext)
//       }
//     }
//   }
//   return hypertexts
// }

const getCache = (message) => {
  /* reference threat urls that are already saved locally */
  var cacheThreats = getCacheThreats(message.hypertexts)
  if (cacheThreats === undefined) {
    console.error('error retrieving cache values')
  } else {
    message = setCacheThreatTypes(message, cacheThreats)
  }
  return message
}

const setSafeBrowse = async (message) => {
  /* check whether url is a suspected threat by google safe browse api */
  var safeBrowseThreats = await setSafeBrowseThreats(message.hypertexts)
  if (safeBrowseThreats !== undefined) {
    if (safeBrowseThreats === 'error') {
      message.safeBrowseSuccess = false
    } else {
      message.safeBrowseSuccess = true
      message = setSafeBrowseThreatTypes(message, safeBrowseThreats)
    }
  }
  return message
}

const setNoneFound = (message) => {
  /* identify if there are links that are not suspected of threats */
  for (var link of message.hypertexts) {
    if (link.threatMatch === '') {
      var noneFoundInThreatTypes = message.threatTypes.includes('NONE_FOUND')
      if (!noneFoundInThreatTypes) {
        message.threatTypes.push('NONE_FOUND')
      }
    }
  }
  return message
}

module.exports = {
  setMessage,
  setHyperText,
  getCache,
  setSafeBrowse,
  setNoneFound
}
