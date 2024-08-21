import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MemoryGameScreen = ({ route, navigation }) => {
  const { player1, player2, mode, difficulty } = route.params;

  const emojis = ['😀', '🎉', '🚀', '🐱', '🍕', '🎸', '🏀', '🌟', '❤️', '🦄', '🐶', '👑', '🍀', '🔥', '🎨', '🌈', '🎂', '⚽'];

  const generateBoard = () => {
    const images = [...Array(18).keys(), ...Array(18).keys()].map(i => emojis[i]);
    return shuffle(images.map(img => ({ img, matched: false, visible: false })));
  };

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [board, setBoard] = useState(generateBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scores, setScores] = useState({ [player1]: 0, [player2]: 0 });
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (mode === 'player-vs-computer' && currentPlayer === 'O' && !isGameOver) {
      computerPlay();
    }
  }, [currentPlayer, isGameOver]);

  useEffect(() => {
    if (selectedTiles.length === 2) {
      checkMatch();
    }
  }, [selectedTiles]);

  const handleClick = index => {
    if (index < 0 || index >= board.length || board[index].matched || selectedTiles.length === 2 || board[index].visible) {
      return;
    }

    const newBoard = [...board];
    newBoard[index].visible = true;
    setBoard(newBoard);
    setSelectedTiles([...selectedTiles, index]);
  };

  const checkMatch = () => {
    const [first, second] = selectedTiles;

    if (first < 0 || second < 0 || first >= board.length || second >= board.length) {
      setSelectedTiles([]);
      return;
    }

    const newBoard = [...board];
    if (newBoard[first].img === newBoard[second].img) {
      const isComputerMove = currentPlayer === 'O';
      newBoard[first].matched = true;
      newBoard[second].matched = true;
      newBoard[first].color = isComputerMove ? 'red' : 'green';
      newBoard[second].color = isComputerMove ? 'red' : 'green';
      setScores({
        ...scores,
        [currentPlayer === 'X' ? player1 : player2]: scores[currentPlayer === 'X' ? player1 : player2] + 1,
      });
      setBoard(newBoard);

      if (newBoard.every(tile => tile.matched)) {
        setIsGameOver(true);
        determineWinner();
      } else {
        setSelectedTiles([]);
        if (currentPlayer === 'X' && mode === 'player-vs-computer') {
          return;
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
      }
    } else {
      setTimeout(() => {
        newBoard[first].visible = false;
        newBoard[second].visible = false;
        setBoard(newBoard);
        setSelectedTiles([]);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }, 1000);
    }
  };

  const computerPlay = () => {
    const availableIndexes = board
      .map((tile, index) => tile.visible ? null : index)
      .filter(index => index !== null);

    if (availableIndexes.length < 2) {
      return;
    }

    let firstIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const newBoard = [...board];
    newBoard[firstIndex].visible = true;
    setBoard(newBoard);
    setSelectedTiles([firstIndex]);

    setTimeout(() => {
      let secondIndex;
      do {
        secondIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      } while (secondIndex === firstIndex);

      newBoard[secondIndex].visible = true;
      setBoard(newBoard);
      setSelectedTiles([firstIndex, secondIndex]);

      setTimeout(() => {
        if (newBoard[firstIndex].img !== newBoard[secondIndex].img) {
          newBoard[firstIndex].visible = false;
          newBoard[secondIndex].visible = false;
          setBoard(newBoard);
          setCurrentPlayer('X');
        } else {
          newBoard[firstIndex].color = 'red';
          newBoard[secondIndex].color = 'red';
          setBoard(newBoard);
          setSelectedTiles([]);
          if (newBoard.every(tile => tile.matched)) {
            setIsGameOver(true);
            determineWinner();
          } else {
            setTimeout(computerPlay, 1000);
          }
        }
      }, 1000);
    }, 1000);
  };

  const determineWinner = () => {
    const winner = scores[player1] > scores[player2] ? player1 : (scores[player1] < scores[player2] ? player2 : 'Pareggio');
    navigation.navigate('VictoryMenu', { winner, player1, player2, mode, difficulty });
  };

  const resetGame = () => {
    setBoard(generateBoard());
    setScores({ [player1]: 0, [player2]: 0 });
    setCurrentPlayer('X');
    setIsGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnIndicator}>{`È il turno di ${currentPlayer === 'X' ? player1 : player2}`}</Text>
      <View style={styles.scores}>
        <Text style={styles.scoreText}>{`${player1}: ${scores[player1]}`}</Text>
        <Text style={styles.scoreText}>{`${player2}: ${scores[player2]}`}</Text>
      </View>
      <View style={styles.board}>
        {board.map((tile, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tile, { backgroundColor: tile.color || '#0072ff' }]}
            onPress={() => handleClick(index)}
          >
            <Text style={styles.tileText}>{tile.visible ? tile.img : '?'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Griglia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuMemory')}>
        <Text style={styles.buttonText}>Torna al Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c6ff',
  },
  turnIndicator: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  scores: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 20,
  },
  board: {
    width: '80%', // Adjust to 6x6 grid size
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tile: {
    width: '16.66%', // 6 columns
    height: '16.66%', // 6 rows
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  tileText: {
    fontSize: 30, // Maggiore dimensione per le emoji
    textAlign: 'center',
    color: '#fff',
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

export default MemoryGameScreen;