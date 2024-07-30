class Menu {
    constructor() {
        this.player1Container = document.getElementById('player1-container');
        this.player2Container = document.getElementById('player2-container');
        this.difficultyContainer = document.getElementById('difficulty-container');
        this.gameModeSelect = document.getElementById('game-mode');
        this.submitButton = document.getElementById('submit-button');
        
        this.init();
    }

    init() {
        this.updateVisibility();
        this.gameModeSelect.addEventListener('change', () => this.updateVisibility());
        document.getElementById('menu-form').addEventListener('submit', (event) => this.handleSubmit(event));
    }

    updateVisibility() {
        const selectedMode = this.gameModeSelect.value;
        if (selectedMode === 'player-vs-computer') {
            this.player1Container.classList.remove('hidden');
            this.player2Container.classList.add('hidden');
            this.difficultyContainer.classList.remove('hidden');
            this.submitButton.classList.remove('hidden');
        } else if (selectedMode === 'player-vs-player') {
            this.player1Container.classList.remove('hidden');
            this.player2Container.classList.remove('hidden');
            this.difficultyContainer.classList.add('hidden');
            this.submitButton.classList.remove('hidden');
        } else {
            this.player1Container.classList.add('hidden');
            this.player2Container.classList.add('hidden');
            this.difficultyContainer.classList.add('hidden');
            this.submitButton.classList.add('hidden');
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const player1 = document.getElementById('player1').value;
        const player2 = this.gameModeSelect.value === 'player-vs-computer' ? 'Computer' : document.getElementById('player2').value;
        const gameMode = this.gameModeSelect.value;
        const difficulty = document.getElementById('difficulty').value;
        
        if (player1) {
            const url = `game.html?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}&mode=${gameMode}&difficulty=${difficulty}`;
            window.location.href = url;
        } else {
            alert("Per favore, inserisci il nome del Giocatore 1.");
        }
    }
}

// Initialize the Menu class when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => new Menu());