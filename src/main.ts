import { createApp } from "vue";
import { createPinia } from "pinia";
import { createConfig, getConfig } from "~/utils/SettingsManager";
import router from "~/router"
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount("#app")

async function init() {
  await createConfig()
  const config = await getConfig()
  if (config?.theme) {
    document.documentElement.setAttribute('data-theme', config?.theme)
  }
}

init()
