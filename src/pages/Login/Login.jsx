import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../Api/Auth/auth";
import { toast, Toaster } from "sonner";
import LoadPage from "../../Components/Global/LoadPage";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { loginAuth } = useAuth();
  //   const [token, setToken] = useState({ token: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    apiAuth
      .login(login.email, login.password)
      .then((response) => {
        const token = response.data.access_token;
        loginAuth(token); // Actualiza el estado de autenticación
        setLoading(false);
        toast.success("Autenticado Correctamente");
        navigate("/users");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.error);
      });
  };
  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <>
      {loading ? <LoadPage /> : ""}
      <Toaster richColors closeButton position="top-right" expand={false} />
      <div className="w-screen h-screen bg-dark-purple flex justify-center items-center">
        <div className="bg-white bg-opacity-70 w-3/4 h-5/6 rounded-xl shadow-lg flex justify-center">
          <div className="w-1/2 bg-transparent -gray flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center mb-4">
              <h1 className="text-6xl mr-12">Mantix</h1>
              <h2 className="text-md font-light text-dark-purple">Beta</h2>
            </div>
            <div className="w-full flex justify-center items-center">
              <span className="text-dark-purple font-bold">
                Gestion de Mantenimientos
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-4 w-1/2 h-full justify-center shadow-2xl rounded-tl-xl rounded-bl-lg ml-8 bg-white"
          >
            <h1 className="text-2xl font-bold text-center mb-8">
              Iniciar Sesion
            </h1>

            <div className="w-full flex flex-col justify-center">
              <div className="flex flex-col items-center mb-8">
                <label htmlFor="" className="p-4">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="email"
                  className="p-2 bg-gray-200 w-4/5 rounded-lg shadow-xl"
                  value={login.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col items-center mb-8">
                <label htmlFor="" className="p-4">
                  Contrasena
                </label>
                <input
                  type="password"
                  name="password"
                  className="p-2 bg-gray-200 w-4/5 rounded-lg shadow-xl"
                  value={login.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="p-4 shadow-xl border rounded-xl hover:bg-dark-purple duration-200 hover:text-white">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
