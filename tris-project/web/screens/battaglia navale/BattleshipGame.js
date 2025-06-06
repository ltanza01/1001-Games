import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './BattleshipStyles';

// Definizione delle navi standard
const SHIPS = [
  { name: 'Portaerei', size: 5, count: 1 },
  { name: 'Corazzata', size: 4, count: 1 },
  { name: 'Incrociatore', size: 3, count: 2 },
  { name: 'Cacciatorpediniere', size: 2, count: 1 },
];

// Crea una griglia vuota
function createEmptyBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      hasShip: false,
      hit: false,
      shipId: null,
    }))
  );
}

// Controlla se una nave può essere piazzata in una posizione
function canPlaceShip(board, x, y, size, horizontal) {
  const N = board.length;
  if (horizontal) {
    if (y + size > N) return false;
    for (let i = 0; i < size; i++) {
      if (board[x][y + i].hasShip) return false;
    }
  } else {
    if (x + size > N) return false;
    for (let i = 0; i < size; i++) {
      if (board[x + i][y].hasShip) return false;
    }
  }
  return true;
}

// Piazzamento nave sulla griglia
function placeShip(board, x, y, size, horizontal, shipId) {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  if (horizontal) {
    for (let i = 0; i < size; i++) {
      newBoard[x][y + i] = { ...newBoard[x][y + i], hasShip: true, shipId };
    }
  } else {
    for (let i = 0; i < size; i++) {
      newBoard[x + i][y] = { ...newBoard[x + i][y], hasShip: true, shipId };
    }
  }
  return newBoard;
}

// Rimuove una nave dalla griglia e dalla lista delle navi
function removeShip(board, ships, shipId) {
  const newBoard = board.map(row => row.map(cell => {
    if (cell.shipId === shipId) {
      return { ...cell, hasShip: false, shipId: null };
    }
    return cell;
  }));
  const newShips = ships.filter(ship => ship.id !== shipId);
  return [newBoard, newShips];
}

// Controlla se tutte le navi sono affondate
function allShipsSunk(ships) {
  return ships.every(ship => ship.hits >= ship.size);
}

export default function BattleshipGameScreen({ route, navigation }) {
  const { player1, player2, boardSize } = route.params;

  // Stati per le griglie e le navi di entrambi i giocatori
  const [boards, setBoards] = useState([
    createEmptyBoard(boardSize),
    createEmptyBoard(boardSize),
  ]);
  const [ships, setShips] = useState([
    [], // Player 1 ships
    [], // Player 2 ships
  ]);
  // Stato per la fase di piazzamento
  const [placing, setPlacing] = useState({
    player: 0, // 0: player1, 1: player2
    shipIndex: 0,
    orientation: true, // true: orizzontale, false: verticale
    done: [false, false],
  });
  // Stato per i turni di gioco
  const [turn, setTurn] = useState(0); // 0: player1, 1: player2
  // Stato per la partita finita
  const [winner, setWinner] = useState(null);
  const [showOwnBoard, setShowOwnBoard] = useState(false);

  // Timer tra i turni e tra i posizionamenti
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitSeconds, setWaitSeconds] = useState(3);
  const waitTimeout = useRef(null);

  // Stato per mostrare il risultato del tiro
  const [shotResult, setShotResult] = useState(null);

  // Stato per mostrare il timer dopo il posizionamento navi
  const [isPlacingWait, setIsPlacingWait] = useState(false);
  const [placingWaitSeconds, setPlacingWaitSeconds] = useState(3);

  // Stato per il ripristino nave rimossa
  const [pendingShipId, setPendingShipId] = useState([null, null]);

  // Gestione piazzamento/rimozione nave
  const handlePlace = (x, y) => {
    if (placing.done[placing.player]) return;
    const currentBoard = boards[placing.player];
    const currentShips = ships[placing.player];
    const cell = currentBoard[x][y];

    // Se c'è già una nave in questa cella, rimuovila e rendila la prossima da posizionare
    if (cell.hasShip) {
      const shipId = cell.shipId;
      const shipToRemove = currentShips.find(s => s.id === shipId);

      // Rimuovi la nave dalla board e dalla lista delle navi piazzate
      const [newBoard, newShips] = removeShip(currentBoard, currentShips, shipId);
      const updatedBoards = [...boards];
      updatedBoards[placing.player] = newBoard;
      const updatedShips = [...ships];
      updatedShips[placing.player] = newShips;

      // Trova la posizione della prima nave non ancora piazzata
      const shipsList = getShipsList();
      const typeCounts = {};
      for (const s of newShips) {
        const key = `${s.name}_${s.size}`;
        typeCounts[key] = (typeCounts[key] || 0) + 1;
      }
      let idx = 0;
      for (; idx < shipsList.length; idx++) {
        const key = `${shipsList[idx].name}_${shipsList[idx].size}`;
        if ((typeCounts[key] || 0) > 0) {
          typeCounts[key]--;
        } else {
          break;
        }
      }
      setBoards(updatedBoards);
      setShips(updatedShips);
      // Salva il shipId da riutilizzare
      const newPendingShipId = [...pendingShipId];
      newPendingShipId[placing.player] = shipId;
      setPendingShipId(newPendingShipId);
      setPlacing({
        ...placing,
        shipIndex: idx,
      });
      return;
    }

    const shipDef = getCurrentShipDef();
    if (!canPlaceShip(currentBoard, x, y, shipDef.size, placing.orientation)) {
      Alert.alert('Posizionamento non valido', 'Non puoi posizionare la nave qui.');
      return;
    }
    // Usa pendingShipId se presente, altrimenti currentShips.length
    const shipId = pendingShipId[placing.player] !== null ? pendingShipId[placing.player] : currentShips.length;
    const newBoard = placeShip(currentBoard, x, y, shipDef.size, placing.orientation, shipId);
    const newShips = [
      ...currentShips,
      {
        ...shipDef,
        x,
        y,
        horizontal: placing.orientation,
        hits: 0,
        id: shipId,
      },
    ];
    const updatedBoards = [...boards];
    updatedBoards[placing.player] = newBoard;
    const updatedShips = [...ships];
    updatedShips[placing.player] = newShips;

    // Reset pendingShipId dopo averlo usato
    if (pendingShipId[placing.player] !== null) {
      const newPendingShipId = [...pendingShipId];
      newPendingShipId[placing.player] = null;
      setPendingShipId(newPendingShipId);
    }

    // Passa alla prossima nave o al prossimo giocatore
    let nextShipIndex = placing.shipIndex + 1;
    let nextPlayer = placing.player;
    let done = [...placing.done];
    let placingWait = false;
    // TIMER SOLO DOPO IL PRIMO GIOCATORE
    if (nextShipIndex >= getShipsList().length) {
      done[placing.player] = true;
      nextShipIndex = 0;
      nextPlayer = placing.player === 0 ? 1 : 0;
      if (!done[1]) { // timer solo tra player 1 e player 2
        placingWait = true;
        setIsPlacingWait(true);
        setPlacingWaitSeconds(3);
      }
    }
    setBoards(updatedBoards);
    setShips(updatedShips);
    setPlacing({
      ...placing,
      player: nextPlayer,
      shipIndex: nextShipIndex,
      done,
    });
    if (placingWait) return;
  };

  // Cambia orientamento nave
  const toggleOrientation = () => {
    setPlacing({ ...placing, orientation: !placing.orientation });
  };

  // Ottieni la lista delle navi da piazzare
  function getShipsList() {
    // Espandi la lista in base al count
    return SHIPS.flatMap(ship => Array(ship.count).fill(ship));
  }

  // Ottieni la nave corrente da piazzare
  function getCurrentShipDef() {
    return getShipsList()[placing.shipIndex];
  }

  // Gestione colpo
  const handleShot = (x, y) => {
    if (winner) return;
    if (!placing.done.every(Boolean)) return;
    if (isWaiting || shotResult) return;
    const enemy = turn === 0 ? 1 : 0;
    const enemyBoard = boards[enemy];
    const cell = enemyBoard[x][y];
    if (cell.hit) return; // Già colpito

    // Aggiorna la cella colpita
    const newEnemyBoard = enemyBoard.map(row => row.map(cell => ({ ...cell })));
    newEnemyBoard[x][y].hit = true;

    // Aggiorna le navi se colpito
    let newEnemyShips = ships[enemy].map(ship => ({ ...ship }));
    let resultMsg = '';
    if (cell.hasShip) {
      const shipId = cell.shipId;
      newEnemyShips[shipId].hits += 1;
      if (newEnemyShips[shipId].hits === newEnemyShips[shipId].size) {
        resultMsg = `Hai affondato la ${newEnemyShips[shipId].name}!`;
      } else {
        resultMsg = 'Colpito!';
      }
    } else {
      resultMsg = 'Acqua!';
    }

    // Aggiorna stato
    const updatedBoards = [...boards];
    updatedBoards[enemy] = newEnemyBoard;
    const updatedShips = [...ships];
    updatedShips[enemy] = newEnemyShips;

    // Controlla vittoria
    if (allShipsSunk(newEnemyShips)) {
      setBoards(updatedBoards);
      setShips(updatedShips);
      setWinner(turn);
      // Naviga alla schermata di vittoria
      navigation.navigate('VictoryBattleship', {
        winner: turn === 0 ? player1 : player2,
        player1,
        player2,
        boardSize: boardSize, 
      });
      return;
    }

    setBoards(updatedBoards);
    setShips(updatedShips);

    // Mostra il risultato per 1 secondo, poi passa al cambio turno
    setShotResult(resultMsg);
    setTimeout(() => {
      setShotResult(null);
      setIsWaiting(true);
      setWaitSeconds(3);
    }, 1000);
  };

  // Effetto per countdown tra i turni
  useEffect(() => {
    if (isWaiting) {
      if (waitSeconds > 0) {
        waitTimeout.current = setTimeout(() => {
          setWaitSeconds(s => s - 1);
        }, 1000);
      } else {
        setIsWaiting(false);
        setTurn(t => (t === 0 ? 1 : 0));
      }
    }
    return () => clearTimeout(waitTimeout.current);
  }, [isWaiting, waitSeconds]);

  // Effetto per countdown tra i posizionamenti
  useEffect(() => {
    if (isPlacingWait) {
      if (placingWaitSeconds > 0) {
        waitTimeout.current = setTimeout(() => {
          setPlacingWaitSeconds(s => s - 1);
        }, 1000);
      } else {
        setIsPlacingWait(false);
      }
    }
    return () => clearTimeout(waitTimeout.current);
  }, [isPlacingWait, placingWaitSeconds]);

  // Reset partita
  const handleReset = () => {
    Alert.alert(
      'Conferma Reset',
      'Sei sicuro di voler resettare la partita?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Sì, resetta',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MenuBattleship' }],
            });
          },
        },
      ]
    );
  };

  // Renderizza una cella della griglia
  function renderCell(board, x, y, onPress, showShips = false, cellSize = 28) {
    const cell = board[x][y];
    let bg = '#e6f2ff';
    if (cell.hit && cell.hasShip) bg = '#c2061f';
    else if (cell.hit) bg = '#555';
    else if (showShips && cell.hasShip) bg = '#0072ff';
    return (
      <TouchableOpacity
        key={`${x},${y}`}
        style={{
          width: cellSize,
          height: cellSize,
          margin: 1,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: '#aaa',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}
        disabled={!!winner}
      >
        {/* Mostra X per colpo, O per acqua */}
        {cell.hit ? (
          <Text>{cell.hasShip ? '✖' : '•'}</Text>
        ) : null}
      </TouchableOpacity>
    );
  }

  // Renderizza la griglia
  function renderBoard(board, onCellPress, showShips = false, cellSize = 28) {
    return (
      <View style={{ marginVertical: 10 }}>
        {board.map((row, x) => (
          <View key={x} style={{ flexDirection: 'row' }}>
            {row.map((cell, y) =>
              renderCell(board, x, y, () => onCellPress(x, y), showShips, cellSize)
            )}
          </View>
        ))}
      </View>
    );
  }

  // Fase di piazzamento navi
  if (!placing.done.every(Boolean)) {
    const currentPlayer = placing.player === 0 ? player1 : player2;
    const shipsList = getShipsList();
    const currentShip = shipsList[placing.shipIndex];
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.label}>
            {`Posizionamento navi: ${currentPlayer}`}
          </Text>
          <Text style={styles.label}>
            {`Nave: ${currentShip.name} (${currentShip.size} celle)`}
          </Text>
          <Button
            title={`Ruota (${placing.orientation ? 'Orizzontale' : 'Verticale'})`}
            onPress={toggleOrientation}
            color="#0072ff"
          />
          <Text style={[styles.label, { marginTop: 10 }]}>
            Tocca una cella per posizionare la nave
          </Text>
          {renderBoard(boards[placing.player], handlePlace, true, 28)}
        </View>
      </SafeAreaView>
    );
  }

  // Fase di gioco
  const currentPlayer = turn === 0 ? player1 : player2;
  const enemy = turn === 0 ? 1 : 0;

  // Schermata di attesa tra i turni
  if (isWaiting) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <Text style={[styles.label, { fontSize: 22, marginBottom: 20 }]}>
            Passa il dispositivo a {turn === 0 ? player2 : player1}
          </Text>
          <Text style={[styles.label, { fontSize: 18 }]}>
            Il turno inizierà tra {waitSeconds}...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Schermata di attesa tra i posizionamenti delle navi
  if (isPlacingWait) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <Text style={[styles.label, { fontSize: 22, marginBottom: 20 }]}>
            Passa il dispositivo a {placing.player === 0 ? player1 : player2}
          </Text>
          <Text style={[styles.label, { fontSize: 18 }]}>
            Il posizionamento inizierà tra {placingWaitSeconds}...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Schermata di risultato tiro
  if (shotResult) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <Text style={[styles.label, { fontSize: 22, marginBottom: 20 }]}>
            {shotResult}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.label}>
          {winner !== null
            ? `Vittoria! Ha vinto ${winner === 0 ? player1 : player2}`
            : `Turno di: ${currentPlayer}`}
        </Text>
        <Button
          title="Mostra la mia griglia"
          onPress={() => setShowOwnBoard(true)}
          color="#0072ff"
        />
        <Text style={styles.label}>Griglia avversario</Text>
        {renderBoard(boards[enemy], handleShot, false, 28)}
        <View style={{ marginTop: 30 }}>
          <Button
            title="Reset Partita"
            onPress={handleReset}
            color="#c2061f"
          />
        </View>
        <Modal
          visible={showOwnBoard}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowOwnBoard(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
              elevation: 10,
              minWidth: 10 + 20 * boards[turn].length,
            }}>
              <Text style={[styles.label, { marginBottom: 10 }]}>La tua griglia</Text>
              {renderBoard(boards[turn], () => {}, true, 24)}
              <Button title="Chiudi" onPress={() => setShowOwnBoard(false)} color="#0072ff" />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
