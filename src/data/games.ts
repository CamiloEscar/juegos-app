import { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "1",
    title: "Tetris",
    description:
      "Juego de Tetris, resuelto de una prueba tecnica.",
    image:
      "../../public/images/tetris.jpg",
    category: "javascript",
    tech: ["HTML5", "CSS3"],
    demoUrl: "/games/04-tetris/index.html",
    sourceUrl: "#",
    playTime: "10-15m",
    players: "1",
    featured: true,
  },
  {
    id: "2",
    title: "Space Invaders",
    description:
      "Clasico juego de arcade",
    image: "../../public/images/space-invaders.jpg",
    category: "javascript",
    tech: ["HTML5 Canvas", "CSS3"],
    demoUrl: "/games/01-space-invaders/index.html",
    sourceUrl: "http://github.com/CamiloEscar",
    featured: true,
    playTime: "15-20m",
    players: "1-2",
  },
  {
    id: "3",
    title: "Snake",
    description:
      "Juego de la viborita que tiene menos pixeles que el juego original",
    image:
      "../../public/images/snake.jpg",
    category: "javascript",
    tech: ["HTML5", "CSS3"],
    demoUrl: "/games/02-snake/index.html",
    sourceUrl: "#",
    featured: true,
    playTime: "5-10m",
    players: "1",
  },
  {
    id: "4",
    title: "Candy Crush",
    description: "Prueba del adictivo juego de candy crush, hecho con html y javascript.",
    image:
      "../../public/images/candy-crush.jpg",
    category: "javascript",
    tech: ["HTML5", "CSS3"],
    demoUrl: "/games/03-candy-crush/index.html",
    sourceUrl: "https://github.com/tu-usuario/candy-crush",
    playTime: "10-15m",
    featured: true,
    players: "1",
  },
  {
    id: "5",
    title: "Mortal Kombat",
    description:
    "Juego de pelea de cubos sin brazos ni piernas, se atacan con imaginacion.",
    image:
    "../../public/images/mortal-kombat.webp",
    category: "javascript",
    tech: ["HTML5 Canvas", "CSS3"],
    demoUrl: "/games/05-mortal-kombat/index.html",
    sourceUrl: "#",
    featured: true,
    playTime: "15-20m",
    players: "1-2",
  }
];

// https://github.com/midudev/javascript-100-proyectos/blob/main/03-midu-typing-game/data.js
// https://codewithcurious.com/projects/number-guessing-game-using-html-css-and-javascript/
// https://github.com/kubowania/candy-crush/blob/master/app.js