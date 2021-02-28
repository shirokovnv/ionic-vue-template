import { email, required } from '@vuelidate/validators';
import { reactive, readonly } from 'vue';
import useAuth from './useAuth';

const state = reactive({
  form: {
    email: {
      element: 'input',
      placeholder: 'Email',
      type: 'text',
    },
    password: {
      element: 'input',
      placeholder: 'Password',
      type: 'password',
    },
  },

  rules: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  btnText: 'SignIn',
});

const onSubmit = async (payload: any) => {
  console.log('submit sign in', payload);
  const { doLogin } = useAuth();

  await doLogin(payload);
};

export default function useSignIn() {
  return {
    onSubmit,
    state: readonly(state),
  };
}
