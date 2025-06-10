import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './BattleshipStyles';

/**
 * BattleshipGameScreen – Documentazione
 * 
 * Questo componente React Native implementa il gioco della Battaglia Navale (Battleship) per due giocatori su un unico dispositivo.
 * Gestisce sia la fase di posizionamento delle navi sia la fase di gioco vera e propria, con logica di turni, colpi, affondamento navi e gestione della vittoria.
 * 
 * ---
 * 
 * Stati principali:
 * - boards: Array di due griglie (una per giocatore) che rappresentano lo stato delle celle (nave, colpita, ecc).
 * - ships: Array di due liste di navi piazzate da ciascun giocatore.
 * - placing: Oggetto che tiene traccia di chi sta posizionando, quale nave, orientamento e se ha finito.
 * - turn: Indica di chi è il turno di gioco (0 o 1).
 * - winner: Indica il vincitore (null se la partita è in corso).
 * - showOwnBoard: Mostra la propria griglia in un modal.
 * - isWaiting / waitSeconds: Gestisce il timer tra i turni di gioco.
 * - isPlacingWait / placingWaitSeconds: Gestisce il timer tra i posizionamenti delle navi.
 * - shotResult: Mostra il risultato dell’ultimo tiro (colpito, acqua, affondato).
 * - pendingShipId: Permette di riposizionare una nave appena rimossa.
 * 
 * Funzioni principali:
 * - createEmptyBoard(size): Crea una griglia vuota di dimensione size x size.
 * - canPlaceShip(board, x, y, size, horizontal): Verifica se una nave può essere posizionata in una certa posizione e orientamento.
 * - placeShip(board, x, y, size, horizontal, shipId): Posiziona una nave sulla griglia.
 * - removeShip(board, ships, shipId): Rimuove una nave dalla griglia e dalla lista delle navi piazzate.
 * - allShipsSunk(ships): Restituisce true se tutte le navi sono state affondate.
 * - handlePlace(x, y): Gestisce il posizionamento o la rimozione di una nave sulla griglia durante la fase di piazzamento.
 * - toggleOrientation(): Cambia l’orientamento della nave da posizionare.
 * - getShipsList(): Restituisce la lista completa delle navi da piazzare.
 * - getCurrentShipDef(): Restituisce la definizione della nave attualmente da piazzare.
 * - handleShot(x, y): Gestisce il tiro su una cella della griglia avversaria.
 * - handleReset(): Mostra un alert di conferma e, se confermato, resetta la partita tornando al menu.
 * - renderCell() / renderBoard(): Funzioni di rendering per una cella e per l’intera griglia.
 * 
 * Fasi del gioco:
 * 1. Posizionamento navi: Ogni giocatore, a turno, piazza le proprie navi sulla griglia.
 * 2. Fase di gioco: I giocatori si alternano nel tirare sulla griglia avversaria.
 * 3. Vittoria: Quando tutte le navi di un giocatore sono affondate, viene dichiarato il vincitore.
 * 
 * UI e Navigazione:
 * - Modal: Permette di visualizzare la propria griglia in qualsiasi momento.
 * - Timer: Timer visivi tra i turni e tra i posizionamenti.
 * - Reset: Pulsante per resettare la partita.
 * - Navigazione: Usa la prop navigation per cambiare schermata alla vittoria o al reset.
 * 
 * Note aggiuntive:
 * - Il componente è pensato per il gioco locale su un solo dispositivo.
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il codice è facilmente estendibile per aggiungere funzionalità come IA, multiplayer online, ecc.
 * 
 * In sintesi:
 * Questo componente gestisce l’intero ciclo di una partita a Battaglia Navale tra due giocatori, dalla preparazione delle griglie fino alla dichiarazione del vincitore, con una UI reattiva e controlli intuitivi.
 */


const SHIPS = [
  { name: 'Portaerei', size: 5, count: 1 },
  { name: 'Corazzata', size: 4, count: 1 },
  { name: 'Incrociatore', size: 3, count: 2 },
  { name: 'Cacciatorpediniere', size: 2, count: 1 },
];

function createEmptyBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      hasShip: false,
      hit: false,
      shipId: null,
    }))
  );
}

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

function allShipsSunk(ships) {
  return ships.every(ship => ship.hits >= ship.size);
}

export default function BattleshipGameScreen({ route, navigation }) {
  const { player1, player2, boardSize } = route.params;

  const [boards, setBoards] = useState([
    createEmptyBoard(boardSize),
    createEmptyBoard(boardSize),
  ]);
  const [ships, setShips] = useState([
    [], 
    [], 
  ]);

  const [placing, setPlacing] = useState({
    player: 0, 
    shipIndex: 0,
    orientation: true, 
    done: [false, false],
  });
  
  const [turn, setTurn] = useState(0); 
  
  const [winner, setWinner] = useState(null);
  const [showOwnBoard, setShowOwnBoard] = useState(false);

  
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitSeconds, setWaitSeconds] = useState(3);
  const waitTimeout = useRef(null);

  
  const [shotResult, setShotResult] = useState(null);

  
  const [isPlacingWait, setIsPlacingWait] = useState(false);
  const [placingWaitSeconds, setPlacingWaitSeconds] = useState(3);

  
  const [pendingShipId, setPendingShipId] = useState([null, null]);

  
  const handlePlace = (x, y) => {
    if (placing.done[placing.player]) return;
    const currentBoard = boards[placing.player];
    const currentShips = ships[placing.player];
    const cell = currentBoard[x][y];

    if (cell.hasShip) {
      const shipId = cell.shipId;
      const shipToRemove = currentShips.find(s => s.id === shipId);

      const [newBoard, newShips] = removeShip(currentBoard, currentShips, shipId);
      const updatedBoards = [...boards];
      updatedBoards[placing.player] = newBoard;
      const updatedShips = [...ships];
      updatedShips[placing.player] = newShips;

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

    if (pendingShipId[placing.player] !== null) {
      const newPendingShipId = [...pendingShipId];
      newPendingShipId[placing.player] = null;
      setPendingShipId(newPendingShipId);
    }

    let nextShipIndex = placing.shipIndex + 1;
    let nextPlayer = placing.player;
    let done = [...placing.done];
    let placingWait = false;
    if (nextShipIndex >= getShipsList().length) {
      done[placing.player] = true;
      nextShipIndex = 0;
      nextPlayer = placing.player === 0 ? 1 : 0;
      if (!done[1]) { 
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

  const toggleOrientation = () => {
    setPlacing({ ...placing, orientation: !placing.orientation });
  };


  function getShipsList() {

    return SHIPS.flatMap(ship => Array(ship.count).fill(ship));
  }


  function getCurrentShipDef() {
    return getShipsList()[placing.shipIndex];
  }


  const handleShot = (x, y) => {
    if (winner) return;
    if (!placing.done.every(Boolean)) return;
    if (isWaiting || shotResult) return;
    const enemy = turn === 0 ? 1 : 0;
    const enemyBoard = boards[enemy];
    const cell = enemyBoard[x][y];
    if (cell.hit) return;


    const newEnemyBoard = enemyBoard.map(row => row.map(cell => ({ ...cell })));
    newEnemyBoard[x][y].hit = true;

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


    const updatedBoards = [...boards];
    updatedBoards[enemy] = newEnemyBoard;
    const updatedShips = [...ships];
    updatedShips[enemy] = newEnemyShips;


    if (allShipsSunk(newEnemyShips)) {
      setBoards(updatedBoards);
      setShips(updatedShips);
      setWinner(turn);
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

    setShotResult(resultMsg);
    setTimeout(() => {
      setShotResult(null);
      setIsWaiting(true);
      setWaitSeconds(3);
    }, 1000);
  };


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

  function renderCell(board, x, y, onPress, showShips = false, cellSize = 28) {
    const cell = board[x][y];
    let bg = '#e6f2ff';
    if (cell.hit && cell.hasShip) bg = '#c2061f';
    else if (cell.hit) bg = '#555';
    else if (showShips && cell.hasShip) bg = '#0072ff';
    return (
      <TouchableOpacity
        key={`${x},${y}`}
        style={[
          cellSize === 24 ? styles.cellSmall : styles.cell,
          { backgroundColor: bg }
        ]}
        onPress={onPress}
        disabled={!!winner}
      >

        {cell.hit ? (
          <Text>{cell.hasShip ? '✖' : '•'}</Text>
        ) : null}
      </TouchableOpacity>
    );
  }


  function renderBoard(board, onCellPress, showShips = false, cellSize = 28) {
    return (
      <View style={styles.board}>
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

  const currentPlayer = turn === 0 ? player1 : player2;
  const enemy = turn === 0 ? 1 : 0;

  if (isWaiting) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, styles.waitContainer]}>
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

  if (isPlacingWait) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, styles.waitContainer]}>
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

  if (shotResult) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, styles.waitContainer]}>
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
          <View style={styles.modalOverlay}>
            <View style={[
              styles.modalContent,
              { minWidth: 10 + 20 * boards[turn].length }
            ]}>
              <Text style={[styles.label, { marginBottom: 10 }]}>La tua griglia</Text>
              <View style={styles.modalBoard}>
                {renderBoard(boards[turn], () => {}, true, 24)}
              </View>
              <Button title="Chiudi" onPress={() => setShowOwnBoard(false)} color="#0072ff" />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
