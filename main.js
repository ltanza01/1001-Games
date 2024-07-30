const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Ottieni i nomi dei giocatori dalla query string
const urlParams = new URLSearchParams(window.location.search);
const player1Name = urlParams.get('player1');
const player2Name = urlParams.get('player2');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'T'; // 'T' per pareggio
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        isGameActive = false;
        if (winner === 'T') {
            status.textContent = 'Pareggio!';
        } else {
            const winnerName = winner === 'X' ? player1Name : player2Name;
            status.textContent = `${winnerName} ha vinto!`;
            // Apri la nuova pagina con la GIF dei fuochi d'artificio
            window.open('victory.html?winner=' + encodeURIComponent(winnerName), '_blank');
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const currentName = currentPlayer === 'X' ? player1Name : player2Name;
        status.textContent = `È il turno di ${currentName}`;
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    status.textContent = `È il turno di ${player1Name}`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Inizializza il messaggio di stato
status.textContent = `È il turno di ${player1Name}`;