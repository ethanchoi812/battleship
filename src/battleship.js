import Gameboard from './gameboard';
import Player from './player';

const Battleship = () => {

    //set up gameboard
    const setup = (name, player_type, ship_coordinates) => {        
        let gameboard = Gameboard(5);
        let player = Player(name, player_type, gameboard);

        gameboard.placeShips(ship_coordinates);

        return player;
    }

    const player1 = setup('Elena', 'person', [[1, 2], [2, 2]]);
    const player2 = setup('Bot', 'bot', [[2, 3], [3, 3]]);

    let activePlayer = player1;
    let otherPlayer = player2;

    let msg = '';

    const turn = () => {

        let allSunk = otherPlayer.gameboard.allSunk();

        if (allSunk === true) {

            msg = `<p>${activePlayer.playerName} wins!</p>`;
            render();

        } else {
        
            let temp = activePlayer;
            activePlayer = otherPlayer;
            otherPlayer = temp;
            getMove();
        }
    }


    const getMove = () => {        
        
        //get move from active player
        let move;

        if (activePlayer.type === 'bot') {
            move = activePlayer.makeMove();
            otherPlayer.gameboard.receiveAttack(move);
            render();
            turn();

        } else if (activePlayer.type === 'person') {
            document.querySelector('form').addEventListener('submit', () => {
                event.preventDefault();

                let val = document.getElementById('move').value

                if (val !== '') {
                    move = val.split(",").map(char => Number(char));

                    if (move.length === 2) {    
                        otherPlayer.gameboard.receiveAttack(move);
                        document.getElementById('move').value = '';
                        render();
                        turn();
                    }
                }
            });
        }        
    }

    const render = () => {

        let display = document.getElementById('display');
        display.innerHTML = "";

        let players = [player1, player2];

        for (let player of players) {

        // render gameboard for player 1
            let gameboardDiv = document.createElement('div');
            gameboardDiv.classList.add('gameboard');

            let length = player.gameboard.board.length;

            for (let i=0; i<length; i++){
                let row = document.createElement('div');
                row.classList.add('row');

                for (let j = 0; j < length; j++) {
                    let col = document.createElement('span');
                    col.classList.add('col');

                    if (player.gameboard.board[i][j] === 'S'){
                        if (player.type === 'person'){
                            col.classList.add('ship');
                        }
                    }

                    if (player.gameboard.board[i][j] === 'M') {
                        col.classList.add('missed');
                    }

                    if (player.gameboard.board[i][j] === 'X') {
                        col.classList.add('hit');
                    }

                    row.appendChild(col);
                }
                gameboardDiv.appendChild(row);
            }
            display.appendChild(gameboardDiv);
        }
        display.innerHTML += msg;
    }

    const play = () => {
        render();
        getMove();   

    }

    return { play }
}

let battleship = Battleship();
battleship.play();

//module.exports = { Battleship }