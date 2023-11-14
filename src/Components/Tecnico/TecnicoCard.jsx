import React from "react";
import { BiCog, BiGroup } from "react-icons/bi";

function TecnicoCard({ tecnico }) {
  return (
    <>
      <div className="bg-white shadow-md flex flex-col rounded-lg p-4 ">
        {/* HEAD CARD */}
        <div className="flex items-center w-full p-2">
          <BiGroup className="text-2xl mr-2" />

          <div className="flex flex-col items-start w-4/5">
            <h2 className="font-bold text-lg">
              {tecnico.tecnico_name} {tecnico.tecnico_apellido}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default TecnicoCard;
