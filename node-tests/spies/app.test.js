const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app')

describe('App', () => {
    let dbMock = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', dbMock);

    it('should call the spy correctly', () => {
        let spy = expect.createSpy();
        spy('Andrew', 25);
        expect(spy).toHaveBeenCalledWith('Andrew', 25);
    });

    it('should save user with user object', () => {
        let email = 'andrew@example.com';
        let password = '123abc';

        //the app module now has its required db module mocked by dbMock and its saveUser() function is now a spy
        app.handleSignup(email, password);
        expect(dbMock.saveUser).toHaveBeenCalledWith({ email, password });
    });
});