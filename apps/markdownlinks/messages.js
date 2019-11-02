const { replaceLink } = require('./format/link-content')
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
  var threatTypes = messageData.threatTypes
  for (link of messageData.links){
    let markdownLink = messageData.links[0].markdownLink
    let messageLink = messageData.links[0].messageLink
    message = replaceLink(markdownLink, messageLink, message)
  }

  var allBlocks = []

  var messageBlock = {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `${message}`
    }
  }
  allBlocks.push(messageBlock)

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
    sharedContextBlock.elements.push(warnings.shared_without_https)
  }
  allBlocks.push(sharedContextBlock)

  var dividerBlock = {
    "type": "divider"
} 
 allBlocks.push(dividerBlock)

  var safeBrowseStatusBlock = {
    "type": "context",
    "elements": []
}
var threatBlock = {
  "type": "context",
  "elements": []
}
var threatTypes = messageData.threatTypes
if(messageData.safeBrowseSuccess){
  if (threatTypes){
    var safeBrowseStatus = warnings.safe_browse_status.suspected_threats_found
    for (threat of threatTypes){
      threatBlock.elements.push(warnings.safe_browse_threats[threat])
    }
  } else {
    var safeBrowseStatus = warnings.safe_browse_status.no_suspected_threats_found
  }
} else {
  var safeBrowseStatus = warnings.safe_browse_status.error_checking_safe_browse
}
safeBrowseStatusBlock.elements.push(safeBrowseStatus)
allBlocks.push(safeBrowseStatusBlock)
if (threatBlock.elements){
  allBlocks.push(threatBlock)
}

  return {
    "response_type": "in_channel",
    "blocks": allBlocks
  }
}

exports.data = messages
