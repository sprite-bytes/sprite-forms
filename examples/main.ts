import {createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SpriteForms from "../packages/sprite-forms/index";

import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
// @ts-ignore
app.use(SpriteForms)
app.mount('#app')