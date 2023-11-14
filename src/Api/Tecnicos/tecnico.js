import axiosInstance from "../../Composables/axios";

const apiTecnico = {
  getTecnicos: async () => {
    return await axiosInstance.get("/tecnico/api/v1/tecnico/");
  },
  addTecnicos: async (tecnico_name, tecnico_apellido, status) => {
    return await axiosInstance.post("/tecnico/api/v1/tecnico/", {
      tecnico_name,
      tecnico_apellido,
      status,
    });
  },
};

export default apiTecnico;
