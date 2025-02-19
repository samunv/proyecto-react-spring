import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Importa los componentes de las páginas
import Inicio from "./components/Inicio";
import Panel from "./components/Panel";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

// Componente que maneja las rutas y muestra el Header solo si no está en /login
function MainContent() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <>
      {/* Muestra el Header solo si NO está en /login */}
      {location.pathname !== "/login" && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </>
  );
}

export default App;
