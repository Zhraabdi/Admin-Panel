// import axios from "axios";

// const axiosInstance = axios.create({baseURL: ("http://localhost:3000")});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("token:", token);
//   }
//   return config;
  
// });

// export default axiosInstance;





import axios from "axios";
import { getCookie } from "../utils/cookie";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
