import spriteForms from './src/sprite-forms.vue'

import {withInstall} from "../../utils/install.ts";

export const SpriteForms = withInstall(spriteForms)

export default SpriteForms

export * from './src/sprite-forms'

export type {SpriteFormsInstance} from './src/instance'