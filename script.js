
//Create gameboard and populate with empty cells
const createBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = '';
        }
    }
    
    //Creates and returns copy of board
    const getBoard = () => board.map(row => [...row]);
    
    let gameOver = false;
    let currentPlayer = "X";
    let moves = 0; 
    
    
    //checks for blank space within range
    const addMarker = (column, row) => {
        const openSpace = (col, rw) => {
            if (rw < 0 || rw >= board.length || col < 0 || col >= board[0].length) {
                console.log("Invalid spot");
                return false;
            }
            
            if (board[row][column] !== ''){
                console.log("Spot filled already");
                return false;
            }

            return board[rw][col] === '';
        }
        //places marker and switches players
        if (openSpace(column, row)){
            board[row][column] = currentPlayer;
            console.log("Marker added!");
            console.log(createBoard.getBoard());
            moves++;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        } 
    }

    return {
        getBoard, addMarker
    };
})(); //IIFE





// const printBoard = (function() {
//     console.log(createBoard.getBoard())
// });
