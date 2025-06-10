import React, { createContext, useState, useEffect, useRef } from 'react';
import AppNavigator from './web/screens/navigation/Navigation';
import { Audio } from 'expo-av';

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
 *   - Pulizia della risorsa audio al termine del ciclo di vita del componente.
 *
 * Componenti principali:
 * - AppNavigator: Gestisce la navigazione globale dell'app (stack di schermate).
 *
 * Note aggiuntive:
 * - Tutta la logica di stato è gestita tramite React hooks.
 * - Il context MusicContext permette di controllare la musica da qualsiasi punto dell'app.
 *
 * In sintesi:
 * Inizializza l'applicazione, gestisce la musica di sottofondo e fornisce il contesto musicale a tutti i componenti figli.
 */

// Context per la musica
export const MusicContext = createContext();

export default function App() {
  const [muted, setMuted] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadAndPlay() {
      if (soundRef.current) return;
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
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setIsMutedAsync(muted);
    }
  }, [muted]);

  const toggleMute = () => setMuted(m => !m);

  return (
    <MusicContext.Provider value={{ muted, toggleMute }}>
      <AppNavigator />
    </MusicContext.Provider>
  );
}
