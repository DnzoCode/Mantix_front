// axios.js
import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://127.0.0.1:8000", // Cambia esto a tu URL base
});

export default axiosInstance;
