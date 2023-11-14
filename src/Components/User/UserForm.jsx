import React, { useEffect, useState } from "react";
import { BiAdjust, BiBrightness } from "react-icons/bi";
import Select from "react-select";
import apiLocation from "../../Api/Locations/location";
import { Toaster, toast } from "sonner";
import apiRole from "../../Api/Role/role";
import LoadComponent from "../Global/LoadComponent";
import apiAuth from "../../Api/Auth/auth";

function UserForm({ refetchData }) {
  const [user, setUser] = useState({
    user_name: "",
    user_lastname: "",
    user_login: "",
    user_email: "",
    user_password: "",
    is_owner: "",
    location: "",
    role: "",
    status: 1,
  });
  const [location, setLocation] = useState(null);
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedOptionRole, setSelectedOptionRole] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    apiLocation
      .getLocations()
      .then((response) => setLocation(response.data))
      .catch((error) => {
        toast.error(error.response.data.error);
      });
    apiRole
      .getRoles()
      .then((response) => setRole(response.data))
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }, []);

  //Alimentar Selects
  const listLocations = location?.map((locat) => {
    return {
      value: locat.id,
      label: `${locat.location_name}`,
    };
  });
  const listRole = role?.map((rol) => {
    return {
      value: rol.id,
      label: `${rol.role}`,
    };
  });

  const handleSelectChange = (selected, selectNumber) => {
    if (selectNumber === 1) {
      setSelectedOptionLocation(selected);
      setUser({ ...user, location: selected.value });
    } else if (selectNumber === 2) {
      setSelectedOptionRole(selected);
      setUser({ ...user, role: selected.value });
    }
  };
  // Fin alimentar selects

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    apiAuth
      .addUsers(
        user.user_name,
        user.user_lastname,
        user.user_login,
        user.user_email,
        user.user_password,
        user.is_owner,
        user.location,
        user.role,
        user.status
      )
      .then((response) => {
        setLoading(false);
        toast.success("Usuario registrado correctamente");
        setUser({
          user_name: "",
          user_lastname: "",
          user_login: "",
          user_email: "",
          user_password: "",
          is_owner: "",
          location: "",
          role: "",
          status: 1,
        });
        apiAuth
          .getUsers()
          .then((response) => {
            refetchData(response.data);
          })
          .catch((error) => {
            toast.error(error.response.data.error);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <Toaster richColors closeButton position="top-right" expand={false} />
      {loading ? <LoadComponent /> : ""}
      <form onSubmit={handleSubmit}>
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <div className="flex w-full items-center justify-end mt-6">
            <button
              type="button"
              className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none"
            >
              Cargue Masivo
            </button>
            <button
              className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
              disabled={
                !user.user_name ||
                !user.user_lastname ||
                !user.user_login ||
                !user.user_email ||
                !user.user_password ||
                !user.is_owner
              }
            >
              Registrar Maquina
            </button>
          </div>

          <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
            <div className="w-full flex items-center mt-8">
              <div className="flex flex-col w-1/3 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={user.user_name}
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/3 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  name="user_lastname"
                  id="user_lastname"
                  value={user.user_lastname}
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/3 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="user_login"
                  id="user_login"
                  value={user.user_login}
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex items-center mt-8">
              <div className="flex flex-col w-1/2 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  value={user.user_email}
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2 pl-2">
                <label htmlFor="" className="pl-2 pb-2 font-bold">
                  Contrasena
                </label>
                <input
                  type="password"
                  name="user_password"
                  id="user_password"
                  value={user.user_password}
                  className="bg-gray-200 p-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex items-center mt-8">
              <div className="flex flex-col w-1/2 pr-2">
                <Select
                  options={listLocations}
                  placeholder={"Selecciona la locacion del usuario"}
                  name="location"
                  value={selectedOptionLocation}
                  onChange={(selected) => handleSelectChange(selected, 1)}
                />
              </div>
              <div className="flex flex-col w-1/2 pr-2">
                <Select
                  options={listRole}
                  placeholder={"Selecciona el rol del usuario"}
                  name="location"
                  value={selectedOptionRole}
                  onChange={(selected) => handleSelectChange(selected, 2)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-evenly my-8">
              <h1 className="font-bold mb-4">Dueno de Proceso</h1>
              <div className="flex items-center justify-around w-3/4 border-b-4">
                <div className="input-container">
                  <input
                    type="radio"
                    name="is_owner"
                    id="is_ownerS"
                    className="radio-button"
                    value={"S"}
                    onChange={handleChange}
                  />
                  <div className="radio-title">
                    <BiBrightness className="icon" />
                    <label htmlFor="turnoA">SI</label>
                  </div>
                </div>
                <div className="input-container">
                  <input
                    type="radio"
                    name="is_owner"
                    id="is_ownerN"
                    className="radio-button"
                    value={"N"}
                    onChange={handleChange}
                  />
                  <div className="radio-title">
                    <BiAdjust className="icon" />

                    <label htmlFor="turnoA">No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserForm;
