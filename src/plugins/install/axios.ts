import axios from 'axios';
import api from '@/config/api';
import { token, doLogOut } from '@/modules/auth/logic/useAuth';

axios.defaults.baseURL = api.baseURL;
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

axios.interceptors.request.use(
  (config: any) => {
    if (token.value) {
      config.headers['Authorization'] = `Bearer ${token.value}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export const instance = axios;

/*instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (token.value) {
      if (error.response.status === 401) {
        // do logout here
        await doLogOut();
      }

      if (error.response.status === 500) {
        // log error here
        console.error('Backend returned error: ', error.response.body);
        return Promise.reject(error);
      }
    }
  },
);*/