import axios from "axios";

import { ServerURL } from "config/config";
import { authTokenClosure } from "utils/authToken";

const axiosInstance = axios.create({
  baseURL: ServerURL.getServerURL(),
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = authTokenClosure.getToken();

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async function (response) {
    if (response.data.accessToken) {
      authTokenClosure.setToken(response.data.accessToken);
    }

    return response;
  },
  async function (error) {
    const errorAPI = error.config;
    if (error.response.status === 401 && errorAPI.retry === undefined) {
      errorAPI.retry = true;
      await axiosInstance.post("/auth/token");
      return axiosInstance.request(errorAPI);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
