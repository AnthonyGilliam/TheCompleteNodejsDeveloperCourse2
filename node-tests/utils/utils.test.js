const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            let res = utils.add(33, 11);
            expect(res).toBeA('number').toBe(44);
        });

        it('should add two numbers asynchronously', (done) => {
            utils.addAsync(4, 3, (sum) => {
                expect(sum).toBeA('number').toBe(7);
                done();
            })
        });
    });

    describe('#square', () => {
        it('should square a number', () => {
            let res = utils.square(10);
            expect(res).toBeA('number').toBe(100);
        });

        it('should square a number asynchronously', (done) => {
            utils.squareAsync(10, (square) => {
                expect(square).toBeA('number').toBe(100);
                done();
            })
        });
    });

    it('should compare two separate objects', () => {
        let obj1 = { a: 12 };
        let obj2 = { a: 12 };
        //When comparing two different objects, toBe() will never return true
        expect(obj1).toNotBe(obj2);
        //toEqual uses the is-equal library to compare:  https://www.npmjs.com/package/is-equal
        expect(obj1).toEqual(obj2);

    });

    it('should include some values', () => {
        expect([2,3,4]).toInclude(2);
        expect({ a: 1, b: 2, c: 3 }).toInclude({ a: 1 });
        expect({
            name: 'Andrew',
            age: 25,
            location: 'Philadelphia'
        }).toExclude({ age: 23 });
    });

    it('should verify first and last names are set', () =>{
        let user = { age: 25, location: 'Philadelphia'};
        utils.setName(user, 'Andrew Mead');
        // expect(user.firstName).toBeA('string').toBe('Andrew');
        // expect(user.lastName).toBeA('string').toBe('Mead');
        //Simplified:
        expect(user).toInclude({
            firstName: 'Andrew',
            lastName: 'Mead'
        });
    });
});