const express = require('express');
const userRouter = require('./routers/user');
const { User, Task } = require('./db/models');

// Run module to connect Mongoose to MongoDB
const mongoose = require('./db/mongooseWrapper');

const app = express();
const port = process.env.PORT || 3000;

async function main() {
    try {
        app.use(express.json());
        app.use(userRouter);
        await mongoose.connect();

        // Users:
        app.post('/users', async (req, res) => {
            console.log('Saving User:\n', req.body);
            try {
                let user = new User(req.body);
                let result = await user.save();
                res.status(201).send(result);
            } catch (e) {
                console.error(e);
                res.status(400).send(`Could not save user :(\n${e}`);
            }
        });

        app.get('/users', async (req, res) => {
            try {
                let users = await User.find({});
                res.send(users);
            } catch (e) {
                console.error(e);
                res.status(500).send(`Could not find any users :(\n${e}`);
            }
        });

        app.get('/users/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let user = await User.findById(_id);
                if (!user) {
                    return res.status(404).send();
                }
                res.send(user);
            } catch (e) {
                console.error(e);
                res.status(500).send(`Could not find user: ${_id} :(\n${e}`);
            }
        });

        app.patch('/users/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let updates = Object.keys(req.body);
                const allowedUpdates = ['name', 'email', 'password', 'age'];
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
                if (!isValidOperation) {
                    return res.status(400).send({ error: 'Invalid updates!' });
                }
                let user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
                if (!user) {
                    return res.status(404).send();
                }
                res.send(user);
            } catch (e) {
                res.status(400).send(e);
            }
        });

        app.delete('/users/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let user = await User.findByIdAndDelete(_id);
                if (!user) {
                    return res.status(404).send();
                }
                res.send(user);
            } catch (e) {
                res.status(500).send();
            }
        });

        // Tasks:
        app.post('/tasks', async (req, res) => {
            try {
                let task = new Task(req.body);
                let result = await task.save();
                res.status(201).send(result);
            } catch (e) {
                console.error(e);
                res.status(400).send(`Could not save task :(\n${e}`);
            }
        });

        app.get('/tasks', async (req, res) => {
            try {
                let tasks = await Task.find({});
                res.send(tasks);
            } catch (e) {
                console.error(e);
                res.status(500).send(`Could not find any tasks :(\n${e}`);
            }
        });

        app.get('/tasks/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let task = await Task.findById(_id);
                if (!task) {
                    res.status(404).send(`Could not find task: ${_id} :(`);
                }
                res.send(task);
            } catch (e) {
                console.error(e);
                res.status(500).send(`Could not find task: ${_id} :(\n${e}`);
            }
        });

        app.patch('/tasks/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let updates = Object.keys(req.body);
                const allowedUpdates = ['description', 'completed'];
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
                if (!isValidOperation) {
                    return res.status(400).send({ error: 'Invalid updates!' });
                }
                let task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
                if (!task) {
                    return res.status(404).send();
                }
                res.send(task);
            } catch (e) {
                res.status(400).send(e);
            }
        });

        app.delete('/tasks/:id', async (req, res) => {
            let _id = req.params.id;
            try {
                let task = await Task.findByIdAndDelete(_id);
                if (!task) {
                    return res.status(404).send();
                }
                res.send(task);
            } catch (e) {
                res.status(500).send();
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
