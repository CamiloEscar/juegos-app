import { Gamepad2, Github } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Gamepad2 size={24} className="text-white" />
            </div>
            {/* <span className="font-bold text-xl hidden sm:inline text-white">GameDev</span> */}
            <span className="font-bold text-xl sm:hidden text-white">GD</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Github size={20} />
              <span className="hidden sm:inline">Ver Repo</span>
            </a>
            {/* <a
              href="#games"
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
            >
              Play Games
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;