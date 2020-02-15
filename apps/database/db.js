'use strict'

const MongoClient = require('mongodb').MongoClient
const process = require('process')

class DataBase {
  constructor () {
    this.clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`
  }

  saveTeam (teamId, accessTokenCipher) {
    /* send the team data to the database */
    this._client()
    this.client.connect(async (err) => {
      if (err) {
        console.error(`error connecting to database... ${err}`)
      } else {
        var teams = this.client.db('markdownlinksdb').collection('teams')
        await this._checkTeam(teamId, accessTokenCipher, teams)
        this.client.close()
      }
    })
  }

  _client () {
    this.client = MongoClient(this.clusterUri, { useNewUrlParser: true })
  }

  async _checkTeam (teamId, accessTokenCipher, teams) {
    /* look for an existing team record */
    var teamRecord = await teams.findOne({
      team_id: teamId
    })
    if (teamRecord) {
      await teams.findOneAndUpdate({
        team_id: teamId
      },
      {
        $set:
            { access_token_cipher: accessTokenCipher }
      })
    } else if (!teamRecord) {
      await teams.insertOne({
        team_id: teamId,
        access_token_cipher: accessTokenCipher
      })
    }
  }
}

module.exports = { DataBase }
