import type {App} from "vue"
import SpriteInput from './sprite-input.vue'

SpriteInput.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteInput.name, SpriteInput)
}

export default SpriteInput