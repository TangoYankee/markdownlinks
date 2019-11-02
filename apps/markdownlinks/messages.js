const { warnings } = require('../safe-browse/warnings')
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
  let message = messageData.message
  // var threatTypes = messageData.threatTypes
  for (var link of messageData.links) {
    var markdownLink = link.markdownLink
    let messageLink = link.messageLink
    var threatMatch = link.threatMatch
    if (threatMatch) {
      var threatEmoji = warnings.safe_browse_threats[threatMatch].emoji
      messageLink = `${messageLink}:${threatEmoji}:` // function to 'append emoji'
    }
    var sharedAsHttpSecure = link.sharedAsHttpSecure
    if (!sharedAsHttpSecure) {
      var httpSecureEmoji = warnings.shared_without_https.emoji
      messageLink = `${messageLink}:${httpSecureEmoji}:`
    }
    message = message.replace(markdownLink, messageLink, message)
  }

  var allBlocks = []
  var messageBlock = messageTemplate(message)
  allBlocks.push(messageBlock)
  var sharedContextBlock = sharedContextTemplate(messageData)
  allBlocks.push(sharedContextBlock)
  var dividerBlock = dividerTemplate()
  allBlocks.push(dividerBlock)
  var safeBrowseStatus = setSafeBrowseStatus(messageData)
  var safeBrowseStatusBlock = safeBrowseStatusTemplate(safeBrowseStatus)
  allBlocks.push(safeBrowseStatusBlock)

  var threatBlock = {
    "type": "context",
    "elements": []
  }

  if (messageData.safeBrowseSuccess) {
    var threatTypes = messageData.threatTypes
    if (threatTypes) {
      for (var threat of threatTypes) {
        var threatWarning = warningTemplate(warnings.safe_browse_threats[threat])
        threatBlock.elements.push(threatWarning)
      }
    }
  }
  if (threatBlock.elements) {
    allBlocks.push(threatBlock)
  }

  return {
    "response_type": "in_channel",
    "blocks": allBlocks
  }
}

const messageTemplate = (message) => {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `${message}`
    }
  }
}

const warningTemplate = (warning) => {
  return {
    "type": "mrkdwn",
    "text": `:${warning.emoji}: ${warning.text}`
  }
}

const sharedContextTemplate = (messageData) => {
  var sharedContextBlock = {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": `-shared by @${messageData.sharedBy}`
      }
    ]
  }
  if (!messageData.allSharedAsHttpSecure) {
    var httpsWarning = warningTemplate(warnings.shared_without_https)
    sharedContextBlock.elements.push(httpsWarning)
  }
  return sharedContextBlock
}

const dividerTemplate = () => {
  return {
    "type": "divider"
  }
}

const setSafeBrowseStatus = (messageData) => {
  var safeBrowseStatus = warnings.safe_browse_status
  if (messageData.safeBrowseSuccess) {
    if (messageData.threatTypes) {
      return safeBrowseStatus.suspected_threats_found
    } else {
      return safeBrowseStatus.no_suspected_threats_found
    }
  } else {
    return safeBrowseStatus.error_checking_safe_browse
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

exports.data = messages
