// game.js (test)

const { getGame, newGame, isPlayerValid, getPlayerGame, numberOfPlays, playerDidPlay, isPositionFree, totalOfPlays, didGameEnd, evaluatePlayerGame, evaluateGameForWinners, evaluateGameForWinnersIfNeeded } = require('../src/game');
const { PLAYER_1, PLAYER_2 } = require('../src/const/players');

const NEW_GAME = {
    firstPlayerGame: [],
    secondPlayerGame: [],
    isGameOver: false,
};

// test getGame()

test('Get game, no initialise, returns undefined', () => {
    expect(getGame()).toBe(undefined);
});

test('Get game, initialised, returns new game', () => {
    newGame();
    expect(getGame()).toStrictEqual(NEW_GAME);
});

test('Player 1 plays, get game, returns current game', () => {
    const EXPECTED_GAME = {
        firstPlayerGame: [5],
        secondPlayerGame: [],
        isGameOver: false,
    }
    newGame();
    playerDidPlay(PLAYER_1, 5);
    expect(getGame()).toStrictEqual(EXPECTED_GAME);
});

test('Player 2 plays, get game, returns current game', () => {
    const EXPECTED_GAME = {
        firstPlayerGame: [],
        secondPlayerGame: [3],
        isGameOver: false,
    }
    newGame();
    playerDidPlay(PLAYER_2, 3);
    expect(getGame()).toStrictEqual(EXPECTED_GAME);
});

test('Player 1 & 2 plays, get game, returns current game', () => {
    const EXPECTED_GAME = {
        firstPlayerGame: [5],
        secondPlayerGame: [3],
        isGameOver: false,
    }
    newGame();
    playerDidPlay(PLAYER_1, 5);
    playerDidPlay(PLAYER_2, 3);
    expect(getGame()).toStrictEqual(EXPECTED_GAME);
});

// test newGame()

test('Request for a new game, returns new game', () => {
    expect(newGame()).toStrictEqual(NEW_GAME);
});

// test isPlayerValid()

test('Enter valid player, returns true', () => {
    expect(isPlayerValid(PLAYER_1)).toBe(true);
    expect(isPlayerValid(PLAYER_2)).toBe(true);
});

test('Enter invalid player, returns false', () => {
    expect(isPlayerValid(3)).toBe(false);
});

// test getPlayerGame()

test('Player plays, getPlayerGame, returns current player game', () => {
    newGame();
    
    playerDidPlay(PLAYER_1, 3);
    expect(getPlayerGame(PLAYER_1)).toStrictEqual([3]);

    playerDidPlay(PLAYER_2, 5);
    expect(getPlayerGame(PLAYER_2)).toStrictEqual([5]);
});

// test numberOfPlays()

test('Test number of plays', () => {
    newGame();

    expect(numberOfPlays(PLAYER_1)).toBe(0);
    expect(numberOfPlays(PLAYER_2)).toBe(0);
    
    playerDidPlay(PLAYER_1, 3);
    expect(numberOfPlays(PLAYER_1)).toBe(1);
    expect(numberOfPlays(PLAYER_2)).toBe(0);

    playerDidPlay(PLAYER_2, 5);
    expect(numberOfPlays(PLAYER_1)).toBe(1);
    expect(numberOfPlays(PLAYER_2)).toBe(1);

    playerDidPlay(PLAYER_1, 6);
    expect(numberOfPlays(PLAYER_1)).toBe(2);
    expect(numberOfPlays(PLAYER_2)).toBe(1);
});

// test isPositionFree()

test('Position is free in a new game', () => {
    newGame();

    for (var i = 1; i<=9; i++) {
        expect(isPositionFree(i)).toBe(true);
    }
});

test('Player play, position is not free', () => {
    newGame();

    playerDidPlay(PLAYER_1, 4);
    
    for (var i = 1; i<=9; i++) {
        if (i == 4) {
            expect(isPositionFree(i)).toBe(false);
        } else {
            expect(isPositionFree(i)).toBe(true);
        }
    }
});

// test totalOfPlays()

test('Test total of plays', () => {
    newGame();

    expect(totalOfPlays()).toBe(0);
    
    playerDidPlay(PLAYER_1, 3);
    expect(totalOfPlays()).toBe(1);

    playerDidPlay(PLAYER_2, 5);
    expect(totalOfPlays()).toBe(2);

    playerDidPlay(PLAYER_1, 6);
    expect(totalOfPlays()).toBe(3);
});

// test didGameEnd()

test('Game is Over', () => {
    newGame();

    expect(didGameEnd()).toBe(false);
    for (var i = 1; i<=9; i++) {
        playerDidPlay(PLAYER_1, i);
    }
    expect(didGameEnd()).toBe(true);
});

// test evaluatePlayerGame()

test('Evaluate Player Game', () => {
    newGame();
    var game;

    // Game started
    game = getPlayerGame(PLAYER_1);
    expect(evaluatePlayerGame(game)).toBe(false);

    // Player plays
    playerDidPlay(PLAYER_1, 1);
    playerDidPlay(PLAYER_1, 2);
    playerDidPlay(PLAYER_1, 3);

    // Evaluate
    game = getPlayerGame(PLAYER_1);
    expect(evaluatePlayerGame(game)).toBe(true);
});

// test evaluateGameForWinners()

test('Player 1 win, Test Evaluate game', () => {
    newGame();

    expect(evaluateGameForWinners()).toBe(false);
    playerDidPlay(PLAYER_1, 1);
    playerDidPlay(PLAYER_1, 2);
    playerDidPlay(PLAYER_1, 3);
    expect(evaluateGameForWinners()).toBe(true);
});

test('Player 2 win, Test Evaluate game', () => {
    newGame();

    expect(evaluateGameForWinners()).toBe(false);
    playerDidPlay(PLAYER_2, 1);
    playerDidPlay(PLAYER_2, 2);
    playerDidPlay(PLAYER_2, 3);
    expect(evaluateGameForWinners()).toBe(true);
});

// test evaluateGameForWinnersIfNeeded()

test('Evaluate only when total of plays is 5', () => {
    newGame();

    expect(evaluateGameForWinnersIfNeeded()).toBe(false);
    playerDidPlay(PLAYER_2, 1);
    expect(evaluateGameForWinnersIfNeeded()).toBe(false);
    playerDidPlay(PLAYER_1, 4);
    expect(evaluateGameForWinnersIfNeeded()).toBe(false);
    playerDidPlay(PLAYER_2, 3);
    expect(evaluateGameForWinnersIfNeeded()).toBe(false);
    playerDidPlay(PLAYER_1, 5);
    expect(evaluateGameForWinnersIfNeeded()).toBe(false);
    playerDidPlay(PLAYER_2, 2);
    expect(evaluateGameForWinnersIfNeeded()).toBe(true);
});