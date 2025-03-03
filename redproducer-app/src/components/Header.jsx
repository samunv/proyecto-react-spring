import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/authContext";

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Solución: Ocultar el menú, cerrar sesión, actualizar el estado y redirigir
  const handleLogout = async () => {
    setMenuOpen(false); // 🔹 Cierra el menú inmediatamente
    await logout(); // 🔹 Cierra sesión en Firebase
    navigate("/login", { replace: true }); // 🔹 Redirige al login sin guardar historial
    window.location.reload(); // 🔹 Recarga la página para forzar la actualización del estado de autenticación
  };

  return (
    <header className="header">
      <Link to="/" className="icono-app">
        <img src="/img/logo-app2.png" alt="Logo" />
      </Link>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/inicio">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"/>
              </svg>
              <p className="no-p-movil">Inicio</p>
            </Link>
          </li>
          <li ref={menuRef} className="perfil-menu">
            <button onClick={() => setMenuOpen(!menuOpen)} className="perfil-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
              </svg>
              <p className="no-p-movil">Perfil</p>
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <p className="user-name">{user?.displayName || user?.email}</p> {/* 🔹 Muestra el nombre o el email */}
                <button onClick={handleLogout}>Cerrar Sesión</button> {/* ✅ Cierra sesión y redirige de inmediato */}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
