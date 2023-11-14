import React from "react";
import { useState, useEffect } from "react";
import {
  BiMenuAltLeft,
  BiSolidDashboard,
  BiSolidCalendar,
  BiSolidWrench,
  BiSolidGroup,
  BiSolidBox,
  BiSolidUserBadge,
  BiPodcast,
  BiAward,
} from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiMenu from "../../Api/Menu/menu";
import { toast } from "sonner";
import { useAuth } from "../../Context/AuthContext";
import { AuthUser } from "../../Composables/useHelpers";

function SideBar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await AuthUser();
      apiMenu
        .getMenuByRole(userInfo.role.id)
        .then((response) => setMenu(response.data.mensaje))
        .catch((error) => console.error("Error fetching menu", error));
    };

    fetchData();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    logoutAuth();
    navigate("/login");
    toast.success("Sesion Terminada");
  };

  return (
    <>
      <div
        className={`sidebar bg-dark-purple h-screen flex flex-col justify-stretch duration-300 relative overflow-auto ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div
          className={`flex justify-between items-center p-5 ${
            open ? "flex-row" : "flex-col-reverse"
          }`}
        >
          <div className="flex items-center">
            <img
              src="./MantixLogo.png"
              width={70}
              alt="LogoMantix"
              title="LogoMantix"
            />
            <span
              className={`text-white text-xl font-bold ${
                open ? "block" : "hidden"
              }`}
            >
              Mantix
            </span>
          </div>
          <BiMenuAltLeft
            className={`text-gray-400 text-3xl cursor-pointer`}
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className={`flex flex-col justify-start `}>
          {menu.map((item, index) => (
            <Link
              to={item.menu.menu_to}
              key={index}
              className={`flex w-full ${
                location.pathname == item.menu.menu_to
                  ? "text-white"
                  : "text-gray-500"
              } h-auto items-center cursor-pointer duration-150 hover:text-white`}
            >
              <div
                className={`w-1 bg-white rounded-tr-3xl rounded-br-3xl h-6 ${
                  location.pathname == item.menu.menu_to ? "flex" : "hidden"
                }`}
              ></div>
              <div
                className={`flex items-center p-4 w-full ${
                  !open ? "items-center justify-center " : ""
                }`}
              >
                {item.menu.menu_icon == "dashboard" ? (
                  <BiSolidDashboard className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "calendar" ? (
                  <BiSolidCalendar className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "event" ? (
                  <BiSolidWrench className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "maquinas" ? (
                  <BiSolidBox className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "locations" ? (
                  <BiPodcast className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "tecnicos" ? (
                  <BiSolidUserBadge className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "tecnicos" ? (
                  <BiAward className="text-2xl mr-2" />
                ) : item.menu.menu_icon == "users" ? (
                  <BiSolidGroup className="text-2xl mr-2" />
                ) : (
                  ""
                )}
                <span
                  className={`${!open ? "hidden" : "block"} whitespace-normal`}
                >
                  {item.menu.menu_name}
                </span>
              </div>
            </Link>
          ))}
          <button onClick={logOut}>Cerrar Sesion</button>
        </div>

        <div className="w-full flex flex-col justify-end items-center bottom-0">
          <div className="flex flex-col items-center bg-gray-400 bg-opacity-10 m-4 rounded-md shadow-xl backdrop-blur-lg h-auto">
            <div
              className={`my-3 ${
                !open ? "hidden" : "flex flex-col justify-center items-center"
              }`}
            >
              <span className="font-bold text-white mb-2">Mantix beta app</span>
              <p className="text-justify px-2 text-white font-light text-sm">
                Aun estoy en desarrollo. Pronto tendre mas funcionalidades
              </p>
            </div>
            <img
              className={`object-contain shadow-lg ${!open ? "p-2" : "mb-4 "}`}
              src="beta-app.png"
              width={200}
              alt="LogoMantix"
              title="LogoMantix"
            />
          </div>
        </div>
        <div
          className={`h-full flex flex-col items-end justify-end duration-150 ${
            open ? "pb-4 pr-8" : "pb-4 pr-1 text-xs"
          } `}
        >
          <span className="text-center text-gray-400 ">V beta-0.0.1</span>
        </div>
      </div>
    </>
  );
}

function areEqual(prevProps, nextProps) {
  // Si 'open' no cambia, no hay necesidad de volver a renderizar
  return prevProps.open === nextProps.open;
}

export default React.memo(SideBar, areEqual);
