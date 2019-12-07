const request = require('request')
const { hyperText, setMessage } = require('../hyper-text/hyper-text.js')

const { setHelpMessage, setMarkdownMessage, setDevMarkdownMessage, setErrorMessage } = require('./messages.js')

const publish = (requestBody, res) => {
  /* respond to a slash command */
  var text = requestBody.text
  var responseUrl = requestBody.response_url
  var userId = requestBody.user_id
  if (checkHelp(text)) {
    res.json(setHelpMessage(userId))
  } else if (text) {
    res.send()
    var message = setMessage(text, userId)
    var devMarkDownMessage = setDevMarkDownMessage(message)
    postMessage(responseUrl, devMarkDownMessage)
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

const postMessage = (responseUrl, responseMessage) => {
  /* send a reply message */
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

module.exports = {
  publish
}
