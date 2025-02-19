import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Importamos los estilos

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
      {/* Barra superior con logo */}
      <div className="login-container">
        <img src="/img/logo-app2.png" alt="Logo" className="logo" />
      {/* Contenedor del formulario */}
      <div className="login-container">
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
	</div>
  );
}

export default Login;
