import React from "react";
import { useState } from "react";

function CalendarContent({ eventInfo }) {
  const [open, setOpen] = useState(false);
  const { id, ejecucion, status, maquina, tecnico, proveedor } =
    eventInfo.event._def.extendedProps;

  const statusColors = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    gray: "bg-gray-400",
  };

  const statusLigth = {
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    gray: "bg-gray-100",
  };

  const statusShadow = {
    yellow: "shadow-yellow-200",
    blue: "shadow-blue-200",
    green: "shadow-green-200",
    gray: "shadow-gray-200",
  };
  return (
    <>
      <div
        onClick={() => {
          !open ? setOpen(true) : setOpen(false);
        }}
        className={`h-20 border-none flex w-full mb-2 text-dark-purple shadow-md  rounded-md cursor-pointer transition-all ease-in-out duration-300
            
            ${
              status.id == 3
                ? statusLigth.gray
                : status.id == 4
                ? statusLigth.blue
                : status.id == 5
                ? statusLigth.yellow
                : status.id == 6
                ? statusLigth.green
                : ""
            }
            ${
              status.id == 3
                ? statusShadow.gray
                : status.id == 4
                ? statusShadow.blue
                : status.id == 5
                ? statusShadow.yellow
                : status.id == 6
                ? statusShadow.green
                : ""
            }
            `}
      >
        <div
          className={`transition-all ease-in-out duration-300 ${
            !open ? "w-2" : "w-full rounded-tr-md rounded-br-md"
          } relative rounded-tl-md rounded-bl-md ${
            status.id == 3
              ? statusColors.gray
              : status.id == 4
              ? statusColors.blue
              : status.id == 5
              ? statusColors.yellow
              : status.id == 6
              ? statusColors.green
              : ""
          }`}
        >
          {open && (
            <>
              <div className="w-full h-full flex justify-center items-center text-white">
                {tecnico && (
                  <span>{`${tecnico?.tecnico_name} ${tecnico?.tecnico_apellido}`}</span>
                )}
                {!tecnico && <span>No tiene tecnico asignado</span>}
              </div>
            </>
          )}
        </div>
        <div
          className={`flex flex-col h-auto overflow-auto ${
            !open ? "w-full" : "w-0"
          }`}
        >
          <div className="w-full text-center font-extrabold text-dark-purple mt-4 text-md whitespace-normal">
            {maquina?.maquina_name}
          </div>
          <div className="w-full flex justify-around items-center mt-2">
            <span className="text-md">{maquina?.location?.location_name}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarContent;
