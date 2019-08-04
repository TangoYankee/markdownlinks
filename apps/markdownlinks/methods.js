var request = require('request');
var messages = require('./messages.js');
const { format } = require('./format.js');
var methods = {};


methods.publish = (request_body, res) => {
    /*control the workflow of a response to a slash command*/
    var text = request_body.text;
    var response_url = request_body.response_url;
    var user_id = request_body.user_id;
    if (checkHelp(text)) {
        res.json(messages.data.helpMessage(user_id));
    } else if (text) {
        res.send()
        formatted_text = format(text);
        markdown_message = messages.data.markdownMessage(formatted_text, user_id);
        postMessage(response_url, markdown_message);
    } else {
        res.json(messages.data.errorMessage(":warning:please provide input"))
    }
}


checkHelp = (text) => {
    /*if the user inputted only 'help', they will recieve a help message*/
    text = text.trim();
    text = text.toLowerCase();
    return text == "help";
}

postMessage = (response_url, response_message) => {
    /*send a reply to a message generated by a slack slash command*/
    request.post({
        url: response_url,
        body: response_message,
        json: true,
    }, function (error, response, body) { //TODO? refactor to send to proper logging
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            console.log(`Body: ${body}, Response ${response}`);
        }
    })
}


exports.data = methods;
