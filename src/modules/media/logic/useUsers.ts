import api from '@/config/api';
import { instance as axios } from '@/plugins/install/axios';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  users: Array<any>(),
});

const users = computed(() => state.users);

const setUsers = (users: Array<any>) => {
  state.users = users;
};

const addUser = (user: any) => {
  state.users.push(user);
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(api.baseURL + 'users?_start=0&_limit=10');
    setUsers(response.data);
  } catch (e) {
    console.log(e);
  }
};

export default function useUsers() {
  return {
    users,
    addUser,
    setUsers,
    fetchUsers,
    state: readonly(state),
  };
}
