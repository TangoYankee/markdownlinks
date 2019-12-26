'use strict'
const bodyParser = require('body-parser')
const express = require('express')
const { publish, remove } = require('./apps/messages/methods')
const { oauth } = require('./apps/credential/oauth')
const { signature } = require('./apps/credential/signature')

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

app.post('/delete', (req, res) => {  
  var currentTime = Math.floor(new Date().getTime() / 1000)
  if (signature(req, currentTime)){
    remove(req.body, res)
  } else {
    res.status(400).send('Ingore this request')
  }
})

app.use((req, res, next) => {
  /* render 404 message on home page */
  res.status(404).render('index', { message: 'page-not-found' })
})

const port = 4390
app.listen(port)
