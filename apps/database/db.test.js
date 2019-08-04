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

    it('should insert a doc into collection', async () => {
        var teams = db.collection("teams");
        let team_one_id = '1234567890';
        let team_one_token = 'qwertyasdfg';
        await checkTeam(team_one_id, team_one_token, teams);

        const inserted_team = await teams.findOne({ team_id: team_one_id });
        console.log(`test result team: ${inserted_team}`);
        expect(team_one_token).toEqual(inserted_team.access_token_cipher);
    });

});
