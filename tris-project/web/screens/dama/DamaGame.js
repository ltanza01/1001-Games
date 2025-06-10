import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './DamaStyles.js';

/**
 * DamaGame – Documentazione
 *
 * Questo componente React Native implementa il gioco della Dama italiana per due giocatori (umani o contro il computer) su un unico dispositivo.
 * Gestisce la logica di gioco, il movimento delle pedine, le regole di cattura, la promozione a dama e la determinazione del vincitore.
 *
 * ---
 *
 * Stati principali:
 * - board: Stato della scacchiera (array 8x8) con posizione delle pedine.
 * - currentPlayer: Giocatore corrente ("N" per nere, "B" per bianche).
 * - selected: Coordinata della pedina selezionata.
 * - gameStarted: Indica se la partita è iniziata.
 *
 * Props principali:
 * - route.params: Oggetto che contiene player1, player2, mode (player-vs-player o player-vs-computer), difficulty.
 *
 * Funzioni principali:
 * - createInitialBoard(): Crea la scacchiera iniziale con le pedine posizionate.
 * - getPossibleMoves(): Restituisce le mosse possibili per una pedina.
 * - getAllPossibleMoves(): Restituisce tutte le mosse possibili per il giocatore corrente.
 * - handleCellClick(): Gestisce la selezione e il movimento delle pedine.
 * - handleMove(): Esegue una mossa, gestisce catture e promozioni.
 *
 * Logica CPU:
 * - Se la modalità è "player-vs-computer", la CPU effettua una mossa casuale tra quelle disponibili.
 *
 * UI:
 * - Visualizza la scacchiera, le pedine, il turno corrente e i nomi dei giocatori.
 * - Evidenzia la pedina selezionata.
 *
 * Navigazione:
 * - Alla fine della partita, naviga alla schermata di vittoria ("VictoryDama") passando il vincitore e i parametri di gioco.
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il componente è pensato per l’uso locale su un unico dispositivo.
 *
 * In sintesi:
 * Gestisce una partita completa di dama italiana, con supporto per due giocatori o contro il computer, dalla disposizione iniziale fino alla vittoria.
 */

const BOARD_SIZE = 8;

function createInitialBoard() {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        if (row < 3) board[row][col] = "N";
        else if (row > 4) board[row][col] = "B"; 
      }
    }
  }
  return board;
}

function isKing(piece) {
  return piece === "BK" || piece === "NK";
}

function getOpponent(player) {
  return player === "N" ? "B" : "N";
}

function getPossibleMoves(board, row, col, player) {
  const piece = board[row][col];
  if (!piece) return [];
  const isKingPiece = isKing(piece);
  const directions = [];

  if (isKingPiece || piece === "N") directions.push([1, -1], [1, 1]);
  if (isKingPiece || piece === "B") directions.push([-1, -1], [-1, 1]);

  const moves = [];
  const captures = [];

  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    if (
      nr >= 0 &&
      nr < BOARD_SIZE &&
      nc >= 0 &&
      nc < BOARD_SIZE &&
      !board[nr][nc]
    ) {
      moves.push({ to: [nr, nc], capture: null });
    }
    const nr2 = row + dr * 2;
    const nc2 = col + dc * 2;
    if (
      nr2 >= 0 &&
      nr2 < BOARD_SIZE &&
      nc2 >= 0 &&
      nc2 < BOARD_SIZE &&
      !board[nr2][nc2] &&
      board[nr][nc] &&
      (board[nr][nc][0] === getOpponent(player))
    ) {
      captures.push({ to: [nr2, nc2], capture: [nr, nc] });
    }
  }
  return captures.length > 0 ? captures : moves;
}

function getAllPossibleMoves(board, player) {
  const moves = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && (piece[0] === player)) {
        const pm = getPossibleMoves(board, row, col, player);
        if (pm.length > 0) {
          moves.push({ from: [row, col], moves: pm });
        }
      }
    }
  }
  return moves;
}

function DamaGame({ route }) {
  const navigation = useNavigation();
  const { player1, player2, mode, difficulty } = route?.params || {};
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("N");
  const [selected, setSelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setBoard(createInitialBoard());
    setSelected(null);
    setGameStarted(false);
    if (mode === "player-vs-computer") {
      setCurrentPlayer("B");
    } else {
      setCurrentPlayer("N");
    }
  }, [mode, difficulty, player1, player2]);

  useEffect(() => {
    if (
      mode === "player-vs-computer" &&
      currentPlayer === "B"
    ) {
      setTimeout(() => {
        const allMoves = getAllPossibleMoves(board, "B");
        if (allMoves.length === 0) {
          //Alert.alert("Partita finita", `${player1} ha vinto!`);
          return;
        }
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
      (mode === "player-vs-computer" && currentPlayer === "B")
    ) {
      return;
    }
    if (!selected) {
      if (
        board[row][col] &&
        board[row][col][0] === currentPlayer
      ) {
        setSelected([row, col]);
      }
    } else {
      const [selRow, selCol] = selected;
      if (selRow === row && selCol === col) {
        setSelected(null);
        return;
      }
      const possible = getPossibleMoves(board, selRow, selCol, currentPlayer);
      const found = possible.find(
        (m) => m.to[0] === row && m.to[1] === col
      );
      if (found) {
        handleMove([selRow, selCol], [row, col], found.capture);
      } else {
        setSelected(null);
      }
    }
  }

  function handleMove(from, to, capture, isCpu = false) {
    setGameStarted(true);
    const newBoard = board.map((r) => [...r]);
    const [fr, fc] = from;
    const [tr, tc] = to;
    let piece = newBoard[fr][fc];

    if (piece === "N" && tr === BOARD_SIZE - 1) piece = "NK";
    if (piece === "B" && tr === 0) piece = "BK";

    newBoard[fr][fc] = null;
    newBoard[tr][tc] = piece;
    if (capture) {
      const [cr, cc] = capture;
      newBoard[cr][cc] = null;
    }

    setBoard(newBoard);
    setSelected(null);

    if (capture) {
      const moreCaptures = getPossibleMoves(newBoard, tr, tc, currentPlayer).filter(m => m.capture);
      if (moreCaptures.length > 0 && !isCpu) {
        setSelected([tr, tc]);
        return;
      }
    }

    setCurrentPlayer(getOpponent(currentPlayer));
  }

  useEffect(() => {
    if (!gameStarted) return;
    const moves = getAllPossibleMoves(board, currentPlayer);
    if (moves.length === 0) {
      navigation.replace("VictoryDama", {
        winner: currentPlayer === "N" 
          ? (mode === "player-vs-computer" ? "Computer" : player2)
          : player1,
        player1,
        player2,
        mode,
        difficulty,
      });
    }
    // eslint-disable-next-line
  }, [board, currentPlayer, gameStarted]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gioco della Dama</Text>
      <Text style={{
        marginBottom: 16,
        textAlign: "center",
        fontSize: 16,
        color: "#636e72"
      }}>
        {mode === "player-vs-player"
          ? `${player1} vs ${player2}`
          : `${player1} vs Computer (${difficulty || "?"})`}
      </Text>
      <View style={styles.boardWrapper}>
        {board.map((rowArr, row) => (
          <View key={row} style={styles.boardRow}>
            {rowArr.map((cell, col) => {
              const isSelected = selected && selected[0] === row && selected[1] === col;
              const cellColor = (row + col) % 2 === 1 ? styles.darkCell : styles.lightCell;
              return (
                <TouchableOpacity
                  key={col}
                  onPress={() => handleCellClick(row, col)}
                  activeOpacity={0.7}
                  style={[
                    styles.cell,
                    cellColor,
                    isSelected ? styles.cellSelected : styles.cellUnselected
                  ]}
                >
                  {cell === "N" && (
                    <View style={styles.pieceN} />
                  )}
                  {cell === "B" && (
                    <View style={styles.pieceB} />
                  )}
                  {cell === "NK" && (
                    <View style={styles.pieceNK}>
                      <Text style={styles.pieceNKText}>♛</Text>
                    </View>
                  )}
                  {cell === "BK" && (
                    <View style={styles.pieceBK}>
                      <Text style={styles.pieceBKText}>♛</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <Text style={[
        styles.turnBox,
        currentPlayer === "B" && styles.turnBoxBlue
      ]}>
        Turno: {mode === "player-vs-computer"
          ? (currentPlayer === "N" ? player1 : "Computer")
          : (currentPlayer === "N" ? player1 : player2)}
      </Text>
    </View>
  );
}

export default DamaGame;
