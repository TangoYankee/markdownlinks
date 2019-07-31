const mongoose = require('mongoose');

// Database testing
// https://jestjs.io/docs/en/setup-teardown 
// https://jestjs.io/docs/en/mongodb

var OAuthSchema = new mongoose.Schema({
    // team_id (string) oauth tokens are stored based on teams
    // access_token_cipher (string) encrypted token, appended with iv
})
