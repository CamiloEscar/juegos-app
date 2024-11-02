import { useState, useCallback, useEffect } from 'react';

interface SoundEffects {
  [key: string]: HTMLAudioElement;
}

export function useGameSound() {
  const [sounds, setSounds] = useState<SoundEffects>({});
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Preload sound effects
    const effectsToLoad = {
      shoot: '/sounds/shoot.mp3',
      explosion: '/sounds/explosion.mp3',
      score: '/sounds/score.mp3'
    };

    const loadedSounds: SoundEffects = {};
    Object.entries(effectsToLoad).forEach(([key, path]) => {
      loadedSounds[key] = new Audio(path);
    });

    setSounds(loadedSounds);

    return () => {
      Object.values(loadedSounds).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const playSound = useCallback((soundName: string) => {
    if (isMuted || !sounds[soundName]) return;
    
    const sound = sounds[soundName];
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Handle autoplay restrictions
    });
  }, [sounds, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { playSound, toggleMute, isMuted };
}