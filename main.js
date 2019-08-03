'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { oauth, encrypt, decrypt}  = require('./apps/slack/oauth.js');
const { signature } = require('./apps/slack/signature.js');
const markdownlinks = require('./apps/markdownlinks/methods.js');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    /*home page viewable from web browser*/
    res.render('index', {message: "error"});
});


app.get('/oauth', (req, res) => {
    /*oAuth with Slack*/
    oauth(req, res);
});


app.post('/publish', (req, res) => {
    /*Send message in response to user input from slash command*/
    let current_time = Math.floor(new Date().getTime()/1000);
    if (signature(req, current_time)) {
        markdownlinks.data.publish(req.body, res);
    } else {
        res.status(400).send("Ignore this request");
    }
});


const port = 4390;
app.listen(port);
