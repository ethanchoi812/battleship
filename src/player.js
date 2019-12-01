
const Player = (name, playerType, playerGameboard) => {
    
    const playerName = name;
    const gameboard = playerGameboard;
    const type = playerType;
    const ships = [];
    const attempts = [];

    /**
     *
     * @param {Board} gameboard Board object
     * @param {Array} arr optional Array from users
     *
     */
    

    const randomCoord = (baseArr) => {

        let coord = [];
        while (!validCoord(coord, baseArr)){
            let x = Math.floor(Math.random() * Math.floor(gameboard.board.length));
            let y = Math.floor(Math.random() * Math.floor(gameboard.board.length));

            coord = [x, y];
        }
        return coord;
    } 

    const validCoord = (coord, baseArr) => {

        const matchMove = (base) => {
            return base[0] === coord[0] && base[1] === coord[1];
        }

        return (coord.length === 2 && baseArr.findIndex(matchMove) === -1);
    }

    const makeMove = () => {

        let move = randomCoord(attempts);
        attempts.push(move);

        return move;
    }

    const makeShips = () => {
        let ship = randomCoord(ships);
        ships.push(ship);
        return ships;
    }

    return { playerName, gameboard, type, makeMove, attempts, makeShips }
}

export default Player;