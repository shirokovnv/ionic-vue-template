import { reactive, readonly } from 'vue';
import { required, email } from '@vuelidate/validators';
import useAuth from './useAuth';
import useToast from '@/logic/ui/useToast';

const state = reactive({
  form: {
    name: {
      element: 'input',
      placeholder: 'Name',
      type: 'text',
    },
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
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  btnText: 'SignUp',
});

const setBtnText = (text: string) => {
  state.btnText = text;
};

const onSubmit = async (payload: any) => {
  console.log('submit sign up', payload);
  const { register } = useAuth();
  const { setMessage, setOpen } = useToast();

  try {
    const response = await register(payload);
    console.log(response);
  }
  catch (e) {
    if (e.response.status === 422) {
      setMessage(e.response.data.message);
    }
    else {
      setMessage('Unknown server error');
    }
    
    setOpen(true);
  }

};

export default function useSignUp() {
  return { onSubmit, setBtnText, state: readonly(state) };
}
