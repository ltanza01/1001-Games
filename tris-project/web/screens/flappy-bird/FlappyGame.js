import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const GRAVITY = 3;
const JUMP_HEIGHT = 60;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 60;
const GAP = 180;
const PIPE_SPEED = 10; 

const getRandomPipeY = () => Math.floor(Math.random() * (height - GAP - 200)) + 100;

const FlappyGame = () => {
  const [birdBottom, setBirdBottom] = useState(height / 2);
  const [pipes, setPipes] = useState([
    { left: new Animated.Value(width), pipeY: getRandomPipeY() },
    { left: new Animated.Value(width + width / 2), pipeY: getRandomPipeY() },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gravityInterval = useRef();
  const pipeInterval = useRef();

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

  useEffect(() => {
    if (!gameOver) {
      pipeInterval.current = setInterval(() => {
        setPipes(prevPipes =>
          prevPipes.map(pipe => {
            Animated.timing(pipe.left, {
              toValue: -PIPE_WIDTH,
              duration: ((pipe.left._value + PIPE_WIDTH) / PIPE_SPEED) * 16,
              useNativeDriver: false,
            }).start(({ finished }) => {
              if (finished && !gameOver) {
                pipe.left.setValue(width);
                pipe.pipeY = getRandomPipeY();
                setScore(s => s + 1);
              }
            });
            return pipe;
          })
        );
      }, 16);
    }
    return () => clearInterval(pipeInterval.current);
  }, [gameOver]);

  useEffect(() => {
    const collision = () => {
      pipes.forEach(pipe => {
        const pipeLeft = pipe.left._value;
        if (
          pipeLeft < BIRD_SIZE + 30 &&
          pipeLeft + PIPE_WIDTH > 30
        ) {
          if (
            birdBottom < pipe.pipeY ||
            birdBottom + BIRD_SIZE > pipe.pipeY + GAP
          ) {
            setGameOver(true);
          }
        }
      });
    };
    if (!gameOver) {
      const id = setInterval(collision, 16);
      return () => clearInterval(id);
    }
  }, [birdBottom, pipes, gameOver]);

  const restartGame = () => {
    setBirdBottom(height / 2);
    setPipes([
      { left: new Animated.Value(width), pipeY: getRandomPipeY() },
      { left: new Animated.Value(width + width / 2), pipeY: getRandomPipeY() },
    ]);
    setScore(0);
    setGameOver(false);
  };

  const jump = () => {
    if (!gameOver && birdBottom < height - BIRD_SIZE) {
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
            <Animated.View
              style={{
                position: 'absolute',
                left: pipe.left,
                bottom: pipe.pipeY + GAP,
                width: PIPE_WIDTH,
                height: height - (pipe.pipeY + GAP),
                backgroundColor: 'green',
                borderColor: '#333',
                borderWidth: 2,
                borderRadius: 10,
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                left: pipe.left,
                bottom: 0,
                width: PIPE_WIDTH,
                height: pipe.pipeY,
                backgroundColor: 'green',
                borderColor: '#333',
                borderWidth: 2,
                borderRadius: 10,
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