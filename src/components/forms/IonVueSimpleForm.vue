<template>
  <form @submit.prevent="validate" novalidate>
    <div v-for="(item, index) in formFields" :key="index">
      <ion-item v-if="item.element === 'input'">
        <ion-label v-if="item.label">{{ item.label }}</ion-label>
        <ion-input
          :color="item.color"
          :type="item.type"
          :placeholder="item.placeholder"
          :name="index"
          v-model="vv[index].$model"
        />
      </ion-item>
      <ion-item v-if="item.element === 'textarea'">
        <ion-textarea
          :placeholder="item.placeholder"
          v-model="vv[index].$model"
        ></ion-textarea>
      </ion-item>
      <ion-item color="warning" v-if="vv[index]?.$errors.length">
        {{ vv[index]?.$errors[0]?.$message }}
      </ion-item>
    </div>
    <ion-button class="submit-btn" shape="round" expand="block" type="submit">{{
      btnText
    }}</ion-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonTextarea,
} from '@ionic/vue';
import { useVuelidate } from '@vuelidate/core';

export default defineComponent({
  name: 'IonVueSimpleForm',
  components: {
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonTextarea,
  },
  props: {
    formFields: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
    btnText: {
      type: String,
      default: 'Submit',
    },
  },
  setup(props, { emit }) {
    const prepareFormModel = (formData: any) => {
      const formModel: any = {};
      Object.keys(formData).forEach((key) => {
        formModel[key] = undefined;
      });
      return formModel;
    };

    const formModel = reactive(prepareFormModel(props.formFields));

    const vv = useVuelidate(props.rules, formModel);

    const validate = () => {
      vv.value.$touch();
      if (vv.value.$invalid) return;
      emit('onSubmit', formModel);
    };

    return {
      formModel,
      validate,
      vv,
    };
  },
});
</script>

<style scoped>
.error {
  margin: 10px 0px;
  padding: 12px;
  color: #d8000c;
  background-color: #ffd2d2;
}
</style>
