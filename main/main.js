'use strict';


var express = require('express');
const bodyParser = require('body-parser');

const slack_oauth = require('./apps/slack/oauth.js');
const markdownlinks = require('./apps/markdownlinks/methods.js');
const config = require('./config.js');

const app = express();
const path = require('path');

var __dirname;
const PORT = config.port;
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/oauth', (req, res) => {
    slack_oauth(req, res);
});

app.post('/publish', (req, res) => {
    markdownlinks.data.publish(req.body, res);
});

app.listen(PORT);
