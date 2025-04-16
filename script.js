
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
    //Starts new game
    const newGame = function() {
        let gameOver = false;
        let currentPlayer = "X";
        let moves = 0; 
    }
    
    //checks for blank space within range,
    const addMarker = (column, row) => {
        const openSpace = (col, rw) => {
            if (rw < 0 || rw >= board.length || col < 0 || col >= board[0].length) {
                console.log("Marker not added!")
                return false;
            }            
            return board[rw][col] === '';
        }

        if (openSpace(column, row)){
            board[row][column] = "X";
            console.log("Marker added!")
            console.log(createBoard.getBoard())
        }
    }

    return {
        getBoard, newGame, addMarker
    };
})(); //IIFE





// const printBoard = (function() {
//     console.log(createBoard.getBoard())
// });
