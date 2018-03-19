console.log('starting app\n');

const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const appInputArgs = yargs.argv;
const command = appInputArgs._[0];
console.log(`This app's input arguments are:  ${process.argv}\n`);
console.log(`This app's user-specified input arguments are:  ${_.join(_.drop(process.argv, 2), ', ')}\n`);
console.log('Yargs:  ', appInputArgs, '\n');

switch(command){
    case 'add':
        console.log('Adding new note');
        notes.addNote(appInputArgs.title, appInputArgs.body);
        break;
    case 'list':
        console.log('Listing all notes');
        notes.getAll();
        break;
    case 'read':
        console.log('fetching note');
        notes.getNote(appInputArgs.title);
        break;
    case 'remove':
        console.log('Removing note');
        notes.removeNote(appInputArgs.title);
        break;
    default:
        console.log('Input command not recognized');
        break;
}