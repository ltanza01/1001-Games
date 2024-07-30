document.addEventListener('DOMContentLoaded', () => {
    const victoryMessage = document.getElementById('victory-message');
    const newGameButton = document.getElementById('new-game');
    const restartGameButton = document.getElementById('restart-game');
    const urlParams = new URLSearchParams(window.location.search);
    const winnerName = urlParams.get('winner');
    const isRestart = urlParams.get('restart');
    if (winnerName) {
        victoryMessage.textContent = `${winnerName} ha Vinto!`;
    }

    if (isRestart === 'true') {
        newGameButton.style.display = 'none';
        restartGameButton.style.display = 'block';
    } else {
        newGameButton.style.display = 'block';
        restartGameButton.style.display = 'none';
    }

    newGameButton.addEventListener('click', () => {
        window.location.href = 'menu.html'; 
    });


    restartGameButton.addEventListener('click', () => {
        window.location.href = `game.html?player1=${urlParams.get('player1')}&player2=${urlParams.get('player2')}&mode=${urlParams.get('mode')}&difficulty=${urlParams.get('difficulty')}&first-move=${urlParams.get('first-move')}&restart=true`;
    });
});