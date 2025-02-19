import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Importamos los estilos
import logo from "/img/logo-app2.png"; // Asegúrate de que la ruta sea correcta

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async () => {
    setError(""); // Reseteamos errores antes de hacer la petición

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/panel"); // Redirigir después del login exitoso
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Contenedor del formulario */}
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" /> {/* Imagen dentro del contenedor */}

        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
		
      </div>
    </div>
  );
}

export default Login;
