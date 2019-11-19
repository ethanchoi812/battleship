
const Player = (type) => {


    const attempts = []
    
    /**
     *
     * @param board from Gameboard
     *
     */
    const getMove = (board) => {
        let move;

        if (type === 'bot'){

            // random move
            move = Math.floor(Math.random() * Math.floor(board.width));
            validMove(move);

        } else {

            // get move from user
            move = '';
            validMove(move);
        }

    }

    const validMove = (move) => {
        if (!attempts.includes(move)) {
            attempts.push(move);
            return move;
        } else {
            return false;
        }
    }

    return { getMove }
}