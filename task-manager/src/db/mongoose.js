const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

const mongooseWrapper = {
    connect: async () => {
        await mongoose.connect(
            connectionURL
            , {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
        );
    }
};

module.exports = mongooseWrapper;
