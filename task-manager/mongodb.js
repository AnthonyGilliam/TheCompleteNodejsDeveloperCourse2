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

        let updatedData = await db.collection('tasks').updateMany(
            { completed: false },
            { $set: { "completed": true } }
        );

        console.log(updatedData);
    } catch (error) {
        console.error(error);
    }
}

main();