import SpriteForms from './src/sprite-forms.vue'

import SpriteSelect from './components/sprite-select/index.vue'
import SpriteCheckbox from './components/sprite-checkbox/index.vue'
import SpriteRadio from './components/sprite-radio/index.vue'

SpriteForms.install = function (Vue: any) {
    Vue.component(SpriteForms.name, SpriteForms)
    Vue.component(SpriteSelect.name, SpriteSelect)
    Vue.component(SpriteCheckbox.name, SpriteCheckbox)
    Vue.component(SpriteRadio.name, SpriteRadio)
}

export default SpriteForms

export * from './src/sprite-forms'

export type {SpriteFormsInstance} from './src/instance'