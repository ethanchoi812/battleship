
const Player = (name, playerType, playerGameboard) => {
    
    const playerName = name;
    const gameboard = playerGameboard;
    const type = playerType;
    const attempts = [];

    /**
     *
     * @param {Board} gameboard Board object
     * @param {Array} arr optional Array from users
     *
     */
    

    const makeMove = () => {

        let move = [];

        while (!validMove(move)) {
            let row = Math.floor(Math.random() * Math.floor(gameboard.board.length));
            let col = Math.floor(Math.random() * Math.floor(gameboard.board.length));
            move = [row, col];

        }
        
        attempts.push(move);
        return move;
    }

    const validMove = (move) => {

        const matchMove = (attempt) => {
            return attempt[0] === move[0] && attempt[1] === move[1];
        }

        return (move.length === 2 && attempts.findIndex(matchMove) === -1);
    }

    return { playerName, gameboard, type, makeMove, validMove, attempts }
}

export default Player;