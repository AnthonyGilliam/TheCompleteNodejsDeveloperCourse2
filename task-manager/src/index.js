const express = require('express');
const User = require('./models/user');

// Run module to connect Mongoose to MongoDB
const mongoose = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

async function main() {
    try {
        app.use(express.json());
        await mongoose.connect();

        app.post('/users', async (req, res) => {
            console.log('Saving User:\n', req.body);
            try {
                const user = new User(req.body);
                const result = await user.save();
                res.send(result);
            } catch (e) {
                console.error(e);
                res.status(400).send(`Could not save user :(\n${e}`,);
            }
        });

        app.listen(port, () => {
            console.log('Server is up on port ' + port);
        });
    } catch (err) {
        console.error(err);
    }
}

main();
