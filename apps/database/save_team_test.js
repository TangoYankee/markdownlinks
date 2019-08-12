const { saveTeam } = require("./db.js");

var test_team_a = "12345678990";
var test_team_b = "0987654321";
var test_token_a = "atoken";
var test_token_b = "btoken";

saveTeam(test_team_a, test_token_b);
saveTeam(test_team_b, test_token_a);
