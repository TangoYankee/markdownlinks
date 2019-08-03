const MongoClient = require('mongodb').MongoClient;
const process = require('process');

const cluster_uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`;
const client = new MongoClient(cluster_uri, { useNewUrlParser: true });


saveTeam = (team_id, access_token_cipher) => {
    var team_collection = client.db("markdownlinksdb").collection("teams");
    var team_record;
    client.connect(err => {
        if (err) return console.log(err);
        console.log("connected successfully")
        team_record = team_collection.findOne({team_id: team_id});
        if (team_record) {
            team_collection.findOneAndUpdate({team_id: team_id},
                { $set: {access_token_cipher: access_token_cipher}});
        } else if (!team_record) {
            team_collection.insertOne({team_id: team_id, access_token_cipher: access_token_cipher})
        }
        client.close();
    })
}

module.exports = saveTeam;
