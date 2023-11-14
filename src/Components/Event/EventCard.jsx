import React, { useState } from "react";
import { BiCaretDown, BiSolidHand } from "react-icons/bi";
import EventMode from "./EventMode";
import LoadComponent from "../Global/LoadComponent";
import { useEffect } from "react";
import { apiDay } from "../../Api/Day/day";
import { toast } from "sonner";
import apiEvent from "../../Api/Events/event";

function EventCard({
  eventData,
  dateString,
  refetchData,
  refetchEventByFecha,
}) {
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
    gray: "bg-gray-200",
  };

  const statusShadow = {
    yellow: "shadow-yellow-200",
    blue: "shadow-blue-200",
    green: "shadow-green-200",
    gray: "shadow-gray-300",
  };

  const [open, setOpen] = useState({});
  const [mode, setMode] = useState("");
  const [openFunction, setOpenFunction] = useState(false);
  const [load, setLoad] = useState(false);
  const [allEventCompleted, setAllEventCompleted] = useState(false);
  const [previousDay, setPreviousDay] = useState({});
  const [actualDay, setActualDay] = useState({});
  const MemoizedEventMode = React.memo(EventMode);
  useEffect(() => {
    const isAllCompleted = eventData.every((event) => event.status.id == 6);
    setAllEventCompleted(isAllCompleted);
    if (dateString != undefined) {
      apiDay
        .getPreviousDay(dateString)
        .then((response) => setPreviousDay((prevDay) => response.data))
        .catch((error) => {
          setLoad(false);
        });
      apiDay
        .getDayByDate(dateString)
        .then((response) => setActualDay((prevDay) => response.data))
        .catch((error) => {
          setLoad(false);
        });
    }

    if (eventData.length == 0 || eventData == undefined) {
      apiDay
        .getDayByDate(dateString)
        .then((response) => {
          apiDay.updateDay(response.data.id, { isClosed: "S" });
        })
        .catch((error) => {
          setLoad(false);
        });
    }
  }, []);

  const handleClose = (eventId) => {
    setOpen((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };
  const handleChangeMode = (modeParameter, eventId) => {
    modeParameter == "R"
      ? setMode("R")
      : modeParameter == "E"
      ? setMode("E")
      : setMode("C");

    setOpenFunction((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleDayClose = async () => {
    setLoad(true);
    try {
      await apiDay.getDayByDate(dateString).then((response) => {
        apiDay.updateDay(response.data.id, { isClosed: "S" });
      });

      await apiEvent.getEventByFecha(dateString).then((response) => {
        refetchEventByFecha(response.data);
      });
      setLoad(false);

      toast.success("Dia cerrado correctamente");
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.error("Error al cerrar dia");
    }
  };

  return (
    <>
      {load ? (
        <>
          <LoadComponent />
        </>
      ) : (
        <>
          {eventData.length == 0 || eventData == undefined ? (
            <>
              <div className="w-full h-full flex justify-center items-center">
                <p className="font-bold">
                  No hay mantenimientos para esta fecha
                </p>
              </div>
            </>
          ) : (
            <>
              {previousDay.isClosed == "N" && (
                <>
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="bg-orange-100 w-11/12 p-4 rounded-md text-center text-orange-900 shadow-md flex items-center justify-center">
                      <BiSolidHand className="mr-2" /> Debe cerrar el dia
                      anterior para gestionar este
                    </div>
                  </div>
                </>
              )}

              {actualDay.isClosed == "S" && (
                <>
                  <div className="flex justify-center items-center w-full my-2">
                    <div className="bg-green-100 w-11/12 p-4 rounded-md text-center text-green-900 shadow-md flex items-center justify-center">
                      <BiSolidHand className="mr-2" /> Este dia ya esta cerrado
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between mb-8 px-12">
                <h1 className="font-extrabold text-3xl">{dateString}</h1>

                {previousDay.isClosed != "N" && actualDay.isClosed != "S" && (
                  <>
                    <button
                      className="bg-green-400 rounded-md text-white p-2 disabled:bg-green-200"
                      disabled={!allEventCompleted}
                      onClick={handleDayClose}
                    >
                      Cerrar Dia
                    </button>
                  </>
                )}
              </div>
              <div className="w-full grid grid-cols-2 gap-4 px-4 h-auto">
                {eventData.map((event) => (
                  <>
                    <div className="w-full h-auto flex flex-col" key={event.id}>
                      <div
                        onClick={() => handleClose(event.id)}
                        className={`w-full shadow-lg flex h-auto cursor-pointer transition-all duration-300 p-4 ${
                          open[event.id] ? "border-b-2 border-b-gray-500" : ""
                        } ${
                          event.status.id == 3
                            ? statusLigth.gray
                            : event.status.id == 4
                            ? statusLigth.blue
                            : event.status.id == 5
                            ? statusLigth.yellow
                            : event.status.id == 6
                            ? statusLigth.green
                            : ""
                        }
              ${
                event.status.id == 3
                  ? statusShadow.gray
                  : event.status.id == 4
                  ? statusShadow.blue
                  : event.status.id == 5
                  ? statusShadow.yellow
                  : event.status.id == 6
                  ? statusShadow.green
                  : ""
              }
              `}
                        key={event.id}
                      >
                        <div
                          className={`w-1 ${
                            event.status.id == 3
                              ? statusColors.gray
                              : event.status.id == 4
                              ? statusColors.blue
                              : event.status.id == 5
                              ? statusColors.yellow
                              : event.status.id == 6
                              ? statusColors.green
                              : ""
                          }`}
                        ></div>
                        <div className="flex w-full items-center justify-evenly">
                          <span className="font-extrabold">
                            {event.maquina.maquina_name}
                          </span>
                          <span className="font-extrabold">{event.turno}</span>
                          <BiCaretDown
                            className={`transition-all duration-300 ${
                              open[event.id] ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                      </div>
                      <div
                        className={`w-full flex flex-col items-center justify-between transition-all duration-300 shadow-lg ${
                          open[event.id] ? "h-auto" : "h-0"
                        }
                ${
                  event.status.id == 3
                    ? statusShadow.gray
                    : event.status.id == 4
                    ? statusShadow.blue
                    : event.status.id == 5
                    ? statusShadow.yellow
                    : event.status.id == 6
                    ? statusShadow.green
                    : ""
                }
                ${
                  event.status.id == 3
                    ? statusLigth.gray
                    : event.status.id == 4
                    ? statusLigth.blue
                    : event.status.id == 5
                    ? statusLigth.yellow
                    : event.status.id == 6
                    ? statusLigth.green
                    : ""
                }
                `}
                      >
                        {open[event.id] ? (
                          <>
                            <div
                              className={`flex items-center justify-evenly w-11/12 h-auto p-4 mt-4 `}
                            >
                              <span className="font-extrabold bg-white w-1/2 p-2 rounded-md mr-2">
                                {event.tecnico != null ||
                                event.tecnico != undefined ? (
                                  <>
                                    {event.tecnico?.tecnico_name}{" "}
                                    {event.tecnico?.tecnico_apellido}
                                  </>
                                ) : (
                                  <>No tiene un tecnico asignado</>
                                )}
                              </span>
                              <span className="font-extrabold bg-white w-1/2 p-2 rounded-md ml-2">
                                {event.status != null ||
                                event.status != undefined ? (
                                  <>{event.status?.status_name}</>
                                ) : (
                                  <>No tiene un estado</>
                                )}
                              </span>
                            </div>

                            <div className="w-full flex items-center justify-center mb-2 mt-4">
                              {event.status.id != 6 &&
                                previousDay.isClosed != "N" &&
                                actualDay.isClosed != "S" && (
                                  <button
                                    type="button"
                                    className="w-1/2 mr-2 ml-1 p-2 bg-yellow-300 rounded-md"
                                    onClick={() => {
                                      handleChangeMode("R", event.id);
                                    }}
                                  >
                                    Reprogramar
                                  </button>
                                )}
                              {event.status.id != 4 &&
                                event.status.id != 6 &&
                                previousDay.isClosed != "N" &&
                                actualDay.isClosed != "S" && (
                                  <button
                                    onClick={() => {
                                      handleChangeMode("E", event.id);
                                    }}
                                    type="button"
                                    className="w-1/2 ml-2 mr-1 p-2 bg-blue-500 rounded-md"
                                  >
                                    Ejecutar
                                  </button>
                                )}

                              {event.status.id != 3 &&
                                event.status.id != 6 &&
                                event.status.id != 5 &&
                                previousDay.isClosed != "N" &&
                                actualDay.isClosed != "S" && (
                                  <button
                                    className="w-1/2 ml-2 mr-1 p-2 bg-green-500 rounded-md"
                                    onClick={() => {
                                      handleChangeMode("C", event.id);
                                    }}
                                  >
                                    Completar
                                  </button>
                                )}
                            </div>
                            {openFunction[event.id] && (
                              <MemoizedEventMode
                                mode={mode}
                                open={setOpenFunction}
                                eventId={event.id}
                                tecnicoId={event.tecnico?.id}
                                dateInfo={dateString}
                                refetchData={refetchData}
                                ejecucion={event.ejecucion}
                                estadoEvent={event.status.id}
                                load={setLoad}
                                refetchEventByFecha={refetchEventByFecha}
                                eventCount={eventData.length}
                                dayInfo={event.day}
                                maquinaId={event.maquina?.id}
                              />
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default EventCard;
