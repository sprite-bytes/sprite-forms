import type {App} from "vue"
import SpriteSelect from './sprite-select.vue'

SpriteSelect.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteSelect.name, SpriteSelect)
}

export default SpriteSelect