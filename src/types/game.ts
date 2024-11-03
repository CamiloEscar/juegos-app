export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
  playTime: string;
  players:string;
  demoUrl: string;
  sourceUrl: string;
  iframeUrl?: string;
  featured?: boolean;
}

export type GameCategory = 'all' | 'javascript' | 'python';
export type SortOption = 'rating' | 'title' | 'favorites';