document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const player1Name = urlParams.get('player1');
    const player2Name = urlParams.get('player2');
    const gameMode = urlParams.get('mode');
    const difficulty = urlParams.get('difficulty');


    const turnDisplay = document.getElementById('turn-indicator');
    const cells = document.querySelectorAll('.cell'); 
    const resetButton = document.getElementById('reset-game');

    
    let currentPlayer = 'X'; 
    let board = ['', '', '', '', '', '', '', '', '']; 
    let isGameOver = false;

    
    function updateTurnDisplay() {
        if (isGameOver) return;
        const currentName = currentPlayer === 'X' ? player1Name : player2Name;
        turnDisplay.textContent = `È il turno di ${currentName}`;
    }

    function handleClick(event) {
        const index = Array.from(cells).indexOf(event.target);

        if (board[index] !== '' || isGameOver) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer);

       
        if (checkWin()) {
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            window.location.href = `victory.html?winner=${encodeURIComponent(winnerName)}&mode=${gameMode}`;
            isGameOver = true;
            return;
        } else if (board.every(cell => cell !== '')) {
            turnDisplay.textContent = 'Pareggio!';
            isGameOver = true;
            return;
        }

        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnDisplay();

        
        if (gameMode === 'player-vs-computer' && currentPlayer === 'O' && !isGameOver) {
            setTimeout(() => computerPlay(difficulty), 500); 
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function computerPlay(difficulty) {
        let move;

        if (difficulty === 'easy') {
            move = getRandomMove();
        } else if (difficulty === 'medium') {
            move = getMediumMove();
        } else {
            move = getHardMove();
        }

        if (move === undefined) return;

        
        board[move] = 'O';
        cells[move].textContent = 'O';
        cells[move].classList.add('O');

        
        if (checkWin()) {
            window.location.href = `victory.html?winner=${encodeURIComponent(player2Name)}&mode=${gameMode}`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            turnDisplay.textContent = 'Pareggio!';
            isGameOver = true;
        } else {
            
            currentPlayer = 'X';
            updateTurnDisplay();
        }
    }

    function getRandomMove() {
        const availableMoves = board.map((value, index) => value === '' ? index : null).filter(value => value !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function getMediumMove() {
        
        let move = findWinningMove('O');
        if (move !== undefined) return move;

        
        move = findWinningMove('X');
        if (move !== undefined) return move;

        
        return getRandomMove();
    }

    function getHardMove() {
        
        let move = findWinningMove('O');
        if (move !== undefined) return move;

        
        move = findWinningMove('X');
        if (move !== undefined) return move;

       
        return findBestMove();
    }

    function findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === player && board[b] === player && board[c] === '') return c;
            if (board[a] === player && board[b] === '' && board[c] === player) return b;
            if (board[a] === '' && board[b] === player && board[c] === player) return a;
        }
        return undefined;
    }

    function findBestMove() {
        
        if (board[4] === '') return 4;

        
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(index => board[index] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        return getRandomMove();
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        isGameOver = false;
        updateTurnDisplay();
    }

    
    updateTurnDisplay();

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});