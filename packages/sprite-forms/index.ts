import SpriteForms from './src/sprite-forms.vue'

import SelectFormItem from './components/select-form-item/index.vue'
import CheckboxFormItem from './components/checkbox-form-item/index.vue'
import RadioFormItem from './components/radio-form-item/index.vue'

SpriteForms.install = function (Vue: any) {
    Vue.component(SpriteForms.name, SpriteForms)
    Vue.component(SelectFormItem.name, SelectFormItem)
    Vue.component(RadioFormItem.name, RadioFormItem)
    Vue.component(CheckboxFormItem.name, CheckboxFormItem)
}

export default SpriteForms

export * from './src/sprite-forms'

export type {SpriteFormsInstance} from './src/instance'