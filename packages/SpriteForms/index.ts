import SpriteForms from './SpriteForms.vue'
import SelectFormItem from './components/SelectFormItem/index.vue'
import CheckboxFormItem from './components/CheckboxFormItem/index.vue'
import RadioFormItem from './components/RadioFormItem/index.vue'

SpriteForms.install = function (Vue: any) {
    Vue.component(SpriteForms.name, SpriteForms)
    Vue.component(SelectFormItem.name, SelectFormItem)
    Vue.component(RadioFormItem.name, RadioFormItem)
    Vue.component(CheckboxFormItem.name, CheckboxFormItem)
}

export default SpriteForms