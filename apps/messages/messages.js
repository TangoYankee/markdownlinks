const { contextTemplate, dividerTemplate, mrkdwnTemplate, responseHeadTemplate, sectionTemplate } = require('./block-templates')
const { messageLogic, setSafeBrowseStatus, setWarningText, sharedContextLogic, threatLogic } = require('./block-contructor')

const setHelpMessage = (userId) => {
  /* in message usage instructions */
  var blocks = []

  var welcomeMrkdwn = mrkdwnTemplate(`:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`)
  var welcomeSection = sectionTemplate(welcomeMrkdwn)
  blocks.push(welcomeSection)

  var exampleInputMrkdwn = mrkdwnTemplate('*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._')
  var exampleInputSection = sectionTemplate(exampleInputMrkdwn)
  blocks.push(exampleInputSection)

  var exampleOutputMrkdwn = mrkdwnTemplate('*returned message*\n _create <https://markdownguide.org/|nice links>._')
  var exampleOutputSection = sectionTemplate(exampleOutputMrkdwn)
  blocks.push(exampleOutputSection)

  blocks.push(dividerTemplate())

  var homepageMrkdwn = mrkdwnTemplate('visit https://markdownlinks.io')
  var homepageContext = contextTemplate()
  homepageContext.elements.push(homepageMrkdwn)
  blocks.push(homepageContext)

  return responseHeadTemplate('ephemeral', blocks)
}

const setErrorMessage = () => {
  /* handle out of bounds cases */
  var blocks = []

  var suggestionMrkdwn = mrkdwnTemplate(':warning:please provide input text')
  var suggestionSection = sectionTemplate(suggestionMrkdwn)
  blocks.push(suggestionSection)

  var instructionsMrkdwn = mrkdwnTemplate('*For instructions, write...* _/markdownlinks help_')
  var instructionsSection = sectionTemplate(instructionsMrkdwn)
  blocks.push(instructionsSection)

  return responseHeadTemplate('ephemeral', blocks)
}

const setMarkdownMessage = (markdownFormat, userId) => {
  /* formatted hyperlinks in slack message */
  var blocks = []

  var messageMrkdwn = mrkdwnTemplate(markdownFormat)
  var messageSection = sectionTemplate(messageMrkdwn)
  blocks.push(messageSection)

  var userContextMrkdwn = mrkdwnTemplate(`-shared by <@${userId}>`)
  var userContextSection = contextTemplate()
  userContextSection.elements.push(userContextMrkdwn)
  blocks.push(userContextSection)

  return responseHeadTemplate('in_channel', blocks)
}

const devMarkdownMessage = (messageData) => {
  /* compose markdown message */
  var blocks = []

  var message = messageLogic(messageData)
  var messageMrkdwn = mrkdwnTemplate(message)
  var messageBlock = sectionTemplate(messageMrkdwn)
  blocks.push(messageBlock)

  var sharedBy = messageData.sharedBy
  var sharedByText = `-shared by @${sharedBy}`
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

  return responseHeadTemplate('in_channel', blocks)
}

module.exports = {
  setHelpMessage,
  setErrorMessage,
  setMarkdownMessage,
  devMarkdownMessage
}
