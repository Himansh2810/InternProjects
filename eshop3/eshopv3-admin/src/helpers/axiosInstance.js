import axios from "axios";
// import env from "react-dotenv";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// console.log(env.BASE_URL_ESHOP);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("eshop-admin-token");
    const headers = { ...config.headers };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return { ...config, headers };
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error;
    const isUnauthorized =
      error?.response?.status === 401 &&
      error?.response?.data?.message === "Please authenticate";
    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(process.env.VUE_APP_REFRESH_TOKEN_URL);
        if (res.status === 200) {
          sessionStorage.setItem(
            "eshop-admin-token",
            JSON.stringify(res?.data?.accessToken)
          );
          const modifiedConfig = { ...error.config };
          modifiedConfig.headers.Authorization = `Bearer ${res?.data?.accessToken}`;

          return axiosInstance(modifiedConfig);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
