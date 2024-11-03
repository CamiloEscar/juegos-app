import { Game, SortOption } from "../types/game";
import GameCard from "./GameCard";

type SortDirection = 'asc' | 'desc';

interface GameGridProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
  favorites: string[];
  onToggleFavorite: (gameId: string) => void;
  sortOption: SortOption;
  sortDirection: SortDirection;
}

export default function GameGrid({
  games,
  onGameSelect,
  favorites,
  onToggleFavorite,
  sortOption,
  sortDirection,
}: GameGridProps) {
  const sortedGames = [...games].sort((a, b) => {
    let comparison = 0;
    switch (sortOption) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "id":
        comparison = a.id.localeCompare(b.id);
        break;
      case "favorites":
        comparison = (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0);
        break;
      default:
        return 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedGames.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onSelect={() => onGameSelect(game)}
          isFavorite={favorites.includes(game.id)}
          onToggleFavorite={() => onToggleFavorite(game.id)}
        />
      ))}
    </div>
  );
}