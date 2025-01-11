import type {App} from 'vue'

import SpriteForms from "./components/sprite-forms";
import SpriteTable from "./components/sprite-table";
import SpriteRadio from "./components/sprite-radio";
import SpriteCascader from "./components/sprite-cascader";
import SpriteColorPicker from "./components/sprite-color-picker";
import SpriteInput from "./components/sprite-input";
import SpriteInputNumber from "./components/sprite-input-number";
import SpriteSelect from "./components/sprite-select";
import SpriteCheckbox from "./components/sprite-checkbox";
import SpriteRate from "./components/sprite-rate";
import SpriteSlider from "./components/sprite-slider";
import SpriteSwitch from "./components/sprite-switch";
import SpriteTimePicker from "./components/sprite-time-picker";
import SpriteTimeSelect from "./components/sprite-time-select";
import SpriteDatePicker from "./components/sprite-date-picker";
import SpriteTreeSelect from "./components/sprite-tree-select";
import SpriteUpload from "./components/sprite-upload";

const components = [
    SpriteRadio,
    SpriteCascader,
    SpriteColorPicker,
    SpriteForms,
    SpriteSelect,
    SpriteCheckbox,
    SpriteTable,
    SpriteInput,
    SpriteInputNumber,
    SpriteRate,
    SpriteSlider,
    SpriteSwitch,
    SpriteTimePicker,
    SpriteTimeSelect,
    SpriteDatePicker,
    SpriteTreeSelect,
    SpriteUpload,
]

const install = (app: App): void => {
    components.forEach(component => app.component(component.name as string, component))
}

const Sprite = {
    install
}

export default Sprite
