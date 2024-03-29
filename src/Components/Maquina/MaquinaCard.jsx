import React, { useState } from "react";
import { BiAward, BiBarcode, BiBookBookmark, BiTask } from "react-icons/bi";
import MaquinaForm from "./MaquinaForm";
import Modal from "../Global/Modal/Modal";

function MaquinaCard({ maquina, refetchMaquina }) {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  return (
    <>
      <Modal
        setOpenModal={setOpenModal}
        isOpen={openModal}
        title={"Editar Maquina " + maquina.maquina_name}
      >
        <MaquinaForm refetchData={refetchMaquina} id={id} />
      </Modal>
      <div className="bg-white shadow-md shadow-sky-200 flex flex-col rounded-lg p-4 justify-between">
        {/* HEAD CARD */}
        <div className="flex items-center w-full p-2">
          <div className="flex flex-col items-start w-4/5">
            <h2 className="font-bold text-lg">{maquina.maquina_name}</h2>
            <span className="bg-green-100 text-sm text-green-950 p-1 rounded-lg">
              {maquina.location?.location_name}
            </span>
          </div>
        </div>
        {/* CONTENT BODY */}
        <div className="flex flex-col justify-start items-start mt-4">
          <div className="flex justify-start items-center p-2 bg-gray-100 w-full rounded-md mb-2">
            <BiAward className="text-dark-purple text-3xl mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-center">
                Modelo de la maquina
              </span>
              <p>{maquina.maquina_modelo}</p>
            </div>
          </div>
          <div className="flex justify-start items-center p-2 bg-gray-100 w-full rounded-md mb-2">
            <BiBarcode className="text-dark-purple text-3xl mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-center">Número de Serial</span>
              <p>{maquina.numero_serial}</p>
            </div>
          </div>
          <div className="flex justify-start items-center p-2 bg-gray-100 w-full rounded-md mb-2">
            <BiBookBookmark className="text-dark-purple text-3xl mr-2" />
            <div className="flex flex-col">
              <span className="font-bold">Ultimo Mantenimiento</span>
              <p>
                {maquina.ultimo_mantenimiento
                  ? maquina.ultimo_mantenimiento
                  : "Aun no se completan mantenimientos"}
              </p>
            </div>
          </div>
        </div>
        {/* FOOTER CARD */}
        <div className="flex items-center justify-around gap-2 mt-4">
          <button
            onClick={() => {
              setOpenModal(true);
              setId(maquina.id);
            }}
            className="bg-orange-700 hover:bg-orange-800 transition-all w-full rounded-lg p-1 flex items-center justify-center text-white"
          >
            <BiTask className="mr-2" />
            <span>Editar</span>
          </button>
        </div>
        {/* <div className="flex items-center justify-around gap-2 mt-4">
          <button className="bg-blue-700 w-full rounded-lg p-1 flex items-center justify-center text-white">
            <BiTask className="mr-2" />
            <span>Historial</span>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default MaquinaCard;
