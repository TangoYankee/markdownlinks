const MongoClient = require('mongodb').MongoClient
const { checkTeam } = require('../db')
const { teamId, teamTokenOne, teamTokentwo } = require('../test-data/db-data')

describe('insert', () => {
  var connection
  var db

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    })
    db = await connection.db(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  it(
    'insert a team into the collection',
    async () => {
      var teams = db.collection('teams')
      await checkTeam(teamId, teamTokenOne, teams)
      var insertedTeam = await teams.findOne({ team_id: teamId })
      expect(teamTokenOne).toEqual(insertedTeam.access_token_cipher)
    })

  it(
    'update a team with a new token',
    async () => {
      var teams = db.collection('teams')
      var insertedTeam = await teams.findOne({ team_id: teamId })
      expect(teamTokenOne).toEqual(insertedTeam.access_token_cipher)
      await checkTeam(teamId, teamTokentwo, teams)
      var updatedTeam = await teams.findOne({ team_id: teamId })
      expect(teamTokentwo).toEqual(updatedTeam.access_token_cipher)
    })
})
