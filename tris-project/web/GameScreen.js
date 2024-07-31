import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function GameScreen({ route, navigation }) {
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
    // Alert.alert('Turno', `È il turno di ${currentName}`);
  };

  const handleClick = (index) => {
    if (board[index] !== '' || isGameOver) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      const winner = currentPlayer === 'X' ? player1 : player2;
      navigation.navigate('Victory', {
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
      navigation.navigate('Victory', { winner: winnerName, player1, player2, mode, difficulty });
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
    <View style={styles.container}>
      <Text style={styles.turnIndicator}>{`È il turno di ${currentPlayer === 'X' ? player1 : player2}`}</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, cell === 'X' && styles.cellX, cell === 'O' && styles.cellO]}
            onPress={() => handleClick(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Griglia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Torna al Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  turnIndicator: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    fontSize: 32,
    color: '#333',
  },
  button: {
    padding: 14,
    marginTop: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});