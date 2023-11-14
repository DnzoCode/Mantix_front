import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Asegúrate de importar el contexto de autenticación adecuado

function AuthMiddleware() {
  const navigate = useNavigate();
  const { tokenAuth } = useAuth();

  useEffect(() => {
    //console.log("SS"); Verificar el token y redirigir si es nulo
    if (tokenAuth === null && tokenAuth === undefined) {
      navigate("/login");
    }
  }, [tokenAuth, navigate]);

  return null;
}

export default AuthMiddleware;
