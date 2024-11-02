import React from 'react';
import Navbar from './components/Navbar';
import GameLibrary from './components/GameLibrary';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <GameLibrary />
    </div>
  );
}

export default App;