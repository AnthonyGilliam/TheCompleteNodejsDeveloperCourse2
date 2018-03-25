let getUser = (id, callback) => {
    let user = {
      id: id,
      name: 'Vikram'
    };

    setTimeout(() => callback(user), 3000);
};

console.log('Getting User:')

getUser(31, (user) => { console.log(user) });