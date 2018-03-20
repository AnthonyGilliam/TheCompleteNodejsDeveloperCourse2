let square = x => {
    let result = x * x;
    return result;
};

let user = {
    name: 'Andrew',
    sayHi () {
        console.log(arguments)
        console.log(`Hi. I'm ${this.name}`)
    }
};

user.sayHi(1, 2, 3);