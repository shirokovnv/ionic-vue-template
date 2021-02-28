import api from '@/config/api';
import useToast from '@/logic/ui/useToast';
import { instance as axios } from '@/plugins/install/axios';
import { instance as localStorage } from '@/plugins/install/localStorage';
import router from '@/router';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  loggedIn: false,
  token: '',
  refreshToken: '',
  expiresIn: 0,
});

export const isLoggedIn = computed(() => {
  return state.loggedIn;
});

export const token = computed(() => {
  return state.token;
});

export const setToken = (token: string) => {
  state.token = token;
};

export const setRefreshToken = (refreshedToken: string) => {
  state.refreshToken = refreshedToken;
};

export const setExpiresIn = (newValue: number) => {
  state.expiresIn = newValue;
};

export const refreshToken = computed(() => state.refreshToken);
export const expiresIn = computed(() => state.expiresIn);

const setLoggedIn = (newValue: boolean) => {
  state.loggedIn = newValue;
};

const login = async (credentials: any) => {
  const response = await axios.post(`${api.authURL()}/login`, credentials);
  return response;
};

const refresh = async () => {
  const response = await axios.post(`${api.authURL()}/refresh`, {
    token: refreshToken.value,
  });
  return response;
};

const setAuthState = (response: any) => {
  const accessToken = response.data.token_info.access_token;
  const refreshToken = response.data.token_info.refresh_token;
  const expiresIn = response.data.token_info.expires_in;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expiresIn', expiresIn);
  setToken(accessToken);
  setRefreshToken(refreshToken);
  setExpiresIn(expiresIn);
  setLoggedIn(true);
};

export const doRefresh = async () => {
  const { setMessage, setOpen } = useToast();

  setMessage('refreshing...');
  setOpen(true);
  const response = await refresh();
  setAuthState(response);
  return response;
};

export const doLogin = async (credentials: any) => {
  const { setMessage, setOpen } = useToast();

  try {
    const response = await login(credentials);
    setAuthState(response);
    router.push('/home');
  } catch (e) {
    if (e.response) {
      if (e.response.status === 422) {
        setMessage(e.response.data.message);
      } else {
        setMessage('Server error');
      }
    } else {
      setMessage('Unknown server error');
    }

    setOpen(true);
  }
};

export const logOut = async () => {
  const response = await axios.get(`${api.authURL()}/logout`);
  return response;
};

export const cleanStateAndRedirectToAuth = () => {
  localStorage.clear();
  setToken('');
  setRefreshToken('');
  setExpiresIn(0);
  setLoggedIn(false);
  router.push('/auth/signin');
};

export const doLogOut = async () => {
  const { setMessage, setOpen } = useToast();

  try {
    const response = await logOut();
    setMessage(response.data.message);
  } catch (e) {
    if (e.response) {
      if (e.response.status >= 400 && e.response.status < 500) {
        setMessage(e.response.data.message);
      } else {
        setMessage('Server error');
      }
    } else {
      setMessage('Unknown server error');
    }
  } finally {
    setOpen(true);
    cleanStateAndRedirectToAuth();
  }
};

export const register = async (userData: any) => {
  const response = await axios.post(`${api.authURL()}/register`, userData);
  return response;
};

export const doRegister = async (userData: any) => {
  return await register(userData);
};

export const setStateFromLocalStorage = () => {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expiresIn = localStorage.getItem('expiresIn');

  if (token !== undefined && token !== null && token !== '') {
    setToken(token);
    setLoggedIn(true);
  }

  if (
    refreshToken !== undefined &&
    refreshToken !== null &&
    refreshToken !== ''
  ) {
    setRefreshToken(refreshToken);
  }

  if (expiresIn !== undefined && expiresIn !== null) {
    setExpiresIn(+expiresIn);
  }
};

export default function useAuth() {
  return {
    isLoggedIn,
    token,
    setToken,
    setLoggedIn,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
    login,
    doLogin,
    logOut,
    doLogOut,
    register,
    doRegister,
    refresh,
    doRefresh,
    setStateFromLocalStorage,
    setAuthState,
    cleanStateAndRedirectToAuth,
    state: readonly(state),
  };
}
