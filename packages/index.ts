import SpriteForms from './SpriteForms/index';
import SpriteTable from "./SpriteTable/index";

const components = [
    SpriteForms,
    SpriteTable
]

export {
    SpriteForms,
    SpriteTable
}

export const install = function (Vue: any) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install
}