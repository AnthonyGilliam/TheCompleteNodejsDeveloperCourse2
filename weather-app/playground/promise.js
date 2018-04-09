console.log('Starting promise test\n');
let asyncAdd = function(a, b){
    console.log(`Initiating add: ${arguments[0]} + ${arguments[1]}\n`);
    return new Promise((resolve, reject) => {
        console.log('Initiating promise\n');
        console.log('Computing...\n');
        setTimeout(() => {
            throw new Error('Test throwing error');
            if (typeof a === 'number' && typeof b === 'number')
                resolve(a + b);
            else
                reject('Both parameters must numbers.')
        }, 2500);
    });
};

console.log('Continuing promise test\n');

asyncAdd(5, 7)
    .then(sum => { console.log('Sum =', sum, '\n'); return asyncAdd(sum, 33); })
    .then(sum => { console.log('Should be 45', sum, '\n'); })
    .catch(err => console.log(err, '\n'));

/*
let somePromise = new Promise((resolve, reject) => {
    console.log('Starting promise now...\n');
    // setTimeout(() => resolve('Hey, it worked'), 2000);
    setTimeout(() => reject('promise was a no-go.'), 2000);
});
console.log('Continuing promise test\n');
somePromise
    .then(message => console.log('Success:', message)
        , err => console.log('Error:', err));*/