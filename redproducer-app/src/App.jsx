import './App.css';
import Header from './components/Header'; // Importa el Header
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos los componentes necesarios

// Importa los componentes de las páginas
import Inicio from './components/Inicio';
import Panel from './components/Panel';

function App() {
  return (
    <section>
      <Header /> {/* Coloca el Header fuera del Router */}
      <Router>
        <div>
          {/* Usa Routes y el prop "element" para pasar los componentes */}
          <Routes>
            <Route path="/" element={<Inicio />} />  {/* Ruta para la página de inicio */}
            <Route path="/panel" element={<Panel />} />  {/* Ruta para la página "Panel" */}
          </Routes>
        </div>
      </Router>
    </section>
  );
}

export default App;
