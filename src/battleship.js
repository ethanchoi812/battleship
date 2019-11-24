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

    const player1 = setup('person', [[1,2], [2,2]]);
    const player2 = setup('person', [[2, 3], [3, 3]]);

    const activePlayer = player1;
    const otherPlayer = player2;

    const turn = () => {
        //get move from active player
        move = activePlayer.getMove([1,1]);

        // non-active player receive attack
        otherPlayer.gameboard.receiveAttack(move);

        //switch turn
        if (otherPlayer.gameboard.allSunk() !== true) {
            let temp = activePlayer;
            activePlayer = otherPlayer;
            otherPlayer = temp;
        }
    }

    const play = () => {
        while (activePlayer.gameboard.allSunk() !== true){
        turn();
        }
    }

    const render = () => {
        const display = document.getElementById('display');

        const gameboard1 = document.createElement('div');
        gameboard1.classList.add('gameboard');

        let length =  player1.gameboard.board.length;

        for (let i=0; i<length; i++){
            let row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < length; j++) {
                let col = document.createElement('span');
                col.classList.add('col');
                row.appendChild(col);
            }
            gameboard1.appendChild(row);
        }

        display.appendChild(gameboard1);
    }

    return { render, play }
}

let battleship = Battleship();
battleship.render();
battleship.play();