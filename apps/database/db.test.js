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

  const team_id = '1234567890'
  const team_token_one = 'qwertyasdfg'
  const team_token_two = 'plmoknijb'
  it('should insert a team into the collection', async () => {
    const teams = db.collection('teams')
    await checkTeam(team_id, team_token_one, teams)
    const inserted_team = await teams.findOne({ team_id: team_id })
    expect(team_token_one).toEqual(inserted_team.access_token_cipher)
  })

  it('should update a team with a new token', async () => {
    const teams = db.collection('teams')
    const inserted_team = await teams.findOne({ team_id: team_id })
    expect(team_token_one).toEqual(inserted_team.access_token_cipher)
    await checkTeam(team_id, team_token_two, teams)
    const updated_team = await teams.findOne({ team_id: team_id })
    expect(team_token_two).toEqual(updated_team.access_token_cipher)
  })
})
