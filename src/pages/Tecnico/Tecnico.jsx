import React from "react";
import Layout from "../../Components/Global/Layout";
import Modal from "../../Components/Global/Modal/Modal";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import { useEffect } from "react";
import apiTecnico from "../../Api/Tecnicos/tecnico";
import TecnicoCard from "../../Components/Tecnico/TecnicoCard";
import { useState } from "react";
import TecnicoForm from "../../Components/Tecnico/TecnicoForm";
function Tecnico() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    apiTecnico
      .getTecnicos()
      .then((response) => {
        setTecnicos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const refetchTecnico = (newTecnico) => {
    setTecnicos(newTecnico);
  };
  return (
    <>
      <Layout title={"Tecnicos"} loading={loading}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Tecnico"}
        >
          <TecnicoForm refetch={refetchTecnico} />
        </Modal>
        <div className="flex justify-between items-center p-4">
          <div></div>

          <div className="flex items-center">
            <button className="mr-4 p-2 rounded-lg flex items-center">
              <BiListUl />
            </button>
            <button className="mr-4 bg-blue-600 text-white p-2 rounded-lg flex items-center ">
              <BiSolidGrid />
            </button>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-800 duration-100"
              onClick={() => setOpenModal(true)}
            >
              <BiPlus className="text-xl" />
              Agregar Tecnico
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {tecnicos?.map((tecnico, index) => (
            <TecnicoCard key={index} tecnico={tecnico} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Tecnico;
