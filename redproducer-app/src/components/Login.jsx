import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Importamos el CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await register(email, password);
        alert("✅ Usuario registrado correctamente. Ahora inicia sesión.");
        setIsRegistering(false);
      } else {
        await login(email, password);
        navigate("/inicio");
      }
    } catch (error) {
      setError(error.message); // 🔹 Mostramos el error recibido
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/inicio");
    } catch (error) {
      setError("❌ Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/img/logo-app2.png" alt="Logo" className="logo" />
        <h2>{isRegistering ? "Regístrate" : "Iniciar Sesión"}</h2>
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
          <button type="submit">{isRegistering ? "Registrarse" : "Entrar"}</button>
        </form>

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="/img/google.png" alt="Google" className="google-icon" />
          Iniciar sesión con Google
        </button>

        <p className="toggle-text">
          {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
