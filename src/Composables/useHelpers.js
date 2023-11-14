import Cookies from "js-cookie";
import { jwtVerify } from "jose";
import apiAuth from "../Api/Auth/auth";

export function getTokenFromCookie() {
  const storedToken = Cookies.get("tokenAuth");
  if (storedToken) {
    try {
      const tokenData = storedToken.split(".")[1]; // Obtiene la parte de datos Base64 del token
      const decodedData = atob(tokenData); // Decodifica la parte de datos Base64
      const decodedToken = JSON.parse(decodedData); // Analiza el JSON resultante
      return decodedToken;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return null;
}

export async function AuthUser() {
  const token = getTokenFromCookie();

  try {
    const userInfo = await apiAuth.getUserById(token.user_id);
    return userInfo.data;
  } catch (error) {
    console.log(error);
    // Puedes decidir cómo manejar el error aquí, por ejemplo, lanzar una excepción o devolver un valor predeterminado.
    return null;
  }
}
