import React, { createContext, useState, useEffect, useRef } from 'react';
import AppNavigator from './web/screens/navigation/Navigation';
import { Audio } from 'expo-av';
import { TouchableOpacity, Text } from 'react-native';

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
        require('./web/assets/pierino-sigla.mp3'), 
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

  // Overlay mute button in alto a destra
  const MuteButton = () => (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 6,
      }}
      onPress={toggleMute}
    >
      <Text style={{ fontSize: 26 }}>{muted ? '🔇' : '🔊'}</Text>
    </TouchableOpacity>
  );

  return (
    <MusicContext.Provider value={{ muted, toggleMute }}>
      <MuteButton />
      <AppNavigator />
    </MusicContext.Provider>
  );
}
