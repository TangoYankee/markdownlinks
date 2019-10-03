const MongoClient = require('mongodb').MongoClient
const { checkTeam } = require('./db.js')

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

  const teamId = '1234567890'
  const teamTokenOne = 'qwertyasdfg'
  const teamTokentwo = 'plmoknijb'
  it('should insert a team into the collection', async () => {
    const teams = db.collection('teams')
    await checkTeam(teamId, teamTokenOne, teams)
    const insertedTeam = await teams.findOne({ teamId: teamId })
    expect(teamTokenOne).toEqual(insertedTeam.accessTokenCipher)
  })

  it('should update a team with a new token', async () => {
    const teams = db.collection('teams')
    const insertedTeam = await teams.findOne({ teamId: teamId })
    expect(teamTokenOne).toEqual(insertedTeam.accessTokenCipher)
    await checkTeam(teamId, teamTokentwo, teams)
    const updatedTeam = await teams.findOne({ teamId: teamId })
    expect(teamTokentwo).toEqual(updatedTeam.accessTokenCipher)
  })
})
