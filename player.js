
const Player = (type) => {


    const attempts = []
    
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
                board.receiveAttack(move);
            }
        }
    }

    const validMove = (move) => {

        const matchMove = (attempt) => {
            attempt[0] === move[0] && attempt[1] === move[1];
        }

        // returns true if not found in 'attempts' array
        if (attempts.findIndex(matchMove) === -1) {
            attempts.push(move);
            return true;
        } else {
            return false;
        }
    }

    return { getMove }
}