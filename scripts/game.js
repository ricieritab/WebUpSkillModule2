// game.js

const { PLAYER_1, PLAYER_2 } = require("./players");

const VALID_COMBINATIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var game;

// Exports

const getGame = () => {
    return game;
}
const newGame = () => {
    game = {
        firstPlayerGame: [],
        secondPlayerGame: [],
        isGameOver: false,
    };
    return game;
}

const isPlayerValid = (player) => {
    return player == PLAYER_1 || player == PLAYER_2;
}

const getPlayerGame = (player) => {
    return player == PLAYER_1 ? 
        game.firstPlayerGame : 
        game.secondPlayerGame;
}

const numberOfPlays = (player) => {
    return getPlayerGame(player).length;
};

const playerDidPlay = (player, position) => {
    let currentGame = game;
    if (player == PLAYER_1) {
        currentGame.firstPlayerGame.push(position);
    } else {
        currentGame.secondPlayerGame.push(position);
    }
    game = currentGame;

    return game;
}

const isPositionFree = (position) => {
    const firstPlayerPlayedPosition = game.firstPlayerGame.filter((x) => x == position);
    const secondPlayerPlayedPosition = game.secondPlayerGame.filter((x) => x == position);
    const canPlay = firstPlayerPlayedPosition.length == 0 && secondPlayerPlayedPosition.length == 0;

    return canPlay;
}

const totalOfPlays = () => {
    const firstPlayerPlays = game.firstPlayerGame.length;
    const secondPlayerPlays = game.secondPlayerGame.length;
    const totalOfPlays = firstPlayerPlays + secondPlayerPlays;

    return totalOfPlays;
}

const didGameEnd = () => {
    const numberOfPositions = 9
    return totalOfPlays() == numberOfPositions;
}

const evaluatePlayerGame = (playerGame) => {
    if (playerGame.length == 0) {
        return false;
    }
    const validCombinationsIntersected = VALID_COMBINATIONS.filter( x => {
        const playerGameIntersected = playerGame.filter( y => x.includes(y) );
        const didWin = playerGame.length == playerGameIntersected.length;
        return didWin;
    });
    const didWinGame = validCombinationsIntersected.length > 0;
    return didWinGame;
}

const evaluateGameForWinners = () => {
    const firstPlayerDidWin = evaluatePlayerGame(game.firstPlayerGame);
    const secondPlayerDidWin = evaluatePlayerGame(game.secondPlayerGame);
    return firstPlayerDidWin || secondPlayerDidWin;
}

const evaluateGameForWinnersIfNeeded = () => {
    if(totalOfPlays() < 5) {
        return false;
    }
    return evaluateGameForWinners();
}

module.exports = { 
    getGame, 
    newGame, 
    isPlayerValid,
    getPlayerGame,
    numberOfPlays,
    playerDidPlay,
    isPositionFree,
    totalOfPlays,
    didGameEnd,
    evaluatePlayerGame,
    evaluateGameForWinners,
    evaluateGameForWinnersIfNeeded
}