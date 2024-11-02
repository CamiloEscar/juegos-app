import { useState, useEffect } from 'react';

interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  muted: boolean;
  highScore: number;
  controls: {
    left: string;
    right: string;
    shoot: string;
  };
}

const defaultSettings: GameSettings = {
  difficulty: 'medium',
  muted: false,
  highScore: 0,
  controls: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    shoot: 'Space'
  }
};

export function useGameSettings(gameId: string) {
  const [settings, setSettings] = useState<GameSettings>(() => {
    const saved = localStorage.getItem(`game-settings-${gameId}`);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(`game-settings-${gameId}`, JSON.stringify(settings));
  }, [settings, gameId]);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
}