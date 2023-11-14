import axiosInstance from "../../Composables/axios";

const apiLocation = {
  getLocations: async () => {
    return await axiosInstance.get("/location/api/v1/location/");
  },
  addLocation: async (location_name, status) => {
    return await axiosInstance.post("/location/api/v1/location/", {
      location_name,
      status,
    });
  },
  uploadLocations: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64String = reader.result.split(",")[1];
          const response = await axiosInstance.post(
            `/location/api/v1/uploadLocations/`,
            {
              location_file: base64String,
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

export default apiLocation;
