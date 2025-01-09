import type { App } from 'vue'

import SpriteRadio from "./components/sprite-radio";
import SpriteInput from "./components/sprite-input";
import SpriteSelect from "./components/sprite-select";
import SpriteCheckbox from "./components/sprite-checkbox";
import SpriteForms from "./components/sprite-forms";
import SpriteTable from "./components/sprite-table";

const components = [
    SpriteRadio,
    SpriteForms,
    SpriteSelect,
    SpriteCheckbox,
    SpriteTable,
    SpriteInput,
]

const install = (app: App): void => {
    components.forEach(component => app.component(component.name as string, component))
}

const Sprite = {
    install
}

export default Sprite
