let obj = {
    name:  'Andrew'
};

let stringObj = JSON.stringify(obj);
console.log('stringObj is of type', typeof stringObj);
console.log(stringObj);

let personString = '{"name": "Andrew", "age": 25}';
let person = JSON.parse(personString);
console.log('person is of type', typeof person);
console.log(person);