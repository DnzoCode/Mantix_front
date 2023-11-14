import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../Global/Modal/Modal";
import LoadComponent from "../Global/LoadComponent";
import CalendarContent from "./CalendarContent";
import EventCard from "./EventCard";
import apiEvent from "../../Api/Events/event";
import { AuthUser } from "../../Composables/useHelpers";

function Calendar({ refetch, data }) {
  const [openModal, setOpenModal] = useState(false);
  const [dateInfo, setDateInfo] = useState([]);
  const [eventByFecha, setEventByFecha] = useState([]);
  const [load, setLoad] = useState(false);
  const MemoizedEventCard = React.memo(EventCard);
  const refetchEventByFecha = (newData) => {
    setEventByFecha(newData);
  };
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await AuthUser();
      setUserInfo(authUser);
    };

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <LoadComponent />
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            events={data}
            windowResizeDelay={150}
            contentHeight={"auto"}
            aspectRatio={1}
            nowIndicator
            expandRows={true}
            headerToolbar={{
              start: "today",
              center: "prev title next",
              end: "dayGridMonth",
            }}
            handleWindowResize
            timeZone="UTC"
            buttonText={{
              today: "Hoy",
              month: "Meses",
              week: "Semanas",
              day: "Dia",
            }}
            eventContent={(eventInfo) => (
              <CalendarContent eventInfo={eventInfo} />
            )}
            dateClick={async (dateInfo) => {
              if (userInfo.role.id == 2 || userInfo.role.id == 1) {
                setLoad(true);
                setOpenModal(true);
                setDateInfo(dateInfo);
                if (dateInfo.dateStr != undefined) {
                  try {
                    const eventResponse = await apiEvent.getEventByFecha(
                      dateInfo.dateStr
                    );
                    setEventByFecha(eventResponse.data);
                    setLoad(false);
                  } catch (error) {
                    console.error("Error:", error);
                    setLoad(false);
                    // Manejar el error según tus necesidades
                  }
                }
              }
            }}
            showNonCurrentDates={true}
            slotEventOverlap={true}
            locale={"es"}
            datesSet={(info) => setCurrentViewDate(info.view.currentStart)}
          />
          <Modal
            setOpenModal={setOpenModal}
            isOpen={openModal}
            title="Listado Mantenimientos"
          >
            {openModal && (
              <div className="flex flex-col w-full h-full">
                {loading || load ? (
                  <LoadComponent />
                ) : (
                  <>
                    <MemoizedEventCard
                      eventData={eventByFecha}
                      dateString={dateInfo.dateStr}
                      refetchData={refetch}
                      refetchEventByFecha={refetchEventByFecha}
                    />
                  </>
                )}
              </div>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default Calendar;
