import type {App} from "vue"
import SpriteRadio from './sprite-radio.vue'

SpriteRadio.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteRadio.name, SpriteRadio)
}

export default SpriteRadio