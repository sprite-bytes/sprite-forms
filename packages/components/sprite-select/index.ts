import spriteSelect from './src/sprite-select.vue'

import {withInstall} from "../../utils/install.ts"

export const SpriteSelect = withInstall(spriteSelect)

export default SpriteSelect

export type {SpriteSelectInstance} from './src/instance'