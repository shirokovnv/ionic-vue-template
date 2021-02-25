import api from '@/config/api';
import useToast from '@/logic/ui/useToast';
import { instance as axios } from '@/plugins/install/axios';
import { instance as localStorage } from '@/plugins/install/localStorage';
import router from '@/router';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  loggedIn: false,
  token: '',
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

const setLoggedIn = (newValue: boolean) => {
  state.loggedIn = newValue;
};

const login = async (credentials: any) => {
  console.log(`${api.authURL()}/login`);
  const response = await axios.post(`${api.authURL()}/login`, credentials);
  return response;
};

export const doLogin = async (credentials: any) => {
  const { setMessage, setOpen } = useToast();

  try {
    const response = await login(credentials);
    const accessToken = response.data.token_info.accessToken;
    localStorage.setItem('accessToken', accessToken);
    setToken(accessToken);
    setLoggedIn(true);
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
    localStorage.removeItem('accessToken');
    setToken('');
    setLoggedIn(false);
    setOpen(true);
    router.push('/auth/signin');
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
  if (token !== undefined && token !== null && token !== '') {
    setToken(token);
    setLoggedIn(true);
  }
};

export default function useAuth() {
  return {
    isLoggedIn,
    token,
    setToken,
    setLoggedIn,
    login,
    doLogin,
    logOut,
    doLogOut,
    register,
    doRegister,
    setStateFromLocalStorage,
    state: readonly(state),
  };
}
