document.getElementById('names-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (player1Name && player2Name) {
        // Salva i nomi nei parametri dell'URL e avvia il gioco
        const queryParams = new URLSearchParams({ player1: player1Name, player2: player2Name });
        window.location.href = `game.html?${queryParams.toString()}`;
    }
});