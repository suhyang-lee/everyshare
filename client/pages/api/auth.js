import axios from 'axios';

import { ServerURL } from 'config/config';

const axiosInstance = axios.create({
  baseURL: ServerURL.getServerURL(),
  timeout: 10000,
  withCredentials: true,
});

const handler = async (req, res) => {
  const data = await axiosInstance.post('/auth/token');
  console.log(data);
};

export default handler;
