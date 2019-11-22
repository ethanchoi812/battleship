
const { Gameboard } = require('./gameboard');
const { Player } = require('./player');
const { Ship } = require('./ship');

const battleship = () => {

    //set up gameboard
    const setup = (playet_type, ship_coordinates) => {        
        let gameboard = Gameboard(5);
        let player = Player(playet_type, gameboard);

        gameboard.placeShips(ship_coordinates);
    }

}