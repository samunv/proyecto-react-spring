import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "../css/Perfil.css"; // Asegúrate de crear un archivo CSS para estilos

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // 🔹 Redirigir al login después de cerrar sesión
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div className="perfil-info">
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>ID de Usuario:</strong> {user.uid}</p>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Perfil;
