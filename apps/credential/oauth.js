'use strict'

const process = require('process')
const queryString = require('querystring')
const request = require('request')
const { DataBase } = require('../database/db.js')
const { TokenEncryption } = require('./encryption')

class OAuth {
  constructor (req, res) {
    this.req = req
    this.res = res
    this.url = 'https://slack.com/api/oauth.v2.access'
    this.tokenEncryption = new TokenEncryption()
    this.dataBase = new DataBase()
  }

  checkQueryCode () {
    /* compose Slack credentials */
    if (!this.req.query.code) {
      this._resultError(500, 'oauth error with code 500')
    }
  }

  _resultError (resStatus, warning) {
    console.warn(warning)
    this.res.status(resStatus)
    this.res.redirect('/?' + this._resultMessage('error'))
  }

  _resultMessage (result) {
    return queryString.stringify({ message: result })
  }

  postOAuth () {
    /* recieve authorization */
    request.post({
      url: this.url,
      qs: this._oauthQueryString()
    },
    (error, response, body) => {
      if (error) {
        this.resultError(400, 'oauth failed to recieve authorization')
      } else {
        var bodyJson = JSON.parse(body)
        var teamId = bodyJson.team.id
        var accessTokenPlain = bodyJson.access_token
        if (teamId && accessTokenPlain) {
          this.database.saveTeam(teamId, this.tokenEncryption.encryptToken(accessTokenPlain))
          this.res.redirect('/?' + this._resultMessage('success'))
        } else {
          this._resultError(401, 'oauth failed to recieve team ID/access token')
        }
      }
    })
  }

  _oauthQueryString () {
    return {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: this.req.query.code
    }
  }
}

module.exports = { OAuth }
