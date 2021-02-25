// Load all icons
import installIcons from '@/logic/ui/useIcons';
// set default auth state
import { setStateFromLocalStorage } from '@/modules/auth/logic/useAuth';
// install plugins
import installPlugins from '@/plugins';
import { IonicVue } from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/typography.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
/* Theme variables */
import './theme/variables.css';

installIcons();

setStateFromLocalStorage();

const app = createApp(App).use(IonicVue).use(router);

installPlugins(app);

router.isReady().then(() => {
  app.mount('#app');
});
