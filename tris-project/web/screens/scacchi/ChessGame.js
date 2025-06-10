import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './ChessStyles.js';

const BOARD_SIZE = 8;

function createInitialBoard() {
  return [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ];
}

function getOpponent(player) {
  return player === "w" ? "b" : "w";
}

function inBounds(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function getPossibleMoves(board, row, col, player) {
  const piece = board[row][col];
  if (!piece || piece[0] !== player) return [];
  const type = piece[1];
  const moves = [];
  const directions = {
    N: [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ],
    B: [
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ],
    R: [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ],
    Q: [
      [-1, -1], [-1, 1], [1, -1], [1, 1],
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ],
    K: [
      [-1, -1], [-1, 1], [1, -1], [1, 1],
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ]
  };

  if (type === "P") {
    const dir = player === "w" ? -1 : 1;
   
    if (inBounds(row + dir, col) && !board[row + dir][col]) {
      moves.push({ to: [row + dir, col], capture: null });
      
      if (
        (player === "w" && row === 6) ||
        (player === "b" && row === 1)
      ) {
        if (!board[row + dir * 2][col]) {
          moves.push({ to: [row + dir * 2, col], capture: null });
        }
      }
    }
    
    for (const dc of [-1, 1]) {
      const nr = row + dir, nc = col + dc;
      if (
        inBounds(nr, nc) &&
        board[nr][nc] &&
        board[nr][nc][0] === getOpponent(player)
      ) {
        moves.push({ to: [nr, nc], capture: [nr, nc] });
      }
    }
    
  } else if (type === "N") {
    for (const [dr, dc] of directions.N) {
      const nr = row + dr, nc = col + dc;
      if (inBounds(nr, nc)) {
        if (!board[nr][nc] || board[nr][nc][0] === getOpponent(player)) {
          moves.push({ to: [nr, nc], capture: board[nr][nc] ? [nr, nc] : null });
        }
      }
    }
  } else if (type === "B" || type === "R" || type === "Q") {
    const dirs = directions[type];
    for (const [dr, dc] of dirs) {
      let nr = row + dr, nc = col + dc;
      while (inBounds(nr, nc)) {
        if (!board[nr][nc]) {
          moves.push({ to: [nr, nc], capture: null });
        } else {
          if (board[nr][nc][0] === getOpponent(player)) {
            moves.push({ to: [nr, nc], capture: [nr, nc] });
          }
          break;
        }
        nr += dr;
        nc += dc;
        if (type === "K") break; 
      }
    }
  } else if (type === "K") {
    for (const [dr, dc] of directions.K) {
      const nr = row + dr, nc = col + dc;
      if (inBounds(nr, nc)) {
        if (!board[nr][nc] || board[nr][nc][0] === getOpponent(player)) {
          moves.push({ to: [nr, nc], capture: board[nr][nc] ? [nr, nc] : null });
        }
      }
    }
    // Arrocco non implementato
  }
  return moves;
}


function getAllPossibleMoves(board, player) {
  const moves = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && piece[0] === player) {
        const pm = getPossibleMoves(board, row, col, player);
        if (pm.length > 0) {
          moves.push({ from: [row, col], moves: pm });
        }
      }
    }
  }
  return moves;
}


function findKing(board, player) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === player + "K") return [row, col];
    }
  }
  return null;
}


function isKingInCheck(board, player) {
  const kingPos = findKing(board, player);
  if (!kingPos) return true;
  const opponent = getOpponent(player);
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] && board[row][col][0] === opponent) {
        const moves = getPossibleMoves(board, row, col, opponent);
        if (moves.some(m => m.to[0] === kingPos[0] && m.to[1] === kingPos[1])) {
          return true;
        }
      }
    }
  }
  return false;
}


function filterLegalMoves(board, player, allMoves) {
  return allMoves
    .map(move => ({
      ...move,
      moves: move.moves.filter(m => {
        const newBoard = board.map(r => [...r]);
        const [fr, fc] = move.from;
        const [tr, tc] = m.to;
        newBoard[tr][tc] = newBoard[fr][fc];
        newBoard[fr][fc] = null;
        if (m.capture) {
          const [cr, cc] = m.capture;
          newBoard[cr][cc] = null;
        }
        return !isKingInCheck(newBoard, player);
      })
    }))
    .filter(move => move.moves.length > 0);
}

function ChessGame({ route }) {
  const navigation = useNavigation();
  const { player1, player2, mode } = route?.params || {};
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("w");
  const [selected, setSelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [highlightedMoves, setHighlightedMoves] = useState([]);

  useEffect(() => {
    setBoard(createInitialBoard());
    setSelected(null);
    setGameStarted(false);
    setCurrentPlayer("w");
  }, [mode, player1, player2]);

  useEffect(() => {
    if (
      mode === "player-vs-computer" &&
      currentPlayer === "b"
    ) {
      setTimeout(() => {
        const allMoves = filterLegalMoves(board, "b", getAllPossibleMoves(board, "b"));
        if (allMoves.length === 0) return;
        const moveIdx = Math.floor(Math.random() * allMoves.length);
        const move = allMoves[moveIdx];
        const toIdx = Math.floor(Math.random() * move.moves.length);
        const { to, capture } = move.moves[toIdx];
        handleMove(move.from, to, capture, true);
      }, 700);
    }
    // eslint-disable-next-line
  }, [currentPlayer, mode, board]);

  function handleCellClick(row, col) {
    if (
      (mode === "player-vs-computer" && currentPlayer === "b")
    ) {
      return;
    }
    if (!selected) {
      if (
        board[row][col] &&
        board[row][col][0] === currentPlayer
      ) {
        setSelected([row, col]);
        // Evidenzia le mosse possibili
        const possible = filterLegalMoves(board, currentPlayer, [
          { from: [row, col], moves: getPossibleMoves(board, row, col, currentPlayer) }
        ]);
        if (possible.length > 0) {
          setHighlightedMoves(possible[0].moves.map(m => m.to.join(",")));
        } else {
          setHighlightedMoves([]);
        }
      }
    } else {
      const [selRow, selCol] = selected;
      if (selRow === row && selCol === col) {
        setSelected(null);
        setHighlightedMoves([]);
        return;
      }
      const possible = filterLegalMoves(board, currentPlayer, [
        { from: [selRow, selCol], moves: getPossibleMoves(board, selRow, selCol, currentPlayer) }
      ]);
      if (possible.length > 0) {
        const found = possible[0].moves.find(
          (m) => m.to[0] === row && m.to[1] === col
        );
        if (found) {
          handleMove([selRow, selCol], [row, col], found.capture);
          setHighlightedMoves([]);
        } else {
          setSelected(null);
          setHighlightedMoves([]);
        }
      } else {
        setSelected(null);
        setHighlightedMoves([]);
      }
    }
  }

  function handleMove(from, to, capture, isCpu = false) {
    setGameStarted(true);
    const newBoard = board.map((r) => [...r]);
    const [fr, fc] = from;
    const [tr, tc] = to;
    let piece = newBoard[fr][fc];

    // Promozione pedone (solo a regina per semplicità)
    if (piece === "wP" && tr === 0) piece = "wQ";
    if (piece === "bP" && tr === BOARD_SIZE - 1) piece = "bQ";

    // Prima rimuovi la pedina catturata (se presente)
    if (capture) {
      const [cr, cc] = capture;
      newBoard[cr][cc] = null;
    }

    // Poi sposta la pedina
    newBoard[fr][fc] = null;
    newBoard[tr][tc] = piece;

    setBoard(newBoard);
    setSelected(null);
    setHighlightedMoves([]);
    setCurrentPlayer(getOpponent(currentPlayer));
  }

  useEffect(() => {
    if (!gameStarted) return;
    const allMoves = filterLegalMoves(board, currentPlayer, getAllPossibleMoves(board, currentPlayer));
    if (allMoves.length === 0) {
      // Controlla se il re è sotto scacco
      if (isKingInCheck(board, currentPlayer)) {
        // Scacco matto
        setTimeout(() => {
          navigation.replace("ChessVictory", {
            winner: getOpponent(currentPlayer) === "w" ? player1 : player2,
            player1,
            player2,
            mode,
            checkmate: true,
          });
        }, 100);
      } else {
        // Stallo
        setTimeout(() => {
          navigation.replace("ChessVictory", {
            winner: "Stallo",
            player1,
            player2,
            mode,
            checkmate: false,
          });
        }, 100);
      }
    }
  }, [board, gameStarted, currentPlayer, navigation]);

  function renderPiece(piece, row) {
    if (!piece) return null;
    const map = {
      wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
      bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
    };
    return <Text style={piece[0] === "b" ? styles.pieceB : styles.pieceW}>{map[piece]}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              const isSelected = selected && selected[0] === rowIndex && selected[1] === colIndex;
              const isHighlighted = highlightedMoves.includes(`${rowIndex},${colIndex}`);
              const cellColor = (rowIndex + colIndex) % 2 === 0 ? styles.lightCell : styles.darkCell;
              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    cellColor,
                    isSelected && styles.cellSelected,
                    isHighlighted && styles.cellHighlight
                  ]}
                  onPress={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && renderPiece(cell, rowIndex)}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.info}>
        <Text style={styles.turn}>
          {`Turno di ${currentPlayer === "w" ? player1 : player2}`}
        </Text>
      </View>
    </View>
  );
}

export default ChessGame;