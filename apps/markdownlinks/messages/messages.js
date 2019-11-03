const { contextTemplate, dividerTemplate, mrkdwnTemplate, responseHeadTemplate, sectionTemplate } = require('./block-templates')
const { messageLogic, setSafeBrowseStatus, setSharedByText, setWarningText, sharedContextLogic, threatLogic } = require('./block-contructor')
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
  var messageMrkdwn = mrkdwnTemplate(message)
  var messageBlock = sectionTemplate(messageMrkdwn)
  blocks.push(messageBlock)

  var sharedBy = messageData.sharedBy
  var sharedByText = setSharedByText(sharedBy)
  var sharedByMrkdwn = mrkdwnTemplate(sharedByText)
  let sharedContextBlock = contextTemplate()
  sharedContextBlock.elements.push(sharedByMrkdwn)
  sharedContextBlock = sharedContextLogic(sharedContextBlock, messageData)
  blocks.push(sharedContextBlock)

  blocks.push(dividerTemplate())

  var safeBrowseStatus = setSafeBrowseStatus(messageData)
  var safeBrowseStatusWarningText = setWarningText(safeBrowseStatus)
  var safeBrowseStatusWarning = mrkdwnTemplate(safeBrowseStatusWarningText)
  var safeBrowseStatusBlock = contextTemplate()
  safeBrowseStatusBlock.elements.push(safeBrowseStatusWarning)
  blocks.push(safeBrowseStatusBlock)

  let threatBlock = contextTemplate()
  if (messageData.safeBrowseSuccess) {
    threatBlock = threatLogic(threatBlock, messageData.threatTypes)
    if (threatBlock) {
      blocks.push(threatBlock)
    }
  }

  return responseHeadTemplate("in_channel", blocks)
}

exports.data = messages
