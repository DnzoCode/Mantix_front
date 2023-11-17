import React, { useEffect, useState } from "react";
import {
  BiAdjust,
  BiAlarmAdd,
  BiAlarmOff,
  BiBrightness,
  BiMoon,
} from "react-icons/bi";
import LoadComponent from "../Global/LoadComponent";
import { Toaster, toast } from "sonner";
import SelectTecnico from "../Global/Selects/SelectTecnico";
import SelectMaquina from "../Global/Selects/SelectMaquina";
import apiEvent from "../../Api/Events/event";
import ErrorAlert from "../Global/ErrorAlert";

function EventForm({ refetch }) {
  const [modeForm, setModeForm] = useState("Register");
  const [event, setEvent] = useState({
    title: "Mantenimiento",
    start: "",
    end: "",
    maquina: "",
    tecnico: "",
    proveedor: null,
    turno: "",
    ejecucion: "",
    mensajeReprogramado: null,
    description: null,
    status: 3,
  });

  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  //Alimentar Selects
  const handleChange = ({ target: { name, value } }) => {
    setEvent({
      ...event,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e, mode) => {
    e.preventDefault();
    switch (mode) {
      case "Register":
        setLoading(true);
        apiEvent
          .addEvent(
            event.title,
            event.start,
            event.end,
            event.description,
            event.turno,
            event.mensajeReprogramado,
            event.ejecucion,
            event.tecnico,
            event.status,
            event.maquina
          )
          .then((response) => {
            setLoading(false);
            toast.success("Mantenimiento Programado Correctamente");
            setEvent({
              title: "Mantenimiento",
              start: "",
              end: "",
              maquina: "",
              tecnico: "",
              proveedor: null,
              turno: "",
              ejecucion: "",
              mensajeReprogramado: null,
              description: null,
              status: 3,
            });
            apiEvent
              .getEvent()
              .then((response) => {
                refetch(response.data);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                setLoading(false);
              });
          })
          .catch((error) => {
            toast.error(error.response.data.error);
            setLoading(false);
          });
        break;
      case "Masivo":
        setLoading(true);
        apiEvent
          .uploadEvent(file)
          .then(() => {
            apiEvent
              .getEvent()
              .then((response) => {
                refetch(response.data);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                setLoading(false);
              });
            setLoading(false);

            toast.success("Se cargaron todos los mantenimientos correctamente");
          })
          .catch((error) => {
            setLoading(false);
            setError({
              ...error,
              isError: true,
              errorMessage: error.response.data.errors,
            });
            toast.error("Error al subir los mantenimientos");
          });
        break;
    }
  };
  return (
    <>
      <Toaster richColors closeButton position="top-right" expand={false} />

      {loading ? (
        <LoadComponent />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, modeForm)}>
            <div className="w-full h-auto flex flex-col justify-center items-center">
              {error.isError && <ErrorAlert error={error.errorMessage} />}
              <div className="flex w-full items-center justify-end mt-6">
                <button
                  type="button"
                  className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none"
                  onClick={() =>
                    modeForm == "Register"
                      ? setModeForm("Masivo")
                      : setModeForm("Register")
                  }
                >
                  Cargue Masivo
                </button>
                <button
                  className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
                  disabled={
                    modeForm == "Register"
                      ? !event.start ||
                        !event.end ||
                        !event.turno ||
                        !event.ejecucion
                      : ""
                  }
                >
                  Programar Mantenimiento
                </button>
              </div>
              {modeForm == "Register" && (
                <>
                  <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                    <div className="w-full flex items-center">
                      <div className="flex flex-col w-1/2 pr-2 mb-8">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Tecnico
                        </label>
                        <SelectTecnico
                          setObject={setEvent}
                          objectSelect={event}
                          setLoading={setLoading}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 pl-2 mb-8">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Maquina
                        </label>
                        <SelectMaquina
                          setObject={setEvent}
                          objectSelect={event}
                          setLoading={setLoading}
                        />
                      </div>
                    </div>

                    <div className="w-full flex items-center">
                      <div className="flex flex-col w-1/2 pr-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Fecha Inicio
                        </label>
                        <input
                          type="date"
                          name="start"
                          id="start"
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 pl-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Fecha Fin
                        </label>
                        <input
                          type="date"
                          name="end"
                          id="end"
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-evenly my-8">
                      <h1 className="font-bold mb-4">
                        Turno del Mantenimiento
                      </h1>
                      <div className="flex items-center justify-around w-3/4 border-b-4">
                        <div className="input-container">
                          <input
                            type="radio"
                            name="turno"
                            id="turnoA"
                            className="radio-button"
                            value={"A"}
                            onChange={handleChange}
                          />
                          <div className="radio-title">
                            <BiBrightness className="icon" />
                            <label htmlFor="turnoA">A</label>
                          </div>
                        </div>
                        <div className="input-container">
                          <input
                            type="radio"
                            name="turno"
                            id="turnoA"
                            className="radio-button"
                            value={"B"}
                            onChange={handleChange}
                          />
                          <div className="radio-title">
                            <BiAdjust className="icon" />

                            <label htmlFor="turnoA">B</label>
                          </div>
                        </div>
                        <div className="input-container">
                          <input
                            type="radio"
                            name="turno"
                            id="turnoA"
                            className="radio-button"
                            value={"K"}
                            onChange={handleChange}
                          />
                          <div className="radio-title">
                            <BiMoon className="icon" />

                            <label htmlFor="turnoA">K</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-evenly my-8">
                      <h1 className="font-bold">Tipo mantenimiento</h1>
                      <div className="flex items-center justify-around w-3/4 border-b-4">
                        <div className="input-container large">
                          <input
                            type="radio"
                            name="ejecucion"
                            id="ejecucionP"
                            value={"P"}
                            onChange={handleChange}
                            className="radio-button"
                          />
                          <div className="radio-title large-text">
                            <BiAlarmAdd className="icon" />
                            <label htmlFor="turnoA" className="large-text">
                              Programado
                            </label>
                          </div>
                        </div>
                        <div className="input-container large">
                          <input
                            type="radio"
                            name="ejecucion"
                            id="ejecucionI"
                            value={"I"}
                            onChange={handleChange}
                            className="radio-button"
                          />
                          <div className="radio-title">
                            <BiAlarmOff className="icon" />

                            <label htmlFor="turnoA" className="large-text">
                              Incidente
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {modeForm == "Masivo" && (
                <>
                  <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                    <div className="w-full flex items-center mt-8">
                      <label htmlFor="" className="pl-2 pb-2 font-bold">
                        Cargar Archivo
                      </label>
                      <input
                        type="file"
                        className="bg-gray-200 p-2 rounded-md"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default EventForm;
