import axios from 'axios';
import cookie from 'utils/cookie';
import { ServerURL } from 'config/config';

const axiosInstance = axios.create({
  baseURL: ServerURL.getServerURL(),
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
