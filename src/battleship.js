import Gameboard from './gameboard';
import Player from './player';

const Battleship = () => {

    let activePlayer;
    let otherPlayer;

    let gameboard1 = Gameboard(5);
    let gameboard2 = Gameboard(5);

    let player1 = Player('You', 'person', gameboard1);
    let player2 = Player('Bot', 'bot', gameboard2);

    //set up gameboard
    const setup = () => {        
        
        let coords = player2.makeShips(2);
        console.log(coords);
        player2.gameboard.placeShips(coords);

        const form = document.querySelector('form');

        form.addEventListener("submit", () => {
            event.preventDefault();
            let coords = [];

            let userInput = document.getElementById("add-ship").value;
            let coord = userInput.split(",").map(char => Number(char));

            coords.push(coord);

            player1.gameboard.placeShips(coords);
            render();

            document.getElementById("add-ship").value = '';
        });

        activePlayer = player1;
        otherPlayer = player2;

        const done = document.getElementById('done');
        done.addEventListener('click', () => {
            form.style.display = 'none';
            done.style.display = 'none';
            getMove();
        });

        render();
    }

    const turn = () => {

        let allSunk = otherPlayer.gameboard.allSunk();

        if (allSunk === true) {
            let msg;

            activePlayer.type === 'bot' ?
                msg = `${activePlayer.playerName} wins!` :
                msg = `${activePlayer.playerName} win!`;

            render(msg);

        } else {
        
            let temp = activePlayer;
            activePlayer = otherPlayer;
            otherPlayer = temp;
            getMove();
        }
    }


    const getMove = () => {        
        
        //get move from active player
        let move;

        if (activePlayer.type === 'bot') {

            move = activePlayer.makeMove();
            otherPlayer.gameboard.receiveAttack(move);
            render();
            turn();

        } else if (activePlayer.type === 'person') {

            document.querySelectorAll('#bot .col').forEach( col => {
                col.addEventListener('click', (event) => {

                let val = event.target.id
                if (val !== '') {

                    move = val.split("-").map(char => Number(char));
                    activePlayer.attempts.push(move);    
                    otherPlayer.gameboard.receiveAttack(move);
                    
                    render();
                    turn();
                    }
                });
            });
        }        
    }

    const render = (msg) => {

        let display = document.getElementById('display');
        display.innerHTML = "";

        let msgDiv = document.getElementById('message');
        msg = msg || "";
        msgDiv.textContent = msg;

        let players = [player1, player2];

        for (let player of players) {

        // render gameboard for player 1
            let gameboardDiv = document.createElement('div');
            gameboardDiv.classList.add('gameboard');
            gameboardDiv.setAttribute('id', player.type);

            let length = player.gameboard.board.length;

            for (let i=0; i<length; i++){
                let row = document.createElement('div');
                row.classList.add('row');

                for (let j = 0; j < length; j++) {
                    let col = document.createElement('span');
                    col.classList.add('col');
                    col.setAttribute('id', `${i}-${j}`);

                    if (player.gameboard.board[i][j] === 'S'){
                        if (player.type === 'person'){
                            col.classList.add('ship');
                        }
                    }

                    if (player.gameboard.board[i][j] === 'M') {
                        col.classList.add('missed');
                    }

                    if (player.gameboard.board[i][j] === 'X') {
                        col.classList.add('hit');
                    }

                    row.appendChild(col);
                }
                gameboardDiv.appendChild(row);
            }
            display.appendChild(gameboardDiv);
        }
    }


    return { setup }
}

let battleship = Battleship();
battleship.setup();

//module.exports = { Battleship }