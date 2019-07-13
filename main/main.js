const slack_oauth = require('./apps/slack/oauth.js');
const markdownlinks = require('./apps/markdownlinks/methods.js');
var config = require('./config.js');

var express = require('express');
const bodyParser = require('body-parser');

var app = express();
var path = require('path');
var __dirname;
const PORT = config.port;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'))
});

app.get('/oauth', (req, res) => {
    slack_oauth(req, res);
});

app.post('/publish', (req, res) => {
    markdownlinks.data.publish(req.body, res);
});

app.post('/delete' , (req, res) => {
    markdownlinks.data.delete(JSON.parse(req.body.payload), res);
})
