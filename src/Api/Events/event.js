import axiosInstance from "../../Composables/axios";

const apiEvent = {
  getEvent: async () => {
    return await axiosInstance.get("/events/api/v1/events/");
  },
  getEventByFecha: async (date) => {
    return await axiosInstance.get(`/events/api/v1/eventsByFecha/${date}/`);
  },
  updateEvent: async (eventId, fieldsToUpdate) => {
    return await axiosInstance.put(
      `/events/api/v1/events/${eventId}/`,
      fieldsToUpdate
    );
  },
  addEvent: async (
    title,
    start,
    end,
    description,
    turno,
    mensaje_reprogramado,
    ejecucion,
    tecnico,
    status,
    maquina
  ) => {
    return await axiosInstance.post("/events/api/v1/events/", {
      title,
      start,
      end,
      description,
      turno,
      mensaje_reprogramado,
      ejecucion,
      tecnico,
      status,
      maquina,
    });
  },
  uploadEvent: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64String = reader.result.split(",")[1];
          const response = await axiosInstance.post(
            `/events/api/v1/uploadEvents/`,
            {
              event_file: base64String,
            }
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsDataURL(file);
    });
  },
  getEventsByMonth: async (initialDate, finalDate) => {
    return await axiosInstance.get(
      `/events/api/v1/eventsByMonth/${initialDate}/${finalDate}/`
    );
  },
};

export default apiEvent;
