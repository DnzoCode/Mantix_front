import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [tokenAuth, setToken] = useState(Cookies.get("tokenAuth"));

  const loginAuth = (tokenAuth) => {
    setToken(tokenAuth);
    Cookies.set("tokenAuth", tokenAuth, { expires: 7 });
  };

  const logoutAuth = () => {
    setToken(null);
    Cookies.remove("tokenAuth"); // Elimina la cookie
  };

  return (
    <AuthContext.Provider value={{ tokenAuth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
