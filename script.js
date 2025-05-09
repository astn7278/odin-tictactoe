//Add names
const player1 = (function() {
    let name1 = 'X'
    const form = document.querySelector('#playerNameInput');
    const input = document.querySelector('#playerInput');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh
        name1 = input.value;
        console.log('Submitted:', name1);
        form.style.display = 'none';

    });

    return {
        getName: () => name1
    }
})();

const player2 = (function() {
    let name2 = 'O'
    const form = document.querySelector('#playerNameInput2');
    const input = document.querySelector('#playerInput2');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh
        name2 = input.value;
        console.log('Submitted:', name2);
        form.style.display = 'none';
    });

    return {
        getName: () => name2
    }
})();

//Create game board and populate with empty cells
const createBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    const setBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = '';
            }
        }
    };

    setBoard();
   
    const status = document.querySelector('#status');
    const resetButton = document.querySelector('#reset-button');

    //Creates and returns copy of board
    const getBoard = () => board.map(row => [...row]);
    
    let running = true;
    let currentPlayer = "X";
    let moves = 0; 
    
    //Name getter
    const getPlayerName = () => currentPlayer === "X" ? player1.getName() : player2.getName();

    
    //checks for blank space within range
    const addMarker = (column, row) => {
        const openSpace = (col, rw) => {
            if (rw < 0 || rw >= board.length || col < 0 || col >= board[0].length) {
                console.log("Invalid spot");
                status.textContent = "Invalid spot";
                return false;
            }
            
            if (board[row][column] !== '' && running){
                console.log("Spot filled already");
                status.textContent = "Spot filled already";
                return false;
            }
            //returns true if empty
            return board[rw][col] === '';
        }
        //places marker, logs board, increments moves, switches players
        if (openSpace(column, row) && running){
            board[row][column] = currentPlayer;
            moves++;
            status.textContent = `${getPlayerName()}'s marker added!`
            console.log("Marker added!");
            console.log(createBoard.getBoard());

            const cellButtons = document.querySelectorAll('.cell');
            cellButtons.forEach((cell, index) => {
                const row = Math.floor(index / 3);
                const column = index % 3;
                cell.textContent = board[row][column];
            })

            //check for winning pattern
            const checkWin = () => {
                const board = createBoard.getBoard();
                const lines = [
                    // Rows
                    [ [0,0], [0,1], [0,2] ],
                    [ [1,0], [1,1], [1,2] ],
                    [ [2,0], [2,1], [2,2] ],
                    // Columns
                    [ [0,0], [1,0], [2,0] ],
                    [ [0,1], [1,1], [2,1] ],
                    [ [0,2], [1,2], [2,2] ],
                    // Diagonals
                    [ [0,0], [1,1], [2,2] ],
                    [ [0,2], [1,1], [2,0] ],
                ];
                //check for matches, return player letter if true otherwise false
                for (let line of lines) {
                    const [a, b, c] = line;
                    if (
                        board[a[0]][a[1]] &&
                        board[a[0]][a[1]] === board[b[0]][b[1]] &&
                        board[a[0]][a[1]] === board[c[0]][c[1]]
                    ) {
                        return board[a[0]][a[1]];
                    }
                }
                return null;
            };
            
            const winCheck = checkWin();
                if (winCheck) {
                    winner = winCheck;
                    running = false;
                    status.textContent = `${getPlayerName()} wins!`
                    console.log(`Player ${winner} wins!`);
                } else if (moves === 9) {
                    running = false;
                    console.log("Draw game");
                    status.textContent = "Draw game"
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            } else if (!running) {
                status.textContent = "Game is already over"
                console.log('Game is already over');
            }
        } 
        
        const restartGame = () => {
            setBoard();
            running = true;
            currentPlayer = "X";
            moves = 0; 
            status.textContent = "Game reset!"
            console.log("Game reset!");
            
            console.log(createBoard.getBoard());
            const cellButtons = document.querySelectorAll('.cell');
            cellButtons.forEach((cell) => {
                cell.textContent = "";
            })
        };
        
        return {
            getBoard, addMarker, restartGame
        };
    })(); //IIFE

//Reset button
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener('click', () => {
    createBoard.restartGame();
  });
   
//move(x,y)
const move = createBoard.addMarker;

//Cell buttons
const cellButtons = document.querySelectorAll('.cell');
cellButtons.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.addEventListener('click', () => {
        move(col, row);
    })
});

//test moves (X wins)
// move(0,0)
// move(0,2)
// move(1,0)
// move(2,1)
// move(2,0)


