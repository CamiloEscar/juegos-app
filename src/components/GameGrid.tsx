import GameCard from "./GameCard";
import { Game } from "../types/game";

interface GameGridProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
  favorites: unknown;
  onToggleFavorite: unknown;
}

function GameGrid({ games, onGameSelect }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onSelect={() => onGameSelect(game)}
          isFavorite={false}
          onToggleFavorite={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </div>
  );
}

export default GameGrid;
