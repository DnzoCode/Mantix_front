import axiosInstance from "../../Composables/axios";

const apiWorkOrder = {
  getWorkOrder: async () =>
    await axiosInstance.get("/workOrder/api/v1/workOrder/"),
  getWorkOrderById: async (id) =>
    await axiosInstance.get(`/workOrder/api/v1/workOrder/${id}/`),
  getWorkOrderByEvent: async (eventId) =>
    await axiosInstance.get(
      `/workOrder/api/v1/ObtenerWorkOrderByEvent/${eventId}/`
    ),
  addWorkOrder: async (
    work_order,
    trabajo_realizado,
    diagnostico,
    actividades,
    causas,
    observacion,
    hora_inicio,
    hora_fin,
    event,
    status,
    tecnico,
    user
  ) => {
    return await axiosInstance.post("/workOrder/api/v1/workOrder/", {
      work_order,
      trabajo_realizado,
      diagnostico,
      actividades,
      causas,
      observacion,
      hora_inicio,
      hora_fin,
      event,
      status,
      tecnico,
      user,
    });
  },
  updateWorkOrder: async (id, fields) => {
    return await axiosInstance.put(
      `/workOrder/api/v1/workOrder/${id}/`,
      fields
    );
  },
};

export default apiWorkOrder;
