<script setup lang="ts">
import type {TableConfig, ColumnItems} from "@packages/types";

defineOptions({name: 'SpriteTable'})

interface Props {
  config?: TableConfig,
  columns: ColumnItems[]
  data: Record<string, any>[]
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => []
})

const isFormatColumn = (item: ColumnItems) => {
  return typeof item?.format === 'function'
}
</script>

<template>
  <el-table :data="props.data" v-bind="config">
    <template v-for="item in columns" :key="item.name">
      <el-table-column
          :label="item.label"
          :prop="item.name"
          :width="item.width"
          v-bind="item.config">
        <template v-if="item.slot" #default="scope">
          <slot :name="item.slot" :scope="{item, config, value: scope.row[item.name]}"></slot>
        </template>
        <template v-if="isFormatColumn(item)" #default="scope">
          {{ scope }}
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped>

</style>