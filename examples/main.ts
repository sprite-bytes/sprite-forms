import {createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// @ts-ignore
import SpriteForms from "../packages/sprite-forms/index";
import SpriteTable from "../packages/sprite-table/index";

import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
// @ts-ignore
app.use(SpriteForms)
// @ts-ignore
app.use(SpriteTable)
app.mount('#app')