const createGameBoard = () => {
    // Initialize the board as an array with 100 tiles
    const gameBoard = [];

    // Initialize the board
    for (let i = 0; i < 100; i++) {
        gameBoard[i] = {
            tileNumber: i + 1,
            snake: null,
            ladder: null,
        };
    }

    // Define snakes and ladders
    gameBoard[36].snake = 2;
    gameBoard[27].snake = 17;
    gameBoard[47].snake = 31;
    gameBoard[74].snake = 42;
    gameBoard[93].snake = 70;
    gameBoard[95].snake = 41;

    gameBoard[4].ladder = 56;
    gameBoard[12].ladder = 50;
    gameBoard[14].ladder = 55;
    gameBoard[22].ladder = 58;
    gameBoard[41].ladder = 79;
    gameBoard[54].ladder = 88;

    // Function to roll a dice
    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    return {
        board: gameBoard,
        // Function to move a player to a new position
        movePlayer(player, currentPosition, newPosition) {
            if (currentPosition >= 0 && currentPosition < 100) {
                gameBoard[currentPosition].player = null; // Remove the player from the current position
            }
            // Place the player on the new position
            if (newPosition >= 0 && newPosition < 100) {
                gameBoard[newPosition].player = player;
            }
        },
        // Function to roll the dice and return the result
        rollDice,
    };
};

// Create the game board
const game = createGameBoard();

// Define and initialize players
const player1 = "Player 1";
const player2 = "Player 2";

// Initialize player positions
let player1Position = 0;
let player2Position = 0;

// Function to simulate a player's turn
const playerTurn = (playerName, playerPosition) => {
    const diceRoll = game.rollDice();
    const newPosition = playerPosition + diceRoll;
    console.log(`${playerName} rolled a ${diceRoll}.`);

    // check for win and encounters with snake anbd ladder
    if (newPosition < 100) {
        const destinationTile = game.board[newPosition];
        if (destinationTile.snake) {
            console.log(`${playerName} encountered a snake and moved to tile ${destinationTile.snake}.`);
            game.movePlayer(playerName, newPosition, destinationTile.snake - 1);
        } else if (destinationTile.ladder) {
            console.log(`${playerName} found a ladder and moved to tile ${destinationTile.ladder}.`);
            game.movePlayer(playerName, newPosition, destinationTile.ladder - 1);
        } else {
            game.movePlayer(playerName, playerPosition, newPosition);
        }
    } else {
        console.log(`${playerName} won the game!`);
    }
};

// Simulate the game
while (player1Position < 99 && player2Position < 99) {
    playerTurn(player1, player1Position);
    player1Position = game.board.findIndex((tile) => tile.player === player1);

    playerTurn(player2, player2Position);
    player2Position = game.board.findIndex((tile) => tile.player === player2);
}
