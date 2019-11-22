
const { Gameboard } = require('./gameboard');
const { Player } = require('./player');
const { Ship } = require('./ship');

const battleship = () => {

    //set up gameboard
    const gameboard1 = Gameboard(5);
    const player1 = Player('person');

    const gameboard2 = Gameboard(5);
    const player2 = Player('bot');
}