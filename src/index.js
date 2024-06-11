import './style.css'
import Gameboard, { hasBeenFilled } from './code/gameboard'
import Ship from './code/ship'

function createHTMLBoard(name) {
    console.log(name)

    const main_div = document.createElement('div')
    main_div.className = 'gameboard ' + name

    for(let i = 0; i < 10; ++i) {

        const second_div = document.createElement('div')
        second_div.className = i

        for (let j = 0; j < 10; ++j) {

            const inner_div = document.createElement('div')
            inner_div.className = j
            second_div.appendChild(inner_div)

        }

        main_div.appendChild(second_div)

    }

    return main_div
}

const game = document.querySelector('#game')

const dialog = document.createElement('dialog')
dialog.id = 'myDialog'

function start() {

    game.innerHTML = ''

    // PLAYER
    const player_p = document.createElement('p')
    player_p.className = 'gameover playerend'
    player_p.textContent = "Player's Board"
    game.appendChild(player_p)
    
    const player = createHTMLBoard('player')
    game.appendChild(player)
    
    const playerShip1 = new Ship(2)
    const playerShip2 = new Ship(3)
    const playerShip3 = new Ship(4)
    const playerShip4 = new Ship(4)
    const playerShip5 = new Ship(5)
    
    const playerBoard = new Gameboard()
    playerBoard.position_ship([0,9], playerShip1)
    playerBoard.position_ship([2,6], playerShip2)
    playerBoard.position_ship([4,4], playerShip3)
    playerBoard.position_ship([8,9], playerShip4)
    playerBoard.position_ship([9,5], playerShip5)
    
    document.querySelector('.player').childNodes[0].childNodes[9].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[0].childNodes[8].style = 'background-color: #38bdf8'
    
    
    document.querySelector('.player').childNodes[2].childNodes[6].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[2].childNodes[5].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[2].childNodes[4].style = 'background-color: #38bdf8'
    
    document.querySelector('.player').childNodes[4].childNodes[4].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[4].childNodes[3].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[4].childNodes[2].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[4].childNodes[1].style = 'background-color: #38bdf8'
    
    document.querySelector('.player').childNodes[8].childNodes[9].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[8].childNodes[8].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[8].childNodes[7].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[8].childNodes[6].style = 'background-color: #38bdf8'
    
    document.querySelector('.player').childNodes[9].childNodes[5].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[9].childNodes[4].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[9].childNodes[3].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[9].childNodes[2].style = 'background-color: #38bdf8'
    document.querySelector('.player').childNodes[9].childNodes[1].style = 'background-color: #38bdf8'
    
    console.log(playerBoard.ship_coordinates)
    
    document.querySelectorAll('.player > div > div').forEach(
        value => {
            value.addEventListener('click', (event) => {
    
                const X = event.target.parentNode.className
                const Y = event.target.className
    
                if (playerBoard.hasBeenFilled([X, Y])) {
                    console.log('its already been clicked')
                } else if (playerBoard.gameOver()) {
                    console.log('Game Over')
                } else {
                    
                    if (playerBoard.receiveAttack([X, Y])) {
                        event.target.style = 'background-color: #f87171'
    
                        if (playerBoard.gameOver()) {
                            console.log('Game Over')
                            document.querySelector('.result').textContent = `🎉 Computer Won 🎉`
                            document.querySelector('#myDialog').showModal()
                        }
                    } else {
                        event.target.style = 'background-color: #f1f5f9'
                    }
    
                }
    })})
    
    // COMPUTER
    
    function ComputerSelector() {
        const X = Math.ceil(Math.random() * 9)
        const Y = Math.ceil(Math.random() * 9)
    
        if (playerBoard.position_map([X, Y]) != 'X' && playerBoard.position_map([X, Y]) != 'O') {
            document.querySelector('.player').childNodes[X].childNodes[Y].click()
            return true
        }
        else {
            ComputerSelector()
        }
    }
    
    const computer_p = document.createElement('p')
    computer_p.className = 'gameover computerend'
    computer_p.textContent = "Computer's Board"
    game.appendChild(computer_p)
    
    const computer = createHTMLBoard('computer')
    game.appendChild(computer)
    
    
    const computerShip1 = new Ship(2)
    const computerShip2 = new Ship(3)
    const computerShip3 = new Ship(4)
    const computerShip4 = new Ship(4)
    const computerShip5 = new Ship(5)
    
    const computerBoard = new Gameboard()
    computerBoard.position_ship([0,1], computerShip1)
    computerBoard.position_ship([2,3], computerShip2)
    computerBoard.position_ship([4,8], computerShip3)
    computerBoard.position_ship([6,6], computerShip4)
    computerBoard.position_ship([9,7], computerShip5)
    
    console.log(computerBoard.ship_coordinates)
    
    document.querySelectorAll('.computer > div > div').forEach(
        value => {
            value.addEventListener('click', (event) => {
    
                const X = event.target.parentNode.className
                const Y = event.target.className
    
                if (computerBoard.hasBeenFilled([X, Y])) {
                    console.log('its already been clicked')
                } else if (computerBoard.gameOver()) {
                    console.log('Game Over')
                } else {
                    ComputerSelector()
                    if (computerBoard.receiveAttack([X, Y])) {
                        event.target.style = 'background-color:  #f87171'
    
                        if (computerBoard.gameOver()) {
                            console.log('Game Over')

                            document.querySelector('.result').textContent = `🎉 You Won 🎉`
                            document.querySelector('#myDialog').showModal()
                        }
                    } else {
                        event.target.style = 'background-color: #f1f5f9'
                    }
    
                }})}
    )
    
}

const result = document.createElement('h2')
result.className = 'result'
const restart = document.createElement('button')
restart.textContent = 'Restart'
restart.classList = 'restart'

dialog.appendChild(result)
dialog.appendChild(restart)

document.querySelector('body').appendChild(dialog)

document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('#myDialog').close()
    start()
})



start()


