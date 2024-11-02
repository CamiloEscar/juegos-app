import { useState } from 'react';
import { Library, Code2, Gamepad2, Search, Sparkles, Star, Trophy } from 'lucide-react';
import GameGrid from './GameGrid';
import GamePlayer from './GamePlayer';
import FeaturedGame from './FeaturedGame';
import { Game, GameCategory } from '../types/game';
import { games } from '../data/games';
import { useFavorites } from '../hooks/useFavorites';

function GameLibrary() {
  const [filter, setFilter] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const featuredGame = games.find(game => game.featured);
  
  const filteredGames = games.filter(game => {
    const matchesFilter = filter === 'all' || game.category === filter;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A1B] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="relative pt-16 pb-32 mb-[-4rem] overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center pt-16 pb-12 text-center">
            {/* Animated logo container */}
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center gap-4 px-7 py-4 bg-black rounded-lg leading-none">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  <h1 className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Game<span className="text-blue-400">Vault</span>
                  </h1>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-purple-200/80 max-w-2xl font-medium">
              Explora nuestra colección de juegos épicos construidos con tecnologías web modernas
            </p>

            {/* Stats bar */}
            <div className="flex gap-8 mt-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">{games.length} Juegos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">{favorites.length} Favoritos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {selectedGame ? (
          <GamePlayer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        ) : (
          <>
            {featuredGame && (
              <div className="mb-12">
                <FeaturedGame 
                  game={featuredGame} 
                  onSelect={() => setSelectedGame(featuredGame)}
                  isFavorite={isFavorite(featuredGame.id)}
                  onToggleFavorite={() => toggleFavorite(featuredGame.id)}
                />
              </div>
            )}

            <div className="sticky top-0 z-40 -mx-4 px-4 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium ${
                      filter === 'all' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    <Library size={18} />
                    Todos
                  </button>
                  <button
                    onClick={() => setFilter('javascript')}
                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium ${
                      filter === 'javascript' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    <Code2 size={18} />
                    JavaScript
                  </button>
                  <button
                    onClick={() => setFilter('python')}
                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium ${
                      filter === 'python' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    <Gamepad2 size={18} />
                    Python
                  </button>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar juegos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 bg-black/50 text-white px-4 py-2.5 pl-10 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-white/50"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <GameGrid 
                games={filteredGames} 
                onGameSelect={setSelectedGame}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameLibrary;