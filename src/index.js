// main.js

const { elementById, elementsByClassName, addFilterToNodeList } = require('./utils');
const { newGame } = require('./game');
const { nextPlayer, playIfFree } = require('./game_controller');

function main() {

    // Add listeners
    function addGameClickListeners(item, _) {
        item.addEventListener('click', () => {
            playerSelectedSquare(this);
        });
    }

    const allSquares = elementsByClassName("square");
    allSquares
        .forEach(addGameClickListeners);
    
    // Game play

    function playerSelectedSquare(square) {
        const nextPlayer = nextPlayer();
        const position = square.getAttribute("position");
        const result = playIfFree(nextPlayer, position);
        updateGameUI(result.GAME);
        updateBoard();
    }

    function updateGameUI(game) {
        allSquares.forEach((square, index) => {
            const position = index + 1;
            updateGamePosition(game, position)
        });
    }

    function updateGameSquarePosition(game, square, position) {
        const firstPlayerGame = game.firstPlayerGame.filter( x => x == position );
        const secondPlayerGame = game.secondPlayerGame.filter( x => x == position );

        if (firstPlayerGame.lenght > 0 ) {
            square.textContent = "❌";
        } 
        else if (secondPlayerGame.lenght > 0) {
            square.textContent = "⭕️";
        }
    }

    // Board

    function updateBoard() {
        const event = nextPlayer();
        const player = event.NEXT_PLAYER;
        elementById("feedback").textContent = `Player ${player} turn`
    }

    // Spawn

    addFilterToNodeList();
    newGame();
    updateBoard();
}

main();