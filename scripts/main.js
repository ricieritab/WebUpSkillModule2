// main.js

const allSquares = elementsByClassName("square");

function main() {
    allSquares
        .forEach(addGameClickListeners);

    _playerToPlay("1");
}

function addGameClickListeners(item, _) {
    item.addEventListener('click', function() {
        _playerSelectedSquare(this);
    });
}

main();

// Private Properties

let _gameOver = false;
let _lastPlayer;
let _playerOneGame = [];
let _playerTwoGame = [];

// Private Functions (Game)

function _feedback(text) {
    $("feedback").textContent = text;
}

function _playerToPlay(playerNo) { 
    _feedback(`Player ${playerNo} turn`); 
}

function _isSquareFree(square) {
    return square.textContent === "";
}

function _isAllSquareFilled() {
    return allSquares
        .filter((x) => x.textContent === "")
        .length === 0;
}

function _isMatchOver() {
    return _didPlayerWin(_playerOneGame) || _didPlayerWin(_playerTwoGame);
}

function _evaluateMatch() {
    if (_didPlayerWin(_playerOneGame)) {
        _feedback("Player 1 won! 🎉");
        _gameOver = true;
    } else if (_didPlayerWin(_playerTwoGame)) {
        _feedback("Player 2 won! 🎉");
        _gameOver = true;
    }
}

function _endGame() {
    _feedback("🤷🏻‍♂️");
    _gameOver = true;
}

function _resetGame() {
    _gameOver = false;
    _lastPlayer = undefined;
    _playerOneGame = [];
    _playerTwoGame = [];

    allSquares
        .forEach((el) => {
            el.textContent = "";
        });
}

// Private Functions (Player)

function _isMatchStarted() {
    return _lastPlayer !== undefined;
}

function _isLastPlayerCross() {
    return _lastPlayer.shape === "❌";
}

function _getPlayer() {
    if (_isMatchStarted()) {
        return _getNextPlayer();
    }
    // First player is always Cross
    return new Cross();
}

function _getNextPlayer() {
    if (_isLastPlayerCross()) {
        return new Circle();
    } else {
        return new Cross();
    }
}

function _updateLastPlayer(player) {
    _lastPlayer = player;
}

function _playerSelectedSquare(square) {
    if (_gameOver) {
        _resetGame();
    }
    if (!_isSquareFree(square)) {
        return;
    }

    const nextPlayer = _getPlayer();
    const shape = nextPlayer.shape;
    const position = square.getAttribute("position");

    square.textContent = shape;

    _playerDidFinishPlay(nextPlayer, position);
}

function _playerDidFinishPlay(player, position) {
    if (_isAllSquareFilled()) {
        _endGame();
        return;
    }

    _updateLastPlayer(player);
    _savePositionToPlayerGame(parseInt(position));

    if (_isMatchOver()) {
        _evaluateMatch();
        return;
    }

    _updateTurnFeedback();
}

function _savePositionToPlayerGame(position) {
    if (_isLastPlayerCross()) {
        _playerOneGame.push(position);
    } else {
        _playerTwoGame.push(position);
    }
}

function _updateTurnFeedback() {
    if (_isLastPlayerCross()) {
        _playerToPlay("2");
    } else {
        _playerToPlay("1");
    }
}

function _didPlayerWin(array) {
    array.sort();

    return validCombinations
        .filter((x) => arrayEquals(x, array))
        .length > 0;
}