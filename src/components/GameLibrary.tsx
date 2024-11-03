"use client";

import { useState, useMemo } from "react";
import {
  Library,
  Code2,
  Gamepad2,
  Search,
  Star,
  Trophy,
  Gamepad,
  SortAsc,
  SortDesc,
  Github,
  Linkedin,
  MessageCircle,
  MailIcon,
  Blocks,
  Pen,
} from "lucide-react";
import GameGrid from "./GameGrid";
import GamePlayer from "./GamePlayer";
import FeaturedGame from "./FeaturedGame";
import { Game, GameCategory, SortOption } from "../types/game";
import { games } from "../data/games";
import { useFavorites } from "../hooks/useFavorites";

type SortDirection = "asc" | "desc";

export default function GameLibrary() {
  const [filter, setFilter] = useState<GameCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const featuredGame = useMemo(() => games.find((game) => game.featured), []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesFilter = filter === "all" || game.category === filter;
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="min-h-screen bg-[#0A0A1B] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="relative pt-16 pb-32 mb-[-4rem] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center pt-16 pb-12 text-center">
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center gap-4 px-7 py-4 bg-black rounded-lg leading-none">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
                      <Gamepad className="w-8 h-8 text-purple-300" />
                    </div>
                  </div>
                  <div className="relative">
                    <h1 className="text-6xl font-bold font-press-start bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                      Game<span className="text-blue-400">Hub</span>
                    </h1>
                    <a
                      href="https://github.com/CamiloEscar/juegos-app.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -top-3 -right-12 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-12 hover:shadow-purple-500/50"
                      title="Visita mi repo en GitHub"
                    >
                      <Github size={24} className="text-gray-800" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-purple-100/80 max-w-2xl font-medium">
              ¡Hola! Soy <strong className="text-purple-400">Camilo</strong>,
              explora mi colección de juegos construidos con herramientas web
              modernas. El propósito de esta web es tener una biblioteca de
              juegos creados con
              <strong className="text-orange-500"> HTML</strong>,
              <strong className="text-blue-500"> CSS</strong>, y
              <strong className="text-yellow-400"> JavaScript</strong>, así como
              también juegos hechos en
              <strong className="text-blue-700"> Java</strong> y
              <strong className="text-green-600"> Python</strong>.
            </p>

            <div className="flex gap-8 mt-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">{games.length} Juegos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">
                  {favorites.length} Favoritos
                </span>
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
                <div className="flex gap-2 pb-2 sm:pb-0">
                  <FilterButton
                    category="all"
                    currentFilter={filter}
                    setFilter={setFilter}
                  >
                    <Library size={18} />
                    Todos
                  </FilterButton>
                  <FilterButton
                    category="javascript"
                    currentFilter={filter}
                    setFilter={setFilter}
                  >
                    <Code2 size={18} />
                    JavaScript
                  </FilterButton>
                  <FilterButton
                    category="python"
                    currentFilter={filter}
                    setFilter={setFilter}
                  >
                    <Gamepad2 size={18} />
                    Python
                  </FilterButton>
                </div>

                <div className="flex gap-2">
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
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                        size={18}
                      />
                    </div>
                  </div>

                  <select
                    value={sortOption}
                    onChange={(e) =>
                      setSortOption(e.target.value as SortOption)
                    }
                    className="bg-black/50 text-white px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="title">Título</option>
                    <option value="id">ID</option>
                    <option value="favorites">Favoritos</option>
                  </select>

                  <button
                    onClick={toggleSortDirection}
                    className="bg-black/50 text-white px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    {sortDirection === "asc" ? (
                      <SortAsc size={18} />
                    ) : (
                      <SortDesc size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <GameGrid
                games={filteredGames}
                onGameSelect={setSelectedGame}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                sortOption={sortOption}
                sortDirection={sortDirection}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

interface FilterButtonProps {
  category: GameCategory;
  currentFilter: GameCategory;
  setFilter: (category: GameCategory) => void;
  children: React.ReactNode;
}

function FilterButton({
  category,
  currentFilter,
  setFilter,
  children,
}: FilterButtonProps) {
  return (
    <button
      onClick={() => setFilter(category)}
      className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium ${
        currentFilter === category
          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
          : "bg-white/5 text-white/80 hover:bg-white/10 hover:scale-105"
      }`}
    >
      {children}
    </button>
  );
}

function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16">
          {/* Sección de redes sociales */}
          <div className="flex-1 text-center md:text-left">
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Github className="text-white/60" />
                <a
                  href="https://github.com/CamiloEscar"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  CamiloEscar
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Linkedin className="text-white/60" />
                <a
                  href="https://www.linkedin.com/in/camiloescar"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  in/camiloescar
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Blocks className="text-white/60" />
                <a
                  href="https://camiloescar.vercel.app/links"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  Portfolio
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <Pen className="text-white/60" />
                <a
                  href="https://camiloescar.vercel.app/blog"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="flex-1 text-center md:text-left">
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <MessageCircle className="text-white/60" />
                <a
                  href="https://wa.me/3442475466"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <MailIcon className="text-white/60" />
                <a
                  href="mailto:camiloescar1995@gmail.com"
                  className="text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  camiloescar1995@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <hr className="border-white/20 my-6" />
        <div className="text-center">
          <p className="text-white/50 text-xs font-light">
            © 2024 Camilo Escar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
