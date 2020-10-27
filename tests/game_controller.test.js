// game_controller.js

const { PLAYER_1, PLAYER_2 } = require("../src/const/players");
const { newGame } = require("../src/game");
const { nextPlayer, playIfFree } = require("../src/game_controller");

// test nextPlayer()

test('New Game, Next Player is PLAYER_1', () => {
    newGame();

    const event = nextPlayer();
    expect(event.NEXT_PLAYER).toBe(PLAYER_1);
});

test('New Game, Player 1 played, Next Player is PLAYER_2', () => {
    newGame();
    
    var event = nextPlayer();
    expect(event.NEXT_PLAYER).toBe(PLAYER_1);

    playIfFree(PLAYER_1, 1);

    event = nextPlayer();
    expect(event.NEXT_PLAYER).toBe(PLAYER_2);
});

// playIfFree()

test('New Game, No plays, Position is free', () => {
    newGame();
    var game;

    game = playIfFree(PLAYER_1, 1);
    expect(game.GAME.firstPlayerGame).toStrictEqual([1]);
});

test('New Game, Player 1 plays, Position is taken', () => {
    newGame();
    var game;

    // First play
    game = playIfFree(PLAYER_1, 1);
    expect(game.GAME.firstPlayerGame).toStrictEqual([1]);

    // Play again, nothing changes
    game = playIfFree(PLAYER_1, 1);
    expect(game.GAME.firstPlayerGame).toStrictEqual([1]);
});