// const Ship = require('../ship')

class Gameboard {

    constructor(ship_coordinates = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
    ], ships_available = []) {
        this.ship_coordinates = ship_coordinates
        this.ships_available = ships_available
    }

    resetGameboard = () => {
        this.ship_coordinates = [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
        
        this.ships_available = []
    }

    position_ship = (coordinates, ship) => {
        this.ships_available.push(ship)
        for(let i = 0; i < ship.length; ++i) {
            this.ship_coordinates[coordinates[0]][coordinates[1] - i] = ship
        }
    }

    position_map = (coordinates) => {
        return this.ship_coordinates[coordinates[0]][coordinates[1]]
    }

    hasBeenFilled = (coordinates) => {
        if (this.position_map(coordinates) == 'X' || this.position_map(coordinates) == 'O') {
            return true
        } else {
            return false
        }
    }

    isShip = (position) => {
        if (position == null ) {
            return false
        }
        return position.__proto__.hasOwnProperty('hit')
    }

    receiveAttack = (coordinates) => {
        let attack_coordinates = this.position_map(coordinates)
        if (this.isShip(attack_coordinates)) {
            attack_coordinates.hit()
            this.ship_coordinates[coordinates[0]][coordinates[1]] = 'X'
            return true
        }
        this.ship_coordinates[coordinates[0]][coordinates[1]] = 'O'
        return false
    }

    gameOver = () => {
        for(let i = 0; i < this.ships_available.length; ++i) {
            if (this.ships_available[i].isSunk() == false) {
                return false
            }
        }
        return true
    }
}

module.exports = Gameboard