const Ship = require('../code/ship')


describe('Testing Ship Object', () => {

    test('Getting hit increases counter', () => {
        const ship1 = new Ship(3)
        ship1.hit()
        ship1.hit()
        expect(ship1.counter).toBe(2)
    });

    test('When ship has max hits its sunk', () => {
        const ship1 = new Ship(3)
        ship1.hit()
        ship1.hit()
        ship1.hit()
        expect(ship1.isSunk).toBeTruthy()
    });
})