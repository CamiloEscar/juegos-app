import { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, RefreshCw, Pause, Play, Volume2, VolumeX, ChevronLeft } from 'lucide-react';
import { Game } from '../types/game';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

function GamePlayer({ game, onClose }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (!document.fullscreenElement) {
      iframe.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePause = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'GAME_PAUSE' }, '*');
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'GAME_RESUME' }, '*');
      setIsPaused(false);
    }
  };

  const handleRestart = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'GAME_RESTART' }, '*');
      setGameProgress(0);
    }
  };

  const toggleMute = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'TOGGLE_SOUND', muted: !isMuted }, '*');
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'GAME_PROGRESS') {
        setGameProgress(event.data.progress);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl w-full aspect-video relative">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
              title="Back to game library"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-white">{game.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-white">Game Paused</h3>
              <button
                onClick={handleResume}
                className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                <Play size={24} />
                Resume Game
              </button>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          id="game-iframe"
          src={game.demoUrl}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title={game.title}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={isPaused ? handleResume : handlePause}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              title="Restart game"
            >
              <RefreshCw size={16} />
              <span className="text-sm">Restart</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300 ease-in-out"
                style={{ width: `${gameProgress}%` }}
              ></div>
            </div>
            <span className="text-white/80 text-sm">{gameProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePlayer;