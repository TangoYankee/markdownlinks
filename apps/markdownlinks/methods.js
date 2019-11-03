const request = require('request')
const { format } = require('./format.js')
const messages = require('./messages/messages.js')
const methods = {}

methods.publish = (requestBody, res) => {
  /* control the workflow of a response to a slash command */
  var text = requestBody.text
  var responseUrl = requestBody.response_url
  var userId = requestBody.user_id
  if (checkHelp(text)) {
    res.json(messages.data.helpMessage(userId))
  } else if (text) {
    res.send()
    var formattedText = format(text)
    var markdownMessage = messages.data.markdownMessage(formattedText, userId)
    postMessage(responseUrl, markdownMessage)
  } else {
    res.json(messages.data.errorMessage(':warning:please provide input'))
  }
}

const checkHelp = (text) => {
  /* if the user inputted only 'help', they will recieve a help message */
  text = text.trim()
  text = text.toLowerCase()
  return text === 'help'
}

const postMessage = (responseUrl, responseMessage) => {
  /* send a reply to a message generated by a slack slash command */
  request.post({
    url: responseUrl,
    body: responseMessage,
    json: true
  }, function (error, response, body) {
    if (error) {
      console.log(`Error: ${error}`)
    } else {
      console.log(`Body: ${body}, Response ${response}`)
    }
  })
}

exports.data = methods
