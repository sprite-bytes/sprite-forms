import SpriteForms from './SpriteForms/index'

export {
    SpriteForms
}

const install = function (Vue: any) {
    Vue.component(SpriteForms.name, SpriteForms)
}

export default {
    install
}