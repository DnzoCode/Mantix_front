import axiosInstance from "../../Composables/axios";

const apiAuth = {
  getUsers: async () => {
    return await axiosInstance.get("/user/api/v1/user/");
  },
  getOwners: async () => {
    return await axiosInstance.get("/user/api/v1/ObtenerOwners/");
  },
  getUserById: async (userId) => {
    return await axiosInstance.get(`/user/api/v1/user/${userId}/`);
  },
  login: async (user_email, user_password) => {
    return await axiosInstance.post("/user/api/v1/auth/", {
      user_email,
      user_password,
    });
  },
  addUsers: async (
    user_name,
    user_lastname,
    user_login,
    user_email,
    user_password,
    is_owner,
    location,
    role,
    status
  ) => {
    return await axiosInstance.post("/user/api/v1/user/", {
      user_name,
      user_lastname,
      user_login,
      user_email,
      user_password,
      is_owner,
      location,
      role,
      status,
    });
  },
};

export default apiAuth;
