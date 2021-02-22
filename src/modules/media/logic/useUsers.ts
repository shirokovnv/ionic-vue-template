import {
  computed,
  reactive,
  readonly
} from 'vue';
import {
  showProgressOnAsync
} from '@/logic/ui/useProgressBar';
import {
  instance as axios
} from '@/plugins/install/axios';
import useToast from '@/logic/ui/useToast';
import {
  QueryRunner,
  QueryResult,
  QueryBuilder,
} from 'laravel-query-api-frontend';
import api from '@/config/api';

const state = reactive({
  users: Array<any>()
});

const users = computed(() => state.users);

const setUsers = (users: Array<any>) => {
  state.users = users;
}

const addUser = (user: any) => {
  state.users.push(user);
}

const fetchUsersQuery = QueryBuilder.fetch('App\\Models\\User', 'users')
  .where(['id', '>=', 1])
  .paginate(1, 10);

const fetchUsers = async () => {
  const { setOpen, setMessage } = useToast();

  const runner = new QueryRunner(axios, `${api.localURL}/api/queries`);
  runner.addQuery(fetchUsersQuery);

  showProgressOnAsync(
    runner
      .runTransaction()
      .then((value: QueryResult) => {
        setUsers(value.getContent('users').data);
      })
      .catch((error: any) => {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Unknown server error');
        }
        
        setOpen(true);
        console.log('Error', error);
      })
      .finally(() => console.log('request finished')),
  );
}

export default function useUsers() {
  return {
    users,
    addUser,
    setUsers,
    fetchUsers,
    fetchUsersQuery,
    state: readonly(state)
  }
}