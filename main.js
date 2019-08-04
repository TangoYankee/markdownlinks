"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const markdownlinks = require("./apps/markdownlinks/methods.js");
const { oauth, encrypt, decrypt } = require("./apps/slack/oauth.js");
const { signature } = require("./apps/slack/signature.js");

var app = express();
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  /* home page viewable from web browser */
  let message = req.query.message;
  res.render("index", { message: message });
});

app.get("/oauth", (req, res) => {
  /* oauth with Slack */
  oauth(req, res);
});

app.post("/publish", (req, res) => {
  /* send message in response to user input from slash command */
  let current_time = Math.floor(new Date().getTime() / 1000);
  if (signature(req, current_time)) {
    markdownlinks.data.publish(req.body, res);
  } else {
    res.status(400).send("Ignore this request");
  }
});

const port = 4390;
app.listen(port);
