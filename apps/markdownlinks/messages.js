const { sharedWithoutHttpsData, safeBrowseStatusData, safeBrowseThreatsData } = require('../safe-browse/warnings')
var messages = {}

messages.helpMessage = (userId) => {
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*returned message*\n _create <https://markdownguide.org/|nice links>._"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "visit https://markdownlinks.io"
          }
        ]
      }
    ]
  }
}

messages.errorMessage = () => {
  return {
    "response_type": "ephemeral",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":warning:please provide input text"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*For instructions, write...* _/markdownlinks help_"
        }
      }
    ]
  }
}

messages.markdownMessage = (markdownFormat, userId) => {
  return {
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `${markdownFormat}`
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `-shared by <@${userId}>`
          }
        ]
      }
    ]
  }
}

messages.devMarkdownMessage = (messageData) => {
  /* compose markdown message */
  var blocks = []

  var message = messageLogic(messageData)
  var messageBlock = sectionTemplate(message)
  blocks.push(messageBlock)

  let sharedContextBlock = sharedContextTemplate(messageData)
  sharedContextBlock = sharedContextLogic(sharedContextBlock, messageData)
  blocks.push(sharedContextBlock)

  blocks.push(dividerTemplate())

  var safeBrowseStatus = setSafeBrowseStatus(messageData)
  var safeBrowseStatusBlock = safeBrowseStatusTemplate(safeBrowseStatus)
  blocks.push(safeBrowseStatusBlock)

  let threatBlock = contextTemplate()
  if (messageData.safeBrowseSuccess) {
    threatBlock = threatLogic(threatBlock, messageData.threatTypes)
    if (threatBlock) {
      blocks.push(threatBlock)
    }
  }

  return inChannelHeadTemplate(blocks)
}

const inChannelHeadTemplate = (blocks) => {
  return {
    "response_type": "in_channel",
    "blocks": blocks
  }
}

const contextTemplate = () => {
  return {
    "type": "context",
    "elements": []
  }
}

const sectionTemplate = (text) => {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": text
    }
  }
}

const dividerTemplate = () => {
  return {
    "type": "divider"
  }
}

const warningTemplate = (warning) => {
  return {
    "type": "mrkdwn",
    "text": `:${warning.emoji}: ${warning.text}`
  }
}

const sharedContextTemplate = (messageData) => {
  return {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": `-shared by @${messageData.sharedBy}`
      }
    ]
  }
}

const safeBrowseStatusTemplate = (safeBrowseStatus) => {
  return {
    "type": "context",
    "elements": [
      warningTemplate(safeBrowseStatus)
    ]
  }
}

const threatLogic = (threatBlock, threatTypes) => {
  if (threatTypes) {
    for (var threat of threatTypes) {
      var threatWarning = warningTemplate(safeBrowseThreatsData[threat])
      threatBlock.elements.push(threatWarning)
    }
    return threatBlock
  } else {
    return null
  }
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

const sharedContextLogic = (sharedContextBlock, messageData) => {
  if (!messageData.allSharedAsHttpSecure) {
    var httpsWarning = warningTemplate(sharedWithoutHttpsData)
    sharedContextBlock.elements.push(httpsWarning)
  }
  return sharedContextBlock
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

const appendEmoji = (messageLink, emoji) => {
  return `${messageLink}:${emoji}:`
}

exports.data = messages
