import axios from 'axios';
import { Toast } from 'antd-mobile';

axios.interceptors.request.use(
  config => {
    Toast.loading('Request...', 0);
    return config;
  },
  err => Promise.reject(err)
);

axios.interceptors.response.use(
  response => {
    Toast.hide();
    return response;
  },
  err => Promise.reject(err)
);
