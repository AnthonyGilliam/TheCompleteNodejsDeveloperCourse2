const express = require('express');
const { User } = require('../db/models');

const router = new express.Router();

router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {
    try {
        let users = await User.find({});
        res.send(users);
    } catch (e) {
        console.error(e);
        res.status(500).send(`Could not find any users :(\n${e}`);
    }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;