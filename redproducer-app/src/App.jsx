import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/authContext"; // Asegúrate de importar bien

// Importa los componentes de las páginas
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Perfil from "./components/Perfil"; // ✅ Importa la pantalla de perfil

function App() {
  return (
    // 🔹 Asegúrate de que `AuthProvider` envuelva TODO el `Router`
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

// Componente que maneja las rutas y muestra el Header solo si no está en /login
function MainContent() {
  const location = useLocation();
  const { user } = useAuth(); // Obtiene el usuario autenticado

  return (
    <>
      {/* Muestra el Header solo si NO está en /login */}
      {location.pathname !== "/login" && <Header />}

      <Routes>
        {/* Si el usuario está autenticado, redirige a /inicio, si no, a /login */}
        <Route path="/" element={user ? <Navigate to="/inicio" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/inicio" /> : <Login />} />
        <Route path="/inicio" element={user ? <Inicio /> : <Navigate to="/inicio" />} />
        <Route path="/perfil" element={user ? <Perfil /> : <Navigate to="/perfil" />} />
      </Routes>
    </>
  );
}

export default App;
