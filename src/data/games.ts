import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 3,
    title: "Candy Crush",
    description: "Match colorful candies in this addictive puzzle game.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    category: "javascript",
    tech: ["HTML5", "CSS3"],
    demoUrl: "/games/03-candy-crush/index.html",
    sourceUrl: "https://github.com/tu-usuario/candy-crush",
    playTime: "10-15m",
    players: "1"
  },
  {
    id: 2,
    title: "Snake Evolution",
    description: "The classic Snake game reimagined with modern graphics and special abilities.",
    image: "https://images.unsplash.com/photo-1619646176605-b7417fb53b1e?auto=format&fit=crop&q=80&w=1000",
    category: "javascript",
    tech: ["HTML5", "CSS3"],
    demoUrl: "/games/02-snake/index.html",
    sourceUrl: "#",
    playTime: "5-10m",
    players: "1"
  },
  {
    id: 1,
    title: "Space Invaders",
    description: "A modern take on the classic arcade game with smooth animations and power-ups.",
    image: "../../public/images/space-invaders.jpg",
    category: "javascript",
    tech: ["HTML5 Canvas", "CSS3"],
    demoUrl: "/games/01-space-invaders/index.html",
    sourceUrl: "#",
    featured: true,
    playTime: "15-20m",
    players: "1-2"
  },
];