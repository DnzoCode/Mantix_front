import axiosInstance from "../../Composables/axios";

const apiMenu = {
  getMenu: async () => {
    return await axiosInstance.get("/menu/api/v1/menu/");
  },
  getMenuByRole: async (roleId) => {
    return await axiosInstance.get(
      `/permission/api/v1/ConsultarPermisos/${roleId}/`
    );
  },
};

export default apiMenu;
