import api from '@/config/api';
import {
  cleanStateAndRedirectToAuth,
  doRefresh,
  token,
} from '@/modules/auth/logic/useAuth';
import axios from 'axios';

let isRefreshing = false;
const refreshSubscribers: any[] = [];

const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        doRefresh()
          .then((response: any) => {
            isRefreshing = false;
            onRefreshed(token.value);
          })
          .catch((error: any) => {
            if (error.response) {
              if (
                error.response.status === 401 ||
                error.response.status === 422 ||
                error.response.status === 500
              ) {
                cleanStateAndRedirectToAuth();
              }
            }
          });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          // replace the expired token and retry
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          axios(originalRequest)
            .then((response: any) => resolve(response))
            .catch((error: any) => reject(error));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  },
);

export const instance = axios;
