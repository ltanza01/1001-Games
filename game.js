// Ottieni i parametri dell'URL
const urlParams = new URLSearchParams(window.location.search);
const player1Name = urlParams.get('player1');
const player2Name = urlParams.get('player2');
const gameMode = urlParams.get('mode');

// Elementi della pagina
const turnDisplay = document.getElementById('turn');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

// Stato del gioco
let currentPlayer = 'X'; // 'X' o 'O'
let board = ['', '', '', '', '', '', '', '', '']; // Stato della griglia
let isGameOver = false;

// Funzioni di gioco
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

    // Controlla vittoria o pareggio
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

    // Cambia turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();

    // Gestisci il turno del computer se necessario
    if (gameMode === 'player-vs-computer' && currentPlayer === 'O' && !isGameOver) {
        setTimeout(computerPlay, 500); // Ritardo per il computer
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // righe
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonne
        [0, 4, 8], [2, 4, 6]             // diagonali
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function computerPlay() {
    // Genera una lista di mosse disponibili
    const availableMoves = board.map((value, index) => value === '' ? index : null).filter(value => value !== null);

    if (availableMoves.length === 0) return;

    // Seleziona una mossa casuale tra quelle disponibili
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    // Aggiorna la griglia e il display
    board[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('O');

    // Controlla vittoria o pareggio
    if (checkWin()) {
        window.location.href = `victory.html?winner=${encodeURIComponent(player2Name)}&mode=${gameMode}`;
        isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
        turnDisplay.textContent = 'Pareggio!';
        isGameOver = true;
    } else {
        // Cambia turno
        currentPlayer = 'X';
        updateTurnDisplay();
    }
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

// Imposta il turno iniziale
updateTurnDisplay();

// Aggiungi i listener per le celle e il pulsante di reset
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);