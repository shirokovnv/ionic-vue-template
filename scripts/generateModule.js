const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const modulesPath = 'src/modules';
const args = process.argv.slice(2);

const error = (...args) => {
  console.log(chalk.red(...args));
};

const success = (...args) => {
  console.log(chalk.green(...args));
};

if (!args.length) {
  error('You must provide a name for the module!');
  return;
}

const moduleName = args[0];
const moduleCapitalizedName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const modulePath = path.join(__dirname, '../', modulesPath, moduleName);

if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists!`);
  return;
}

let moduleContent = `<template>
  <ion-page>
    <div id="{{moduleName}}_module">
      <ion-router-outlet :key="moduleKey" v-if="moduleIsReady">
      </ion-router-outlet>
      <div v-else>
        <preloader></preloader>
      </div>
    </div>
  </ion-page>  
</template>

<script lang="ts">
import { 
  defineComponent, 
  computed,
  ref
} from 'vue';
import { 
  IonRouterOutlet,
  IonPage
} from '@ionic/vue';
import Preloader from '@/components/ui/Preloader.vue';

export default defineComponent({
name: '{{moduleCapitalizedName}}Module',
components: {
  IonRouterOutlet,
  IonPage,
  Preloader
},
watch: {
  $route(to, from) {
    this.incrementKey();
  }
},
setup() {

  const moduleIsReady = computed(() => {
    //
    return true;
  });

  const moduleKey = ref(0);

  const incrementKey = () => {
    moduleKey.value++;
  }

  const bootstrapModule = () => {
    //
  }

  bootstrapModule();

  return {
    moduleIsReady,
    moduleKey,
    incrementKey,
    bootstrapModule
  }
}
});
</script>
`.replace(new RegExp('{{moduleName}}', 'g'), moduleName)
.replace(new RegExp('{{moduleCapitalizedName}}', 'g'), moduleCapitalizedName);

let routesContent = `import {
  RouteRecordRaw
} from 'vue-router';
import {{moduleCapitalizedName}}Module from './{{moduleCapitalizedName}}Module.vue';

export const routes: Array < RouteRecordRaw > = [
  {
    path: '/{{moduleName}}/',
    name: '{{moduleName}}Module',
    component: {{moduleCapitalizedName}}Module,
    children: []
  }  
];
`.replace(new RegExp('{{moduleName}}', 'g'), moduleName)
.replace(new RegExp('{{moduleCapitalizedName}}', 'g'), moduleCapitalizedName);

const moduleEntryComponentPath = `${path.join(modulePath, `${moduleCapitalizedName}Module.vue`)}`
const moduleRoutesPath = `${path.join(modulePath, `routes.ts`)}`

const logicPath = `${modulePath}/logic`;
const componentsPath = `${modulePath}/components`;
const viewsPath = `${modulePath}/views`;

// generate structure
fs.mkdirSync(modulePath);
fs.mkdirSync(componentsPath);
fs.mkdirSync(logicPath);
fs.mkdirSync(viewsPath);

fs.appendFileSync(moduleEntryComponentPath, moduleContent);
fs.appendFileSync(moduleRoutesPath, routesContent);

success('Module', moduleName, 'generated!');