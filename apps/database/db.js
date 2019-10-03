const MongoClient = require('mongodb').MongoClient
const process = require('process')

var clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`

var saveTeam = (teamId, accessTokenCipher) => {
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
  const teamRecord = await teams.findOne({
    teamId: teamId
  })
  if (teamRecord) {
    console.log('found record')
    await teams.findOneAndUpdate({
      teamId: teamId
    },
    {
      $set:
          { accessTokenCipher: accessTokenCipher }
    })
  } else if (!teamRecord) {
    console.log('did not find record')
    await teams.insertOne({
      teamId: teamId, accessTokenCipher: accessTokenCipher
    })
  }
}

module.exports = { saveTeam, checkTeam }
