const Gameboard = require('../code/gameboard')
const Ship = require('../code/ship')

function createGameboardWithShip() {
    const ship1 = new Ship(3);
    const gameboard = new Gameboard();
    gameboard.position_ship([0, 5], ship1);
    return gameboard
  }

describe('Testing Gameboard Factory Function', () => {

    test('placing ship in coordinates', () => {

        const gameboard = createGameboardWithShip();

        expect(gameboard.isShip(gameboard.position_map([1,4]))).toBeFalsy();
        expect(gameboard.isShip(gameboard.position_map([0,5]))).toBeTruthy();
        expect(gameboard.isShip(gameboard.position_map([0,4]))).toBeTruthy();
        expect(gameboard.isShip(gameboard.position_map([0,3]))).toBeTruthy();
        expect(gameboard.isShip(gameboard.position_map([0,2]))).toBeFalsy();
        expect(gameboard.isShip(gameboard.position_map([0,6]))).toBeFalsy();
    });

    test('Confirming if ship gets attacked', () => {
        const gameboard = createGameboardWithShip();

        gameboard.receiveAttack([0,5])
        expect(gameboard.position_map([0,5])).toBe('X')
    });

    test('Confirming if missed attacks are registered', () => {

        const gameboard = createGameboardWithShip();

        gameboard.receiveAttack([0,2])
        expect(gameboard.position_map([0,2])).toBe('O')
    });

    test('Confirming if all ships are down', () => {
        const gameboard = createGameboardWithShip();

        expect(gameboard.gameOver()).toBeFalsy()

        gameboard.receiveAttack([0,5])
        gameboard.receiveAttack([0,4])
        gameboard.receiveAttack([0,3])

        expect(gameboard.gameOver()).toBeTruthy()
    });
})

