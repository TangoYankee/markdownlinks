const MongoClient = require('mongodb').MongoClient;
const process = require('process');

const cluster_uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`;
const client = new MongoClient(cluster_uri, {
    useNewUrlParser: true
});


saveTeam = (team_id, access_token_cipher) => {
    var db = client.db("markdownlinksdb");
    var teams = db.collection("teams");
    client.connect(err => {
        if (err) return console.log(err);
        console.log("connected successfully")
        checkTeam(team_id, access_token_cipher, teams);
        client.close();
    });
}

checkTeam = async (team_id, access_token_cipher, teams) => {
    var team_record;
    team_record = await teams.findOne({
        team_id: team_id
    });
    if (team_record) {
        console.log("found record")
        await teams.findOneAndUpdate({
            team_id: team_id
        },
            {
                $set:
                    { access_token_cipher: access_token_cipher }
            });
    } else if (!team_record) {
        console.log("did not find record")
        await teams.insertOne({
            team_id: team_id, access_token_cipher: access_token_cipher
        });
    }
}

module.exports = { saveTeam, checkTeam };
