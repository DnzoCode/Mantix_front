import axiosInstance from "../../Composables/axios";

export const apiDay = {
  getPreviousDay: async (fecha) => {
    return await axiosInstance.get(`/day/api/v1/ObtenerDiaAnterior/${fecha}/`);
  },
  getDayByDate: async (fecha) => {
    return await axiosInstance.get(`/day/api/v1/ObtenerDiaPorFecha/${fecha}/`);
  },
  updateDay: async (dayId, fields) => {
    return await axiosInstance.put(`day/api/v1/day/${dayId}/`, fields);
  },
};
