import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

// Función para obtener el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth() ->", context); // 🛠 Verifica si el contexto es null o undefined
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
const login = async (email, password) => {
  try {
    console.log("Intentando iniciar sesión con:", email, password);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Inicio de sesión exitoso:", userCredential);
    return userCredential;
  } catch (error) {
    console.error("Error en inicio de sesión:", error.code, error.message);
    throw error;
  }
};

