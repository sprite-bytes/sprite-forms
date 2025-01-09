import {createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import SpriteForms from "../dist/sprite-forms.js";
import SpriteForms from "../packages";

import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(SpriteForms)
app.mount('#app')