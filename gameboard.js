const { Ship } = require('./ship');

const Gameboard = (width) => {

    // Board: [[0,1,2],[0,1,2],[0,1,2]]
    const board = [];
    for (let i = 0; i < width; i++) {
        board.push([]);
        for (let j = 0; j < width; j++) {
            board[i].push(' ');
        }
    }

    const ships = [];

    const attempts = [];
    
    /**
     * 
     * @param {Array} coord each array is a ship's coordinate e.g., [[1,1],[1,2]]
     */

    const placeShips = (coords) => {

        let ship = Ship(coords);
        ships.push(ship);

        coords.forEach((subarr) => {
            if (subarr[0] < width && subarr[1] < width){
                                
                let row = subarr[0];
                let col = subarr[1];

                board[row][col] = 'S';
            }
            else {
                throw 'Error: Invalid coordinate';
            }
        });

        return ships;
    }
    
    /**
     * 
     * @param {Array} coord e.g., [1,1]
     * 
     */
     const receiveAttack = (coord) => {

        let row = coord[0];
        let col = coord[1];
        let position = board[row][col];
            
         if (position.includes('S')) {
            board[row][col] = 'X';

            ships.forEach(ship => {
                ship.hit(coord);
            });

         } else if (position === ' ') {
             board[row][col] = 'M';
        } else {
            return false;
        }

        attempts.push(coord);
    }

    const allSunk = () => {

        const checkSunk = (ship) => { return ship.isSunk() };
        return ships.every(checkSunk);
    }

    return { board, ships, placeShips, receiveAttack, attempts, allSunk }
}

module.exports = { Gameboard }
