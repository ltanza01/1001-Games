import { Audio } from 'expo-av';
import { createContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import AppNavigator from './web/screens/navigation/Navigation';

/**
 * App.js – Documentazione
 *
 * Questo file rappresenta il punto di ingresso principale dell'applicazione React Native.
 * Gestisce il contesto globale per la musica di sottofondo e avvolge tutta la navigazione dell'app.
 *
 * ---
 *
 * Funzionalità principali:
 * - MusicContext: Context globale per gestire lo stato della musica (mute/on) e fornire un toggle a tutti i componenti figli.
 * - Gestione della musica di sottofondo tramite la libreria expo-av:
 *   - Caricamento e riproduzione automatica della traccia all'avvio dell'app.
 *   - Loop continuo della traccia musicale.
 *   - Possibilità di mutare o riattivare la musica tramite toggleMute.
 *   - Gestione intelligente degli stati dell'app (background/foreground).
 *   - Pausa automatica della musica quando l'app va in background.
 *   - Ripresa automatica della musica quando l'app torna in foreground (se non mutata).
 *   - Configurazione dell'audio session per prevenire la riproduzione in background.
 *   - Pulizia della risorsa audio al termine del ciclo di vita del componente.
 *
 * Componenti principali:
 * - AppNavigator: Gestisce la navigazione globale dell'app (stack di schermate).
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il context MusicContext permette di controllare la musica da qualsiasi punto dell'app.
 * - La musica viene automaticamente pausata quando l'app va in background per rispettare le best practices mobile.
 *
 * In sintesi:
 * Inizializza l'applicazione, gestisce la musica di sottofondo con controlli intelligenti per gli stati dell'app,
 * e fornisce il contesto musicale a tutti i componenti figli.
 */

// Context per la musica
export const MusicContext = createContext();

export default function App() {
  const [muted, setMuted] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const soundRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadAndPlay() {
      if (soundRef.current) return;
      
      // Configurazione della sessione audio
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false, // Importante: impedisce la riproduzione in background
        });
      } catch (error) {
        console.log('Errore nella configurazione audio:', error);
      }
      
      const { sound } = await Audio.Sound.createAsync(
        //require('./web/assets/pierino-sigla.mp3'), //Audio Pierino per le Gag
        require('./web/assets/background-music.mp3'), // Audio Reale
        { isLooping: true, volume: 1 }
      );
      if (isMounted) {
        soundRef.current = sound;
        await sound.playAsync();
        await sound.setIsMutedAsync(muted);
      }
    }
    loadAndPlay();
    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [muted]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setIsMutedAsync(muted);
    }
  }, [muted]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (soundRef.current) {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // App è tornata in foreground, riprendi la musica se non è mutata
          if (!muted) {
            soundRef.current.playAsync();
          }
        } else if (nextAppState.match(/inactive|background/)) {
          // App è andata in background, pausa la musica
          soundRef.current.pauseAsync();
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [appState, muted]);

  const toggleMute = () => setMuted(m => !m);

  return (
    <MusicContext.Provider value={{ muted, toggleMute }}>
      <AppNavigator />
    </MusicContext.Provider>
  );
}
