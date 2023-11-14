import React, { useEffect, useState } from "react";
import Layout from "../../Components/Global/Layout";
import Modal from "../../Components/Global/Modal/Modal";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import MaquinaCard from "../../Components/Maquina/MaquinaCard";
import apiMaquina from "../../Api/Maquina/maquina";
import { toast } from "sonner";
import MaquinaForm from "../../Components/Maquina/MaquinaForm";

function Maquina() {
  const [openModal, setOpenModal] = useState(false);
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    apiMaquina
      .getMaquinas()
      .then((response) => {
        setLoading(false);

        setMaquinas(response.data);
        toast.success("Maquinas cargadas");
      })
      .catch((error) => {
        setLoading(false);

        toast.error("error al consultar maquinas");
      });
  }, []);

  const refetchMaquina = (newMaquinasList) => {
    setMaquinas(newMaquinasList);
  };

  return (
    <>
      <Layout loading={loading}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Maquina"}
        >
          <MaquinaForm refetchData={refetchMaquina} />
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
              Agregar Maquina
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {maquinas?.map((maquina, index) => (
            <MaquinaCard key={index} maquina={maquina} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Maquina;
