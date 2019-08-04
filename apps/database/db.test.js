const MongoClient = require('mongodb').MongoClient;
const { saveTeam, checkTeam } = require('./db.js');


describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    
    let team_id = '1234567890';
    let team_token_one = 'qwertyasdfg';
    let team_token_two = 'plmoknijb';
    it('should insert a team into the collection', async () => {
        let teams = db.collection("teams");
        await checkTeam(team_id, team_token_one, teams);
        let inserted_team = await teams.findOne({ team_id: team_id });
        expect(team_token_one).toEqual(inserted_team.access_token_cipher);
    });

    it('should update a team with a new token', async () => {
        let teams = db.collection("teams");
        let inserted_team = await teams.findOne({ team_id: team_id });
        expect(team_token_one).toEqual(inserted_team.access_token_cipher);
        await checkTeam(team_id, team_token_two, teams);
        let updated_team = await teams.findOne({team_id: team_id});
        expect(team_token_two).toEqual(updated_team.access_token_cipher);
    })
});
