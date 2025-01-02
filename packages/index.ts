import SpriteForms from './SpriteForms/index'

const components = [
    SpriteForms
]

export {
    SpriteForms
}

const install = function (Vue: any) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install
}