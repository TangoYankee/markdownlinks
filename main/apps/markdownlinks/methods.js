var request = require('request');
var messages = require('./messages.js');
var format = require('./format.js');
var methods = {};


methods.publish = (request_body, res) => {
    var text = request_body.text;
    var response_url = request_body.response_url;
    var user_id = request_body.user_id;
    if (checkHelp()) {
        res.json(messages.data.helpMessage(`welcome to markdownlinks, <@${user_id}>!`));
    } else if (text) {
        res.send()
        formatted_text = format(text);
        markdown_message = messages.data.markdownMessage(formatted_text);
        postMessage(response_url, markdown_message);
    } else {
        res.json(messages.data.helpMessage(":warning:please provide input"))
    }
}


checkHelp = (text) =>{
    text = text.trim();
    text = text.toLowerCase();
    return text == "help";
}


methods.delete = (response_payload, res) => {
    res.send();
    var value = response_payload.actions[0].value;
    var response_url = response_payload.response_url;
    if (value == "delete"){
        postMessage(response_url, messages.data.deleteMessage());
    } else {
        postMessage(messages.data.errorMessage());
    }
}


postMessage = (response_url, response_message) => {
    request.post({
        url: response_url,
        body: response_message,
        json: true,
    },function (error, response, body) {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            console.log(`Body: ${body}, Response ${response}`);
        }
    })
}


exports.data = methods;
