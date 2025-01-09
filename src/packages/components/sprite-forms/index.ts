import type {App} from "vue"
import SpriteForms from './sprite-forms.vue'

SpriteForms.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteForms.name, SpriteForms)
}

export default SpriteForms