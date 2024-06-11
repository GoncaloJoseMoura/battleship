
class Ship {
    constructor(length, counter = 0, status = false) {
        this.length = length
        this.counter = counter
        this.status = status
    }

    hit() {
        this.counter += 1
    }

    isSunk() {
        if (this.length == this.counter) {
            this.status = true
            return this.length == this.counter
        }
        return false
    }
}

module.exports = Ship;