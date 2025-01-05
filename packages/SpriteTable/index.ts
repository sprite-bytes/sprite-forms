import spriteTable from './src/sprite-table.vue'

export const SpriteTable = spriteTable

SpriteTable.install = function (Vue: any) {
    Vue.component(SpriteTable.name, SpriteTable)
}

export default SpriteTable

export * from './src/sprite-table'

export type {SpriteTableInstance} from './src/instance'