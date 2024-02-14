import axiosInstance from "../../Composables/axios";

const apiMaquina = {
  getMaquinas: async () => {
    return await axiosInstance.get("/maquina/api/v1/maquina/");
  },
  getMaquina: async (id) => {
    return await axiosInstance.get("/maquina/api/v1/maquina/" + id);
  },
  addMaquinas: async (
    maquina_name,
    maquina_modelo,
    numero_serial,
    location,
    status
  ) => {
    return await axiosInstance.post("/maquina/api/v1/maquina/", {
      maquina_name,
      maquina_modelo,
      numero_serial,
      location,
      status,
    });
  },
  updateMaquina: async (maquinaId, fields) => {
    return await axiosInstance.put(
      `/maquina/api/v1/maquina/${maquinaId}/`,
      fields
    );
  },
  uploadMaquina: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64String = reader.result.split(",")[1];
          const response = await axiosInstance.post(
            `/maquina/api/v1/uploadMaquinas/`,
            {
              maquina_file: base64String,
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
};

export default apiMaquina;
