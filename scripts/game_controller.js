// game_controller.js

const { getPlayerGame, isPositionFree, getGame, playerDidPlay } = require('./game.js');
const { PLAYER_1, PLAYER_2 } = require('./players.js');

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

    const didPlayFirstPlayer = firstPlayerGame.length > 0;
    const didPlaySecondPlayer = secondPlayerGame.length > 0;
    
    const isNewGame = !didPlayFirstPlayer && !didPlaySecondPlayer;
    if (isNewGame) {
        return {'NEXT_PLAYER': PLAYER_1};
    }

    return firstPlayerNumberOfPlays < secondPlayerNumberOfPlays 
        ? {'NEXT_PLAYER': PLAYER_1} : {'NEXT_PLAYER': PLAYER_2};
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