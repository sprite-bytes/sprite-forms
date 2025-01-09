import type {App} from "vue"
import SpriteTable from './sprite-table.vue'

SpriteTable.install = (app: App) => {
    // @ts-ignore
    app.use(SpriteTable.name, SpriteTable)
}

export default SpriteTable