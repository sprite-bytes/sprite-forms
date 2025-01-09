import type {App} from "vue"
import SpriteCheckbox from './sprite-checkbox.vue'

SpriteCheckbox.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteCheckbox.name, SpriteCheckbox)
}

export default SpriteCheckbox