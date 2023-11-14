import axiosInstance from "../../Composables/axios";

const apiRole = {
  getRoles: async () => {
    return await axiosInstance.get("/role/api/v1/role/");
  },
};

export default apiRole;
