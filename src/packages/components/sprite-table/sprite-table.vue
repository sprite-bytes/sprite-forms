<script setup lang="ts">
import type {TableConfig, ColumnItems} from "@packages/types";
import {isFunction} from "lodash";

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

/**
 * 表单数据发生改变时触发
 */
const handleChange = (params: { scope: any, item: any, event: any }) => {
  const {item} = params || {};
  const payload = {
    ...params,
  }
  if (isFunction(item.change)) {
    item.change(payload)
  }
}

</script>

<template>
  <el-form>
    <el-table :data="props.data" v-bind="config">
      <template v-for="item in columns" :key="item.name">
        <el-table-column
            :label="item.label"
            :prop="item.name"
            :width="item.width"
            v-bind="item.config">
          <template v-if="item.component" #default="scope">
            <el-form-item
                :prop="item.name"
                v-bind="item?.formItemProps"
            >
              <component
                  :is="item.component"
                  v-model="scope.row[item.name]"
                  @change="(event: Record<string, any>) => handleChange({scope, item, event})"
                  :formData="scope.row"
              />
            </el-form-item>
          </template>
          <template v-else-if="item.slot" #default="scope">
            <slot :name="item.slot" :scope="{item, config, value: scope.row[item.name]}"></slot>
          </template>
          <template v-else-if="isFunction(item?.format)" #default="scope">
            {{ scope.row[item.name] }}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>