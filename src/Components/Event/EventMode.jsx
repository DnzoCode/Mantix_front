import React, { useEffect, useState } from "react";
import SelectTecnico from "../Global/Selects/SelectTecnico";
import apiEvent from "../../Api/Events/event";
import { toast } from "sonner";
import apiWorkOrder from "../../Api/workOrder/workOrder";
import { getTokenFromCookie } from "../../Composables/useHelpers";
import { apiDay } from "../../Api/Day/day";
import apiMaquina from "../../Api/Maquina/maquina";
function EventMode({
  mode,
  open,
  eventId,
  tecnicoId,
  refetchData,
  ejecucion,
  dateInfo,
  estadoEvent,
  load,
  refetchEventByFecha,
  eventCount,
  dayInfo,
  maquinaId,
}) {
  let fechaActual = new Date();
  let hora = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let segundos = fechaActual.getSeconds();
  let horaFormateada = hora + ":" + minutos + ":" + segundos;
  let userId = 0;
  const [workOrderId, setWorkOrderId] = useState([]);
  const decodedToken = getTokenFromCookie();
  useEffect(() => {
    if (decodedToken) {
      userId = decodedToken.user_id;
    }
  }, [decodedToken]);
  const titleWorkOrder = {
    programado: `R-${dateInfo}`,
    incidente: `A-${dateInfo}`,
    mantenimiento: `R-${dateInfo}`,
  };

  const [ejecutar, setEjecutar] = useState({
    event_id: eventId,
    work_order:
      ejecucion == "P"
        ? titleWorkOrder.mantenimiento
        : ejecucion == "I"
        ? titleWorkOrder.incidente
        : "",
    hora_inicio: horaFormateada,
    diagnostico: "",
    trabajo_realizado: "",
    tecnico: "",
  });

  const [completar, setCompletar] = useState({
    owner: null,
    actividades: "",
    causas: "",
    horaFin: horaFormateada,
    observacion: "",
  });

  const [reprogramar, setReprogramar] = useState({
    start: "",
    end: "",
    mensaje_reprogramado: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    if (mode == "R") {
      setReprogramar({
        ...reprogramar,
        [name]: value,
      });
    } else if (mode == "E") {
      setEjecutar({
        ...ejecutar,
        [name]: value,
      });
    } else if (mode == "C") {
      setCompletar({
        ...completar,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode == "R") {
        load(true);

        await apiEvent
          .updateEvent(eventId, {
            status: 5,
            start: reprogramar.start,
            end: reprogramar.end,
            mensaje_reprogramado: reprogramar.mensaje_reprogramado,
          })
          .then(async (response) => {
            await apiEvent.getEvent().then((response) => {
              refetchData(response.data);
            });

            await apiEvent.getEventByFecha(dateInfo).then(async (response) => {
              await refetchEventByFecha(response.data);

              if (eventCount == 0) {
                apiDay.updateDay(dayInfo.id, {
                  isClosed: "S",
                });
              }
            });
            load(false);

            toast.success(
              "Mantenimiento reprogramado para " + reprogramar.start
            );
          });
      } else if (mode == "E") {
        load(true);

        await apiEvent
          .updateEvent(eventId, {
            status: 4,
            tecnico: !tecnicoId ? ejecutar.tecnico : tecnicoId,
          })
          .then(async (response) => {
            apiMaquina.updateMaquina(maquinaId, {
              ultimo_mantenimiento: new Date().getDate(),
            });
            await apiWorkOrder.addWorkOrder(
              ejecutar.work_order,
              ejecutar.trabajo_realizado,
              ejecutar.diagnostico,
              null,
              null,
              null,
              ejecutar.hora_inicio,
              null,
              eventId,
              1,
              !tecnicoId ? ejecutar.tecnico : tecnicoId,
              userId
            );

            await apiEvent.getEvent().then((response) => {
              refetchData(response.data);
            });
            // refetchData(response.data);
            await apiEvent.getEventByFecha(dateInfo).then((response) => {
              refetchEventByFecha(response.data);
            });
            load(false);

            toast.success("Mantenimiento en ejecucion");
          });
      } else if (mode == "C") {
        load(true);

        await apiEvent.updateEvent(eventId, {
          status: 6,
        });
        // const idWorkOrder = workOrderId.map((work) => work.id);
        await apiWorkOrder
          .getWorkOrderByEvent(eventId)
          .then(async (response) => {
            await apiWorkOrder.updateWorkOrder(response.data.id, {
              actividades: completar.actividades,
              causas: completar.causas,
              hora_fin: completar.horaFin,
              observacion: completar.observacion,
            });
          });

        await apiEvent.getEvent().then((response) => {
          refetchData(response.data);
        });

        await apiEvent.getEventByFecha(dateInfo).then((response) => {
          refetchEventByFecha(response.data);
        });
        load(false);

        toast.success("Mantenimiento Completado");
      }
    } catch (error) {
      load(false);
      console.log(error);
      toast.error("Ocurrió un error inesperado. La operación se detuvo.");
    }
  };
  return (
    <>
      {open && (
        <>
          {mode == "E" && estadoEvent != 4 && (
            <>
              <form onSubmit={handleSubmit} className="w-full h-auto">
                <div className="w-full flex justify-around items-end py-2">
                  {!tecnicoId && (
                    <div className="flex flex-col justify-evenly w-full pr-2">
                      <span className="pl-2">Tecnico Responsable</span>
                      <SelectTecnico
                        setLoading={load}
                        setObject={setEjecutar}
                        objectSelect={ejecutar}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Diagnostico</span>
                  <textarea
                    id="diagnostico"
                    rows="2"
                    className="p-2 rounded-md bg-white mx-2 "
                    name="diagnostico"
                    value={ejecutar.diagnostico}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Trabajo a realizar</span>
                  <textarea
                    id="trabajo_realizado"
                    rows="2"
                    className="p-2 rounded-md bg-white mx-2"
                    name="trabajo_realizado"
                    value={ejecutar.trabajo_realizado}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex flex-col justify-evenly w-full py-4">
                  <button className="p-2 bg-blue-400 rounded-lg mx-2">
                    Ejecutar
                  </button>
                </div>
              </form>
            </>
          )}

          {mode == "C" && estadoEvent != 6 && (
            <>
              <p className="font-bold">Completar Mantenimiento</p>

              <form onSubmit={handleSubmit} className="w-full h-auto">
                <div className="w-full flex justify-around items-end py-2"></div>
                {/* <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Responsable</span>
                  <Select
                    options={listOwners}
                    placeholder={"Selecciona el Owner"}
                    name="owner"
                    value={selectedOptionOwner}
                    onChange={(selected) => handleSelectChange(selected)}
                  />
                </div> */}
                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Actividades</span>
                  <textarea
                    id="actividades"
                    rows="2"
                    className="p-2 rounded-md bg-white mx-2 "
                    name="actividades"
                    value={completar.actividades}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Causas</span>
                  <textarea
                    id="causas"
                    rows="2"
                    className="p-2 rounded-md bg-white mx-2 "
                    name="causas"
                    value={completar.causas}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Observaciones</span>
                  <textarea
                    id="observacion"
                    rows="2"
                    className="p-2 rounded-md bg-white mx-2 "
                    name="observacion"
                    value={completar.observacion}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col justify-evenly w-full py-4">
                  <button className="p-2 bg-green-400 rounded-lg mx-2">
                    Completar
                  </button>
                </div>
              </form>
            </>
          )}

          {mode == "R" && (
            <>
              <p className="font-bold">Reprogramar</p>
              <form onSubmit={handleSubmit} className="w-full h-auto">
                <div className="w-full flex justify-around items-end py-2">
                  <div className="flex flex-col justify-evenly w-1/2 pr-2">
                    <span className="pl-2">Fecha inicio a reprogramar</span>
                    <input
                      type="date"
                      className="p-2 rounded-md bg-gray-200"
                      name="start"
                      value={reprogramar.start}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col justify-evenly w-1/2 pl-2">
                    <span className="pl-2">Fecha final</span>
                    <input
                      type="date"
                      className="p-2 rounded-md bg-gray-200"
                      name="end"
                      value={reprogramar.end}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-evenly w-full">
                  <span className="pl-2">Justificacion</span>
                  <textarea
                    id="mensaje_reprogramado"
                    rows="2"
                    className="p-2 rounded-md bg-gray-200 "
                    name="mensaje_reprogramado"
                    value={reprogramar.mensaje_reprogramado}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex flex-col justify-evenly w-full py-4">
                  <button className="p-2 bg-yellow-400 rounded-lg mx-2">
                    Reprogramar
                  </button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}

export default EventMode;
