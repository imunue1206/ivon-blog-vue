import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { message } from 'ant-design-vue'
import './assets/tailwind.css';

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.$message = message;
