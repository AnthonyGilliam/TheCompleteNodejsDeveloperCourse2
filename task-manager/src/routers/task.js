const express = require('express');
const { Task } = require('../db/models');

const router = express.Router();

router.post('/tasks', async (req, res) => {
    try {
        let task = new Task(req.body);
        let result = await task.save();
        res.status(201).send(result);
    } catch (e) {
        console.error(e);
        res.status(400).send(`Could not save task :(\n${e}`);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        let tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).send(`Could not find any tasks :(\n${e}`);
    }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;