# Sistema di Gestione Punteggi Freccette

## Panoramica
Il sistema di gestione punteggi per le freccette è stato sviluppato seguendo il pattern stabilito dal menu della dama, fornendo una soluzione completa per tracciare i punteggi durante le partite di freccette.

## Struttura dei File

### 1. `FreccetteMenu.js`
- **Funzione**: Menu principale per la configurazione della partita
- **Caratteristiche**:
  - Selezione del tipo di gioco (501, 301, Cricket)
  - Scelta modalità (Giocatore vs Giocatore, Giocatore vs Computer)
  - Inserimento nomi giocatori
  - Selezione difficoltà CPU
  - Configurazione numero di set da vincere
  - Validazione completa dei dati

### 2. `FreccetteGame.js`
- **Funzione**: Schermata principale di gioco e gestione punteggi
- **Caratteristiche**:
  - Interfaccia di punteggio intuitiva
  - Gestione turni automatica
  - Supporto per moltiplicatori (doppio/triplo)
  - Tracciamento di 3 dardi per turno
  - Validazione regole di gioco (es. bust nel 501/301)
  - Cronologia delle mosse
  - Funzione di annullamento
  - Gestione set multipli

### 3. `FreccetteVictory.js`
- **Funzione**: Schermata di vittoria con statistiche
- **Caratteristiche**:
  - Visualizzazione del vincitore
  - Punteggi finali
  - Statistiche di partita
  - Opzioni per nuova partita o rivincita

### 4. `FreccetteStyles.js`
- **Funzione**: Stili centralizzati per tutte le schermate
- **Caratteristiche**:
  - Tema coerente con colori rosso/blu scuro
  - Stili responsive
  - Animazioni e feedback visivi
  - Supporto per diversi stati UI

## Funzionalità Principali

### Gestione Punteggi
- **Inserimento**: Toccare il punteggio desiderato
- **Moltiplicatori**: Toccare x2 o x3 poi selezionare il numero
- **Miss**: Pulsante dedicato per dardi mancati
- **Validazione**: Controlli automatici per punteggi non validi

### Tipi di Gioco Supportati
1. **501**: Partenza da 501 punti, arrivare esattamente a 0
2. **301**: Partenza da 301 punti, arrivare esattamente a 0
3. **Cricket**: Modalità sui numeri 20-15 e bull (preparata per implementazione futura)

### Gestione Giocatori
- **Numero variabile**: Da 1 a 10 giocatori
- **Nomi personalizzati**: Ogni giocatore ha il suo nome
- **Turni rotativi**: Cambio automatico tra i giocatori
- **Indicatore visivo**: Visualizzazione chiara del giocatore attivo

### Gestione Turni
- 3 dardi per turno
- Cambio automatico del giocatore
- Indicatore visivo del giocatore attivo
- Possibilità di saltare il turno

### Funzioni Avanzate
- **Cronologia**: Tracciamento di tutti i lanci
- **Annulla**: Possibilità di annullare l'ultimo lancio
- **Set multipli**: Supporto per partite best-of-X
- **Statistiche**: Durata partita, lanci totali, media punteggio
- **Interfaccia scorrevole**: Menu e giocatori visualizzabili su scroll

## Utilizzo

### Avvio Partita
1. Aprire `FreccetteMenu.js`
2. Selezionare tipo di gioco
3. Scegliere modalità (PvP o PvC)
4. Inserire nomi giocatori
5. Configurare numero di set
6. Premere "Inizia la Partita"

### Durante la Partita
1. Il giocatore attivo è evidenziato
2. Selezionare moltiplicatore se necessario (x2/x3)
3. Toccare il punteggio ottenuto
4. Ripetere per 3 dardi
5. Il sistema cambierà automaticamente turno

### Comandi Speciali
- **Miss**: Per dardi che non colpiscono
- **Annulla**: Per correggere l'ultimo lancio
- **Salta Turno**: Per passare al giocatore successivo

## Integrazione con il Progetto

### Navigazione
Il sistema è integrato con React Navigation:
```javascript
navigation.navigate('GameFreccette', {
  player1,
  player2,
  gameType,
  mode,
  difficulty,
  setsToWin,
});
```

### Dipendenze
- `react-native-dropdown-picker`: Per i menu a tendina
- `react-native-safe-area-context`: Per l'area sicura
- React Navigation: Per la navigazione tra schermate

## Personalizzazione

### Colori
Il tema utilizza:
- **Primario**: #E74C3C (rosso freccette)
- **Secondario**: #2C3E50 (blu scuro)
- **Accenti**: #F39C12 (arancione), #3498DB (blu), #9B59B6 (viola)

### Punteggi
I punteggi disponibili sono configurabili nell'array `dartScores` in `FreccetteGame.js`.

## Estensibilità

### Aggiunta Nuovi Tipi di Gioco
1. Aggiungere l'opzione nel dropdown di `FreccetteMenu.js`
2. Implementare la logica in `getInitialScore()`
3. Aggiungere la gestione punteggi in `applyThrowScore()`

### Modalità Computer
La struttura è preparata per l'implementazione dell'IA:
- Parametro `difficulty` disponibile
- Logica di turni gestita centralmente
- Possibilità di simulare lanci automatici

## Note Tecniche

### Validazione
- Controllo punteggi negativi nel 501/301
- Validazione form completa nel menu
- Gestione errori con Alert nativi

### Performance
- Uso di `useCallback` per ottimizzare re-render
- Stati locali per reattività immediata
- Gestione efficiente della cronologia

### Accessibilità
- Feedback visivi chiari
- Indicatori di stato
- Messaggi informativi per l'utente

## Conclusione

Il sistema fornisce una soluzione completa e professionale per la gestione dei punteggi nelle freccette, seguendo le best practices di React Native e mantenendo coerenza con il resto del progetto.
