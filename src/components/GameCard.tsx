"use client";
import { Play, Star, Clock, Users, Code2 } from "lucide-react";
import { Game } from "../types/game";

interface GameCardProps {
  game: Game;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function GameCard({
  game,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: GameCardProps) {
  const handleCardClick = () => {
    onSelect();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-gradient-to-b from-white/[0.08] to-transparent rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-white/10 cursor-pointer"
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Favorite button (top-right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isFavorite
            ? "bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/40"
            : "bg-black/30 text-white/70 hover:bg-black/40 hover:text-white"
        }`}
      >
        <Star
          size={18}
          className={`${isFavorite ? "fill-yellow-400" : ""} transition-colors`}
        />
      </button>

      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Game metadata overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full text-xs font-medium">
              <Clock size={14} />
              {game.playTime}
            </div>
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full text-xs font-medium">
              <Users size={14} />
              {game.players}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Title and description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-1 text-white group-hover:text-purple-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2">
            {game.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20">
            {game.category}
          </span>
          {game.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/[0.08] text-white/70 border border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:from-purple-600 hover:to-blue-600"
          >
            <Play size={18} className="animate-pulse" />
            Jugar Ahora
          </button>

          {game.sourceUrl && game.sourceUrl !== "#" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(game.sourceUrl, "_blank");
              }}
              className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <Code2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
