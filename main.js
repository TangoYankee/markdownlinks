'use strict'
const bodyParser = require('body-parser')
const express = require('express')
const { publish } = require('./apps/messages/methods')
const { oauth } = require('./apps/credential/oauth')
const { signature } = require('./apps/credential/signature')
const { cacheStart } = require('./apps/cache/cache')

var app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  /* home page viewable from web browser */
  var message = req.query.message
  res.render('index', { message: message })
})

app.get('/oauth', (req, res) => {
  /* oauth with Slack */
  oauth(req, res)
})

app.post('/publish', (req, res) => {
  /* send message in response to user input from slash command */
  var currentTime = Math.floor(new Date().getTime() / 1000)
  if (signature(req, currentTime)) {
    publish(req.body, res)
  } else {
    res.status(400).send('Ignore this request')
  }
})

app.use((req, res, next) => {
  /* render 404 message on home page */
  res.status(404).render('index', { message: 'page-not-found' })
})

cacheStart((err) => {
  /* threat cache */
  if (err) {
    console.log(err)
  }
})

const port = 4390
app.listen(port)
