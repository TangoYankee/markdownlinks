'use strict'

const {
  contextTemplate, dividerTemplate, mrkdwnTemplate,
  responseHeadTemplate, sectionTemplate, removeButtonTemplate,
  messageRemovedTemplate
} = require('./block-templates')
const {
  messageLogic, setWarningText, sharedContextLogic,
  threatLogic, setSafeBrowseWarningData
} = require('./block-contructor')

// const setHelpMessage = (userId) => {
//   /* in message usage instructions */
//   // var blocks = []

//   // var welcomeMrkdwn = mrkdwnTemplate(`:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`)
//   // var welcomeSection = sectionTemplate(welcomeMrkdwn)
//   blocks.push(welcomeSection)

//   // var exampleInputMrkdwn = mrkdwnTemplate('*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._')
//   // var exampleInputSection = sectionTemplate(exampleInputMrkdwn)
//   // blocks.push(exampleInputSection)

//   // var exampleOutputMrkdwn = mrkdwnTemplate('*returned message*\n _create <https://markdownguide.org/|nice links>._')
//   // var exampleOutputSection = sectionTemplate(exampleOutputMrkdwn)
//   // blocks.push(exampleOutputSection)

//   blocks.push(dividerTemplate())

//   // var homepageMrkdwn = mrkdwnTemplate('visit https://markdownlinks.io')
//   // var homepageContext = contextTemplate()
//   // homepageContext.elements.push(homepageMrkdwn)
//   // blocks.push(homepageContext)

//   return responseHeadTemplate('ephemeral', blocks)
// }

// const setErrorMessage = () => {
//   /* handle out of bounds cases */
//   var blocks = []

//   var suggestionMrkdwn = mrkdwnTemplate(':warning:please provide input text')
//   var suggestionSection = sectionTemplate(suggestionMrkdwn)
//   blocks.push(suggestionSection)

//   var instructionsMrkdwn = mrkdwnTemplate('*For instructions, write...* _/markdownlinks help_')
//   var instructionsSection = sectionTemplate(instructionsMrkdwn)
//   blocks.push(instructionsSection)

//   return responseHeadTemplate('ephemeral', blocks)
// }

const setMarkdownMessage = (messageData) => {
  /* compose markdown message */
  var blocks = []

  var message = messageLogic(messageData)
  var messageMrkdwn = mrkdwnTemplate(message)
  var messageBlock = sectionTemplate(messageMrkdwn)
  blocks.push(messageBlock)

  // var sharedBy = messageData.sharedBy
  // var sharedByText = `-shared by <@${sharedBy}>`
  // var sharedByMrkdwn = mrkdwnTemplate(sharedByText)
  // let sharedContextBlock = contextTemplate()
  // sharedContextBlock.elements.push(sharedByMrkdwn)
  sharedContextBlock = sharedContextLogic(sharedContextBlock, messageData)
  blocks.push(sharedContextBlock)

  // blocks.push(dividerTemplate())

  var safeBrowseSuccess = messageData.safeBrowseSuccess
  if (!safeBrowseSuccess) {
    var safeBrowseStatusWarningData = setSafeBrowseWarningData()
    var safeBrowseStatusWarningText = setWarningText(safeBrowseStatusWarningData)
    var safeBrowseStatusWarning = mrkdwnTemplate(safeBrowseStatusWarningText)
    var safeBrowseStatusBlock = contextTemplate()
    safeBrowseStatusBlock.elements.push(safeBrowseStatusWarning)
    blocks.push(safeBrowseStatusBlock)
  }

  let threatBlock = contextTemplate()
  threatBlock = threatLogic(threatBlock, messageData.threatTypes, messageData.safeBrowseSuccess)
  if (threatBlock) {
    blocks.push(threatBlock)
  }
  var removeButtonBlock = removeButtonTemplate()
  blocks.push(removeButtonBlock)
  return responseHeadTemplate('in_channel', blocks)
}

// const setRemovedMessage = (text) => {
//   /* informs users a previous message has been removed from their workspace */
//   return messageRemovedTemplate(text)
// }

module.exports = {
  setHelpMessage,
  setErrorMessage,
  setMarkdownMessage,
  setRemovedMessage
}
