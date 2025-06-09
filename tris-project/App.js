import React, { createContext, useState, useEffect, useRef } from 'react';
import AppNavigator from './web/screens/navigation/Navigation';
import { Audio } from 'expo-av';

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
