/**
 * GameTris – Documentazione
 *
 * Questo componente React Native implementa il gioco del Tris (Tic-Tac-Toe) per due giocatori (umani o contro il computer) su un unico dispositivo.
 * Gestisce la logica di gioco, il turno dei giocatori, la modalità contro il computer con tre livelli di difficoltà, la verifica della vittoria o del pareggio e la navigazione alla schermata di vittoria.
 *
 * ---
 *
 * Props principali:
 * - route.params: Oggetto che contiene player1, player2, mode (player-vs-player o player-vs-computer), difficulty, restart.
 * - navigation: Oggetto di navigazione per cambiare schermata.
 *
 * Stati principali:
 * - board: Array di 9 celle che rappresentano la griglia di gioco.
 * - currentPlayer: Giocatore corrente ('X' o 'O').
 * - isGameOver: Indica se la partita è terminata.
 *
 * Funzioni principali:
 * - handleClick(): Gestisce la selezione di una cella da parte del giocatore.
 * - checkWin(): Verifica se c'è una combinazione vincente sulla griglia.
 * - computerPlay(): Gestisce la logica della CPU in base alla difficoltà selezionata.
 * - getRandomMove(), getMediumMove(), getHardMove(): Algoritmi per la scelta della mossa della CPU.
 * - resetGame(): Reimposta la griglia e lo stato per una nuova partita.
 *
 * UI:
 * - Visualizza la griglia di gioco, il turno corrente, i pulsanti per resettare la griglia e tornare al menu.
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il componente è pensato per l’uso locale su un unico dispositivo.
 *
 * In sintesi:
 * Gestisce una partita completa di Tris, con supporto per due giocatori o contro il computer, dalla disposizione iniziale fino alla vittoria o al pareggio.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './TrisStyles.js';
export default function GameTris({ route, navigation }) {
  const { player1, player2, mode, difficulty, restart } = route.params;
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, [restart]);

  useEffect(() => {
    updateTurnDisplay();
    if (mode === 'player-vs-computer' && currentPlayer === 'O' && !isGameOver) {
      setTimeout(() => computerPlay(difficulty), 500);
    }
  }, [currentPlayer, isGameOver]);

  const updateTurnDisplay = () => {
    if (isGameOver) return;
    const currentName = currentPlayer === 'X' ? player1 : player2;
     //Alert.alert('Turno', `È il turno di ${currentName}`);
  };

  const handleClick = (index) => {
    if (board[index] !== '' || isGameOver) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      const winner = currentPlayer === 'X' ? player1 : player2;
      navigation.navigate('VictoryTris', {
        winner,
        player1,
        player2,
        mode,
        difficulty
      });
      setIsGameOver(true);
    } else if (newBoard.every(cell => cell !== '')) {
      Alert.alert('Pareggio!', 'La partita è finita in pareggio.');
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const computerPlay = (difficulty) => {
    let move;
    if (difficulty === 'easy') {
      move = getRandomMove();
    } else if (difficulty === 'medium') {
      move = getMediumMove();
    } else {
      move = getHardMove();
    }
    if (move === undefined) return;

    const newBoard = board.slice();
    newBoard[move] = 'O';
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      const winnerName = 'Computer';
      navigation.navigate('VictoryTris', { winner: winnerName, player1, player2, mode, difficulty });
      setIsGameOver(true);
    } else if (newBoard.every(cell => cell !== '')) {
      Alert.alert('Pareggio!');
      setIsGameOver(true);
    } else {
      setCurrentPlayer('X');
    }
  };

  const getRandomMove = () => {
    const availableMoves = board.map((value, index) => value === '' ? index : null).filter(value => value !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const getMediumMove = () => {
    let move = findWinningMove('O');
    if (move !== undefined) return move;
    move = findWinningMove('X');
    if (move !== undefined) return move;
    return getRandomMove();
  };

  const getHardMove = () => {
    let move = findWinningMove('O');
    if (move !== undefined) return move;
    move = findWinningMove('X');
    if (move !== undefined) return move;
    return findBestMove();
  };

  const findWinningMove = (player) => {
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
  };

  const findBestMove = () => {
    if (board[4] === '') return 4;
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => board[index] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    return getRandomMove();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setIsGameOver(false);
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.turnIndicator}>{`È il turno di ${currentPlayer === 'X' ? player1 : player2}`}</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handleClick(index)}
          >
            <Text style={[styles.cellText, cell === 'X' && styles.textX, cell === 'O' && styles.textO]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Griglia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuTris')}>
        <Text style={styles.buttonText}>Torna al Menu</Text>
      </TouchableOpacity>
    </View>
  );
}
