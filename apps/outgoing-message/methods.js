'use strict'

const request = require('request')
const { setIncomingMessage } = require('../message/set-message')

const {
  setHelpMessage, setMarkdownMessage,
  setErrorMessage, setRemovedMessage
} = require('./messages.js')

const publish = async (requestBody, res) => {
  /* respond to a slash command */
  var text = requestBody.text
  var responseUrl = requestBody.response_url
  var userId = requestBody.user_id
  if (checkHelp(text)) {
    res.json(setHelpMessage(userId))
  } else if (text) {
    res.send()
    var incomingMessage = await setIncomingMessage(text, userId)
    var markdownMessage = setMarkdownMessage(incomingMessage)
    postMessage(responseUrl, markdownMessage)
  } else {
    res.json(setErrorMessage(':warning:please provide input'))
  }
}

const checkHelp = (text) => {
  /* if the user inputted only 'help', they will recieve a help message */
  text = text.trim()
  text = text.toLowerCase()
  return text === 'help'
}

const remove = (requestBody, res) => {
  /* delete the markdown message sending the request */
  res.send()
  var responseUrl = requestBody.response_url
  // var responseMessage = setRemovedMessage()
  postMessage(responseUrl, responseMessage)
}

const postMessage = (responseUrl, responseMessage) => {
  /* send a reply message */
  request.post({
    url: responseUrl,
    body: responseMessage,
    json: true
  }, function (error, response, body) {
    if (error) {
      console.error(`error posting blocks to slack: ${error}`)
    }
  })
}

module.exports = {
  publish,
  remove
}
