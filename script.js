
//Create gameboard and populate with empty cells
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = '';
        }
    }
    return board;
}

console.log(gameBoard());