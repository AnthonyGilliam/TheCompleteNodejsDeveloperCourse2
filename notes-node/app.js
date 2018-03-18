console.log('starting app');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes');

let res = notes.add(9, -2);

console.log(`true ${_.isString(true) ? 'is' : 'is not'} a string`);
console.log(`'Andrew' ${_.isString('Andrew') ? 'is' : 'is not'} a string`);

let filteredArray = _.uniq(['Anthony', 1, 'Anthony', 2, 3, 4]);
console.log(`Filtered array:  ${filteredArray}`);

// let user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, err => { if(err) console.log(err) });