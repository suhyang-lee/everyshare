import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

import { ServerURL } from "config/config";

const axiosInstance = axios.create({
  baseURL: ServerURL.getServerURL(),
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
