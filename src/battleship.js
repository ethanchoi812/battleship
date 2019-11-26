import Gameboard from './gameboard';
import Player from './player';

const Battleship = () => {

    //set up gameboard
    const setup = (player_type, ship_coordinates) => {        
        let gameboard = Gameboard(5);
        let player = Player(player_type, gameboard);

        gameboard.placeShips(ship_coordinates);

        return player;
    }

    const player1 = setup('person', [[1, 2], [2, 2]]);
    const player2 = setup('bot', [[2, 3], [3, 3]]);

    let activePlayer = player1;
    let otherPlayer = player2;

    const turn = () => {

        //switch turn
        if (otherPlayer.gameboard.allSunk() !== true) {
            let temp = activePlayer;
            activePlayer = otherPlayer;
            otherPlayer = temp;
        }
        getMove();
    }


    const getMove = () => {        
        
        //get move from active player
        let move;

        if (activePlayer.type === 'bot') {
            move = activePlayer.makeMove();

            if (Array.isArray(move) && move.length === 2) {
                otherPlayer.gameboard.receiveAttack(move);
                render();
                turn();
            }

        } else {
            document.querySelector('form').addEventListener('submit', () => {
                event.preventDefault();

                move = document.getElementById('move').value
                    .split(",").map(char => Number(char));

                if (Array.isArray(move) && move.length === 2) {
                    otherPlayer.gameboard.receiveAttack(move);
                    render();
                    turn();
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
                        col.classList.add('ship');
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