import spriteForms from './src/sprite-forms.vue'

import SelectFormItem from './components/SelectFormItem/index.vue'
import CheckboxFormItem from './components/CheckboxFormItem/index.vue'
import RadioFormItem from './components/RadioFormItem/index.vue'

export const SpriteForms = spriteForms

SpriteForms.install = function (Vue: any) {
    Vue.component(SpriteForms.name, SpriteForms)
    Vue.component(SelectFormItem.name, SelectFormItem)
    Vue.component(RadioFormItem.name, RadioFormItem)
    Vue.component(CheckboxFormItem.name, CheckboxFormItem)
}

export default SpriteForms

export * from './src/sprite-forms'

export type {SpriteFormsInstance} from './src/instance'