import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const GRAVITY = 3;
const JUMP_HEIGHT = 60;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 60;
const GAP = 180;
const PIPE_SPEED = 3; // px per frame

const getRandomPipeY = () => Math.floor(Math.random() * (height - GAP - 200)) + 100;

const FlappyGame = () => {
  const [birdBottom, setBirdBottom] = useState(height / 2);
  const [pipes, setPipes] = useState([
    { left: new Animated.Value(width), pipeY: getRandomPipeY() },
    { left: new Animated.Value(width + width / 2), pipeY: getRandomPipeY() },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gravityInterval = useRef(null);
  const animationFrame = useRef(null);

  // Movimento tubi manuale (non Animated.timing)
  useEffect(() => {
    if (!gameOver) {
      animationFrame.current = requestAnimationFrame(movePipes);
    }
    return () => cancelAnimationFrame(animationFrame.current);
    // eslint-disable-next-line
  }, [gameOver, pipes]);

  const movePipes = () => {
    setPipes(prevPipes => {
      return prevPipes.map((pipe, idx) => {
        let newLeft = pipe.left._value - PIPE_SPEED;
        let newPipeY = pipe.pipeY;
        let passed = false;
        if (newLeft < -PIPE_WIDTH) {
          newLeft = width;
          newPipeY = getRandomPipeY();
          passed = true;
        }
        pipe.left.setValue(newLeft);
        pipe.pipeY = newPipeY;
        if (passed && !gameOver) setScore(s => s + 1);
        return pipe;
      });
    });
    if (!gameOver) {
      animationFrame.current = requestAnimationFrame(movePipes);
    }
  };

  // Gravità
  useEffect(() => {
    if (!gameOver) {
      gravityInterval.current = setInterval(() => {
        setBirdBottom(prev => {
          if (prev > 0) return prev - GRAVITY;
          setGameOver(true);
          return 0;
        });
      }, 24);
    }
    return () => clearInterval(gravityInterval.current);
  }, [gameOver]);

  // Collisioni
  useEffect(() => {
    if (gameOver) return;
    const checkCollision = () => {
      for (let pipe of pipes) {
        const pipeLeft = pipe.left._value;
        if (
          pipeLeft < 30 + BIRD_SIZE &&
          pipeLeft + PIPE_WIDTH > 30
        ) {
          if (
            birdBottom < pipe.pipeY ||
            birdBottom + BIRD_SIZE > pipe.pipeY + GAP
          ) {
            setGameOver(true);
            return; // Interrompi subito il controllo collisioni
          }
        }
      }
      // Collisione con il soffitto o il pavimento
      if (birdBottom + BIRD_SIZE > height) {
        setGameOver(true);
        return;
      }
    };
    const id = setInterval(checkCollision, 16);
    return () => clearInterval(id);
  }, [birdBottom, pipes, gameOver]);

  // Reset
  const restartGame = () => {
    setBirdBottom(height / 2);
    setPipes([
      { left: new Animated.Value(width), pipeY: getRandomPipeY() },
      { left: new Animated.Value(width + width / 2), pipeY: getRandomPipeY() },
    ]);
    setScore(0);
    setGameOver(false);
  };

  // Salto
  const jump = () => {
    if (!gameOver && birdBottom < height - BIRD_SIZE - JUMP_HEIGHT) {
      setBirdBottom(prev => prev + JUMP_HEIGHT);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            left: 30,
            bottom: birdBottom,
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            backgroundColor: 'yellow',
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#333',
          }}
        />
        {pipes.map((pipe, idx) => (
          <React.Fragment key={idx}>
            {/* Tubo superiore */}
            <Animated.Image
              source={{ uri: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Tubo.png?raw=true' }}
              style={{
                position: 'absolute',
                left: pipe.left,
                bottom: pipe.pipeY + GAP,
                width: PIPE_WIDTH,
                height: height - (pipe.pipeY + GAP),
                resizeMode: 'stretch',
                transform: [{ scaleY: -1 }], // capovolgi il tubo per quello superiore
              }}
            />
            {/* Tubo inferiore */}
            <Animated.Image
              source={{ uri: 'https://github.com/ltanza01/1001-Games/blob/app/tris-project/web/assets/Tubo.png?raw=true' }}
              style={{
                position: 'absolute',
                left: pipe.left,
                bottom: 0,
                width: PIPE_WIDTH,
                height: pipe.pipeY,
                resizeMode: 'stretch',
              }}
            />
          </React.Fragment>
        ))}
        <Text style={styles.score}>{score}</Text>
        {gameOver && (
          <View style={styles.gameOverBox}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.gameOverText}>Punteggio: {score}</Text>
            <Text style={styles.restart} onPress={restartGame}>
              Tocca per riprovare
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  score: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#333',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gameOverBox: {
    position: 'absolute',
    top: height / 2 - 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
    borderRadius: 20,
  },
  gameOverText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restart: {
    fontSize: 20,
    color: '#FFD700',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default FlappyGame;