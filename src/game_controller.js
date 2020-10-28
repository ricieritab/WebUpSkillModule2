// game_controller.js

const { getPlayerGame, isPositionFree, getGame, playerDidPlay } = require('./game.js');
const { PLAYER_1, PLAYER_2 } = require('./const/players.js');

function play(player, position) {
    playerDidPlay(player, position);
    return {'GAME': getGame()};
} 

// Exports

const nextPlayer = () => {
    const firstPlayerGame = getPlayerGame(PLAYER_1);
    const secondPlayerGame = getPlayerGame(PLAYER_2);

    const firstPlayerNumberOfPlays = firstPlayerGame.length;
    const secondPlayerNumberOfPlays = secondPlayerGame.length;

    const nextPlayerToPlay = ((firstPlayerGame.length + secondPlayerGame.length) % 2) === 0 ? PLAYER_1 : PLAYER_2;
    return {'NEXT_PLAYER': nextPlayerToPlay};
}

const playIfFree = (player, position) => {
    if (isPositionFree(position)) {
        return play(player, position);
    }
    return {'GAME': getGame()};
}

module.exports = {
    nextPlayer, playIfFree
};