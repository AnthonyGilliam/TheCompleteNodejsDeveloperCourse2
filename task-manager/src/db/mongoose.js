const validator = require('validator');
const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
const databaseName = 'task-manager';

async function main() {
    try {
        const User = mongoose.model('User', {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error('Email is invalid');
                    }
                }
            },
            password: {
                type: String,
                required: true,
                minlength: 7,
                trim: true,
                validate(value) {
                    if (value.toLowerCase() === 'password') {
                        throw new Error('Password CANNOT be "password"');
                    }
                }
            },
            age: {
                type: Number,
                default: 0,
                min: 0
            }
        });

        const Task = mongoose.model('Task', {
            description: {
                type: String,
                required: true,
                trim: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        });

        mongoose.connect(connectionURL
            , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
        );

        const user = new User({
            name: 'Anthony',
            email: 'ag@gil.com',
            password: 'Password'
        });

        const task = new Task({
            description: '  Eat lunch'
        });

        // let savedUser = await user.save();

        let savedTask = await task.save();

        // console.log('User Saved:\n', savedUser);
        console.log('Task Saved:\n', savedTask);
    } catch (err) {
        console.error(err);
    }
}

main();
