console.log('starting app');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');

var res = notes.add(9, -2);

console.log(res);

// let user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, err => { if(err) console.log(err) });