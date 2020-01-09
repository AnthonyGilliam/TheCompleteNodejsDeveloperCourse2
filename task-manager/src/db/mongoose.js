const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
const databaseName = 'task-manager';

async function main() {
    try {
        const User = mongoose.model('User', {
            name: { type: String },
            age: { type: Number }
        });

        mongoose.connect(connectionURL
            , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
        );

        const me = new User({ name: 'Cheska', age: null });

        let savedMe = await me.save();

        console.log(savedMe);
    } catch (err) {
        console.error(err);
    }
}

main();
