
const Player = (playerType, playerGameboard) => {
    
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

        let row = Math.floor(Math.random() * Math.floor(gameboard.board.length));
        let col = Math.floor(Math.random() * Math.floor(gameboard.board.length));
        let move = [row, col];

        return move;
    }

    const validMove = (attempts, move) => {

        const matchMove = (attempt) => {
            return attempt[0] === move[0] && attempt[1] === move[1];
        }

        if (attempts.findIndex(matchMove) !== -1) {
            return false;
        } else if (attempts.findIndex(matchMove) === -1){
            return true;
        }
    }
    return { gameboard, type, makeMove }
}

export default Player;