<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <h1>SignIn</h1>
        <ion-vue-simple-form
          :formFields="form"
          :rules="rules"
          :btnText="btnText"
          @onSubmit="onSubmit"
        >
        </ion-vue-simple-form>
        <router-link to="/auth/signup">To SignUp</router-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import IonVueSimpleForm from '@/components/forms/IonVueSimpleForm.vue';
import useSignIn from '../logic/useSignIn';
import '@/theme/container.css';

export default defineComponent({
  name: 'SignUp',
  components: {
    IonContent,
    IonPage,
    IonVueSimpleForm,
  },
  setup() {
    console.log('signin');

    const { state, onSubmit } = useSignIn();
    const { form, rules, btnText } = toRefs(state);

    return {
      form,
      rules,
      btnText,
      onSubmit,
    };
  },
});
</script>
