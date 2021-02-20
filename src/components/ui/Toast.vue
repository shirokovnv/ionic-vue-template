<template>
  <ion-toast
    :is-open="isOpen"
    :message="message"
    :duration="duration"
    @onDidDismiss="setOpen(false)"
  >
  </ion-toast>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonToast } from '@ionic/vue';
import useToast from '@/logic/ui/useToast';

export default defineComponent({
  components: {
    IonToast,
  },
  setup() {
    const { message, duration, isOpen, setOpen } = useToast();

    return {
      message,
      duration,
      isOpen,
      setOpen,
    };
  },
});
</script>
