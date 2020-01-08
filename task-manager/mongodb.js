const { MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

async function main()
{
    try {
        const server = await MongoClient.connect(
            connectionURL,
            { useUnifiedTopology: true, useNewUrlParser: true }
            );

        const db = server.db(databaseName);

        let deleteData = await db.collection('tasks').deleteOne(
            { description : 'Grab hookah bag' }
        );

        console.log(deleteData);
    } catch (error) {
        console.error(error);
    }
}

main();