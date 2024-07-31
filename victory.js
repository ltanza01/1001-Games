document.addEventListener('DOMContentLoaded', () => {
    const victoryMessage = document.getElementById('victory-message');
    const newGameButton = document.getElementById('new-game');
    const restartGameButton = document.getElementById('restart-game');
    const urlParams = new URLSearchParams(window.location.search);
    
    const winnerName = urlParams.get('winner');
    

    if (winnerName) {
        victoryMessage.textContent = `${winnerName} ha Vinto!`;
    }



    newGameButton.addEventListener('click', () => {
        window.location.href = 'menu.html'; 
    });


    restartGameButton.addEventListener('click', () => {
        
        const player1 = urlParams.get('player1');
        const player2 = urlParams.get('player2');
        const mode = urlParams.get('mode');
        const difficulty = urlParams.get('difficulty');

        if (player1 && player2) {
            const restartUrl = `game.html?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}&mode=${encodeURIComponent(mode)}&difficulty=${encodeURIComponent(difficulty)}&restart=true`;
            window.location.href = restartUrl;
        } else {
            console.error('Parametri di riavvio mancanti.');
        }
    });
});