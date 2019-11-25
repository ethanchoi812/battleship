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

    const activePlayer = player1;
    const otherPlayer = player2;

    const turn = () => {
        //get move from active player
        move = activePlayer.getMove();

        // non-active player receive attack
        otherPlayer.gameboard.receiveAttack(move);

        //switch turn
        if (otherPlayer.gameboard.allSunk() !== true) {
            let temp = activePlayer;
            activePlayer = otherPlayer;
            otherPlayer = temp;
        }
    }

    const render = (player) => {

        // rendre gameboard for player 1
        const gameboard = document.createElement('div');
        gameboard.classList.add('gameboard');

        let length =  player.gameboard.board.length;

        for (let i=0; i<length; i++){
            let row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < length; j++) {
                let col = document.createElement('span');
                col.classList.add('col');

                if (player.gameboard.board[i][j] === 'S'){
                    col.classList.add('ship');
                }

                row.appendChild(col);
            }
            gameboard.appendChild(row);
        }

        return gameboard;
    }

    const play = () => {
        const display = document.getElementById('display');
        const gameboard1 = render(player1);
        const gameboard2 = render(player2);

        display.appendChild(gameboard1);
        display.appendChild(gameboard2);

        while (activePlayer.gameboard.allSunk() !== true) {
            turn();
        }
    }

    return { render, play }
}

let battleship = Battleship();
battleship.play();

//module.exports = { Battleship }