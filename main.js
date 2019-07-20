'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const slack_oauth = require('./apps/slack/oauth.js');
const markdownlinks = require('./apps/markdownlinks/methods.js');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    /*home page viewable from web browser*/
    res.render('index');
});


app.get('/oauth', (req, res) => {
    /*OAuth with Slack*/
    slack_oauth(req, res);
});


app.post('/publish', (req, res) => {
    /*Send message in response to user input from slash command*/
    // Check whether the request came from Slack
    // if(signature){markdownlinks.data.publish(req.body, res);}
    // else{ignore}
    console.log(req.body);
    console.log(req.headers);
    markdownlinks.data.publish(req.body, res);
});


const port = 4390;
app.listen(port);
