const MongoClient = require('mongodb').MongoClient
const process = require('process')

var clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`

var saveTeam = (teamId, accessTokenCipher) => {
  /* send the team data to the database */
  const client = MongoClient(clusterUri, { useNewUrlParser: true })
  client.connect(async (err) => {
    if (err) return console.log(err)
    const teams = client.db('markdownlinksdb').collection('teams')
    console.log('connected successfully')
    await checkTeam(teamId, accessTokenCipher, teams)
    client.close()
  })
}

var checkTeam = async (teamId, accessTokenCipher, teams) => {
  /* look for an existing team record */
  const teamRecord = await teams.findOne({
    team_id: teamId
  })
  if (teamRecord) {
    console.log('found record')
    await teams.findOneAndUpdate({
      team_id: teamId
    },
    {
      $set:
          { access_token_cipher: accessTokenCipher }
    })
  } else if (!teamRecord) {
    console.log('did not find record')
    await teams.insertOne({
      team_id: teamId,
      access_token_cipher: accessTokenCipher
    })
  }
}

module.exports = { saveTeam, checkTeam }
