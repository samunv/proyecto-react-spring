import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Importamos el CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Usamos el login de Firebase desde el contexto
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Intentando iniciar sesión con:", email, password); // 🔍 Verificar datos antes de enviar

    try {
      const userCredential = await login(email, password);
      console.log("Inicio de sesión exitoso:", userCredential);
      navigate("/inicio");
    } catch (error) {
      console.error("Error en inicio de sesión:", error.code, error.message);
      setError("❌ Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Imagen de logo: Vite usa `public/` como base, por lo que no se debe incluir "public/" en la ruta */}
        <img src="/img/logo-app2.png" alt="Logo" className="logo" />
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

