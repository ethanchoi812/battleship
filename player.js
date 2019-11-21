
const Player = (type) => {
    
    /**
     *
     * @param board from Gameboard
     *
     */
    const getMove = (board, arr=[]) => {
        let move;

        if (type === 'bot'){
            // random move
            let row = Math.floor(Math.random() * Math.floor(board.width));
            let col = Math.floor(Math.random() * Math.floor(board.width));

            move = [row, col]
            if (validMove(move)) {
                board.receiveAttack(move);
            }

        } else {
            // get move from user
            move = arr;
            if (validMove(move)) {
                board.attempts.push(move);
                board.receiveAttack(move);
            }
        }
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

    return { validMove, getMove }
}

module.exports = { Player }
