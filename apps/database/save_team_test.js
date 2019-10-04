const { saveTeam } = require('./db.js')

var testTeamA = '12345678990'
var testTeamB = '0987654321'
var testTokenA = 'atoken'
var testTokenB = 'btoken'

saveTeam(testTeamA, testTokenB)
saveTeam(testTeamB, testTokenA)
