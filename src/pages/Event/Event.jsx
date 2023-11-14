import React, { useEffect, useState } from "react";
import Layout from "../../Components/Global/Layout";
import { BiPlus } from "react-icons/bi";
import Modal from "../../Components/Global/Modal/Modal";
import EventForm from "../../Components/Event/EventForm";
import Calendar from "../../Components/Event/Calendar";
import apiEvent from "../../Api/Events/event";
import { toast } from "sonner";

function Event() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const MemoizedCalendar = React.memo(Calendar);

  useEffect(() => {
    apiEvent
      .getEvent()
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
        toast.success("Mantenimientos cargados correctamente");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });
  }, []);

  const refetchEvent = (newEvents) => {
    setEvents(newEvents);
  };
  return (
    <>
      <Layout title={"Mantenimientos"} loading={loading}>
        <Modal
          title={"Programar Mantenimiento"}
          setOpenModal={setOpenModal}
          isOpen={openModal}
        >
          <EventForm refetch={refetchEvent} />
        </Modal>
        <div className="flex justify-between items-center p-4">
          <div></div>
          <div className="flex items-center">
            <button
              className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-800 duration-100"
              onClick={() => setOpenModal(true)}
            >
              <BiPlus className="text-xl" />
              Programar Mantenimiento
            </button>
          </div>
        </div>
        <div className="w-auto flex justify-center items-center mb-4">
          <h1 className="font-bold text-3xl">
            PROGRAMA MANTENIMIENTO PREVENTIVO DE EQUIPOS{" "}
          </h1>
          <span className="bg-white p-2 text-2xl ml-2 rounded-md shadow-sm">
            {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex flex-col justify-stretch items-center w-full h-full">
          <div className="bg-white rounded-lg shadow-xl">
            <MemoizedCalendar refetch={refetchEvent} data={events} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Event;
