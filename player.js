
const Player = (type, player_gameboard) => {
    
    const gameboard = player_gameboard;
    /**
     *
     * @param {Board} gameboard Board object
     * @param {Array} arr optional Array from users
     *
     */
    const getMove = () => {
        let move;
        let attempts = gameboard.attempts;

        if (type === 'bot'){ 
            move = makeMove(gameboard);        

            while (!validMove(attempts, move)) {
                move = makeMove(gameboard);        
            }
            
            gameboard.receiveAttack(move);
            attempts.push(move);
            
        } else {
            // get move from user
            document.querySelector('form').addEventListener('submit', ()=>{
                input = document.getElementById('move').value;
                move = input.split(",").map(char => Number(char));
            });

            if (validMove(attempts, move)) {
                gameboard.receiveAttack(move);
                attempts.push(move);
            }
        }

        return move;
    }

    const makeMove = () => {

        let row = Math.floor(Math.random() * Math.floor(gameboard.board.length));
        let col = Math.floor(Math.random() * Math.floor(gameboard.board.length));
        move = [row, col];

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

    return { gameboard, validMove, getMove }
}

module.exports = { Player }
