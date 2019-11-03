const { sharedWithoutHttpsData, safeBrowseStatusData, safeBrowseThreatsData } = require('../../safe-browse/warnings')
const { contextTemplate, dividerTemplate, mrkdwnTemplate, responseHeadTemplate } = require('./block-templates')

const appendEmoji = (messageLink, emoji) => {
    return `${messageLink}:${emoji}:`
  }

  const messageLogic = (messageData) => {
    let message = messageData.message
    for (var link of messageData.links) {
      var markdownLink = link.markdownLink
      let messageLink = link.messageLink
      var threatMatch = link.threatMatch
      if (threatMatch) {
        var threatEmoji = safeBrowseThreatsData[threatMatch].emoji
        messageLink = appendEmoji(markdownLink, threatEmoji)
      }
      var sharedAsHttpSecure = link.sharedAsHttpSecure
      if (!sharedAsHttpSecure) {
        var httpSecureEmoji = sharedWithoutHttpsData.emoji
        messageLink = appendEmoji(messageLink, httpSecureEmoji)
      }
      message = message.replace(markdownLink, messageLink, message)
    }
    return message
  }

const setSafeBrowseStatus = (messageData) => {
    if (messageData.safeBrowseSuccess) {
      if (messageData.threatTypes) {
        return safeBrowseStatusData.suspected_threats_found
      } else {
        return safeBrowseStatusData.no_suspected_threats_found
      }
    } else {
      return safeBrowseStatusData.error_checking_safe_browse
    }
  }

  const setSharedByText = (sharedBy) => {
    return `-shared by @${sharedBy}`
}

const setWarningText = (warning) => {
    return `:${warning.emoji}: ${warning.text}`
}

const sharedContextLogic = (sharedContextBlock, messageData) => {
    if (!messageData.allSharedAsHttpSecure) {
      var httpsWarningText = setWarningText(sharedWithoutHttpsData)
      var httpsWarning = mrkdwnTemplate(httpsWarningText)
      sharedContextBlock.elements.push(httpsWarning)
    }
    return sharedContextBlock
  }

const threatLogic = (threatBlock, threatTypes) => {
    if (threatTypes) {
      for (var threat of threatTypes) {
        var threatWarningText = setWarningText(safeBrowseThreatsData[threat])
        var threatWarning = mrkdwnTemplate(threatWarningText)
        threatBlock.elements.push(threatWarning)
      }
      return threatBlock
    } else {
      return null
    }
  }

module.exports = {
    appendEmoji,
    setSafeBrowseStatus,
    setSharedByText,
    setWarningText,
    messageLogic,
    sharedContextLogic,
    threatLogic
}
