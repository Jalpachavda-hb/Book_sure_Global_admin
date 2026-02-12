import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Attach role if user exists
axiosInstance.interceptors.request.use(
  (config) => {
    // const storedUser = sessionStorage.getItem("user");

    // if (storedUser) {
    //   try {
    //     const userData = JSON.parse(storedUser);
    //     if (userData?.role) {
    //       config.headers["x-role-id"] = userData.role;
    //     }
    //   } catch (e) {
    //     console.error("Failed to parse user", e);
    //     toast.error("Please login again.");
    //   }
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

// Global response handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        toast.error("Session expired");
        sessionStorage.clear();
        window.location.href = "/login";
      } else if (status === 403) toast.error("Access denied");
      else if (status === 404) toast.error("Not found");
      else if (status === 500) toast.error("Server error");
    } else {
      toast.error("Network error");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
