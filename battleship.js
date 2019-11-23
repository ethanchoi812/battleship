const { Gameboard } = require('./gameboard');
const { Player } = require('./player');

const battleship = () => {

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

    while(gameboard.allSunk() !== true){
        turn();
    }
}