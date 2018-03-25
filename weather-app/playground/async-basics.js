console.log('Starting app');

setTimeout(() => console.log('inside of callback'), 2000);

setTimeout(() => console.log('second timeout works'), 0);

console.log('Finishing up');