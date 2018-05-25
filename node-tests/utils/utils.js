module.exports.add = (a, b) => a + b;

module.exports.addAsync = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

module.exports.square = x => x * x;

module.exports.squareAsync = (num, callback) => {
    setTimeout(() => {
        callback(num * num);
    }, 1000);
};

module.exports.setName = (user, fullName) => {
    let names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
};