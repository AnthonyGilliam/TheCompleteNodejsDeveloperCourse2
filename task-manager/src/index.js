const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Run module to connect Mongoose to MongoDB
const mongoose = require('./db/mongooseWrapper');

const app = express();
const port = process.env.PORT || 3000;

async function main() {
    try {
        app.use(express.json());
        app.use(userRouter);
        app.use(taskRouter);

        await mongoose.connect();

        app.listen(port, () => {
            console.log('Server is up on port ' + port);
        });
    } catch (err) {
        console.error(err);
    }
}

main();
