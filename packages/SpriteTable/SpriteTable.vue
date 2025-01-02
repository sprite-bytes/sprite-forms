<script setup lang="ts">
import type {TableConfig, ColumnItems} from "./type";

defineOptions({
  name: 'SpriteTable'
})

defineProps<{
  config?: TableConfig,
  columns: ColumnItems[]
  data: Record<string, any>[]
}>()
</script>

<template>
  <el-table :data="data">
    <template v-for="item in columns" :key="item.prop">
      <el-table-column :label="item.label" :width="item.width">
        <template v-if="item.slot" #default="scope">
          <slot :name="item.slot" :scope="{item, config, value: scope.row[item.prop]}"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped>

</style>