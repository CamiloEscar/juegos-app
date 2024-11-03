"use client";
import { Clock, Play, Star } from 'lucide-react';
import { Game } from '../types/game';
import { games } from '../data/games';
import { useState } from 'react';

interface FeaturedGameProps {
  game: Game;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function FeaturedGame({ game, onSelect, isFavorite, onToggleFavorite }: FeaturedGameProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden group border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent z-10"></div>
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">Último Juego Añadido</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">
          {game.title}
        </h2>
        <p className="text-white/80 mb-6 max-w-2xl line-clamp-2">
          {game.description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onSelect}
            className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-indigo-500/25"
          >
            <Play size={20} className="animate-pulse" />
            Jugar
          </button>
          <button
            onClick={onToggleFavorite}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
              isFavorite 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Star size={20} className={isFavorite ? 'fill-current' : ''} />
            <span>Favorito</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar el último juego
export function LatestGame() {
  const latestGame = games[games.length - 1]; // Selecciona el último juego
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSelect = () => {
    window.location.href = latestGame.demoUrl; // Redirige al demo del juego
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite); // Alterna el estado de favorito
  }

  return (
    <FeaturedGame
      game={latestGame}
      onSelect={handleSelect}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}