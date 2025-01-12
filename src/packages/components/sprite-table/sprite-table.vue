<script setup lang="ts">
import {TABLE_CELL_COMPONENT, TABLE_CELL_CUSTOM_SLOT, TABLE_CELL_SLOT} from "@packages/constants"
import type {TableConfig, ColumnItem, CellChangeParams} from "@packages/types"
import {isFunction, isString, isUndefined, omit} from "lodash";
import {reactive, ref} from "vue";

defineOptions({name: 'SpriteTable'})

interface Props {
  config?: TableConfig,
  columns: ColumnItem[]
  data: Record<string, any>[]
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => []
})

/**
 * 整个渲染的表单实例对象
 */
const formItemListRef = ref()

const form = reactive({
  data: props.data,
})

/**
 * 根据字段名获取当前字段绑定的组件实例
 * @param data.targetField 字段名
 * @param data.index 行索引
 */
const getInstanceByField = (data: { targetField: string, index: number }): any => {
  const {targetField, index} = data
  for (const itemRef of formItemListRef.value) {
    const {bindFieldName, scope} = itemRef
    if (bindFieldName === targetField && index == scope.$index) {
      return itemRef
    }
  }
  return null
}

/**
 * 加载字典数据，如下拉选择、多选、单选
 */
const loadOptions = (data: { targetField: string, index: number, params?: Record<string, any> }): any => {
  const {targetField, index, params} = data
  const itemRef: any = getInstanceByField({targetField, index})
  if (itemRef && isFunction(itemRef.loadOptions)) {
    return itemRef.loadOptions(params)
  }
}

/**
 * 根据字段名获取当前字段配置
 * @param targetField 字段名
 */
const getPropsByField: (targetField: string) => ColumnItem | undefined = (targetField) => {
  const findIndex = props.columns.findIndex(item => item.name === targetField)
  if (findIndex >= 0) {
    return props.columns[findIndex]
  }
}

/**
 * 表单数据发生改变时触发
 */
const handleChange = (params: { value: any, scope: any, item: ColumnItem, event: any }) => {
  const {item, scope} = params || {}
  const payload: CellChangeParams = {
    loadOptions: (data: { targetField: string, index?: number, params?: Record<string, any> }) => {
      return loadOptions({
        ...data,
        index: isUndefined(data.index) ? scope.$index : data.index,
      })
    },
    getInstanceByField: (data: { targetField: string, index?: number }) => {
      return getInstanceByField({
        ...data,
        index: isUndefined(data.index) ? scope.$index : data.index,
      })
    },
    getPropsByField,
    formData: form,
    row: scope.row,
    ...params,
    instance: formItemListRef.value,
  }
  if (isFunction(item.change)) {
    item.change(payload)
  }
}

/**
 * 格式化单元格的值
 */
const formatCellValue = (params: { value: any, scope: any, item: ColumnItem }) => {
  const {value, item} = params;
  let cellValue = value
  if (isFunction(item.format)) {
    cellValue = item.format(params)
  }
  return cellValue || item.emptyText || props.config?.emptyText
}

/**
 * 设置当前单元格表单组件并返回是否使用表单组件
 */
const chkAndSetCellComponent = (params: { value: any, scope: any, item: ColumnItem }) => {
  const {item, scope} = params;
  let component = item.component
  if (isFunction(item.component)) {
    component = item.component({...params, index: scope.$index, row: scope.row, form});
  }
  if (isString(component)) {
    scope.row[`${TABLE_CELL_COMPONENT}${item.name}`] = component
  }
  return component || false
}

/**
 * 设置当前单元格表单插槽并返回是否使用表单插槽
 */
const chkAndSetCellSlot = (params: { value: any, scope: any, item: ColumnItem }) => {
  const {item, scope} = params;
  let slot = item.slot
  if (isFunction(item.slot)) {
    slot = item.slot({...params, index: scope.$index, row: scope.row, form});
  }
  if (isString(slot)) {
    scope.row[TABLE_CELL_SLOT] = slot
  }
  return slot || false
}

/**
 * 设置当前单元格自定义插槽并返回是否使用自定义插槽
 */
const chkAndSetCellCustomSlot = (params: { value: any, scope: any, item: ColumnItem }) => {
  const {item, scope} = params;
  let customSlot = item.customSlot
  if (isFunction(item.customSlot)) {
    customSlot = item.customSlot({...params, index: scope.$index, row: scope.row, form});
  }
  if (isString(customSlot)) {
    scope.row[TABLE_CELL_CUSTOM_SLOT] = customSlot
  }
  return customSlot || false
}

/**
 * 表单组件属性
 */
const getComponentProps = (item: ColumnItem) => {
  return {
    // 忽略 disabled、readonly 属性，避免冲突
    ...omit(item, 'disabled', 'readonly'),
    // 字段组件配置
    ...item.props,
  };
};
</script>

<template>
  <el-form :model="form" v-bind="config?.formProps">
    <el-table :data="form.data" v-bind="config?.tableProps">
      <template v-for="item in columns" :key="item.name">
        <el-table-column
            :label="item.label"
            :prop="item.name"
            :width="item.width"
            v-bind="item.props">
          <template #default="scope">
            <template v-if="chkAndSetCellComponent({value: scope.row[item.name], scope, item})">
              <template v-if="chkAndSetCellCustomSlot({value: scope.row[item.name], scope, item})">
                <slot :name="scope.row[TABLE_CELL_CUSTOM_SLOT]"></slot>
              </template>
              <el-form-item
                  v-else
                  :prop="item.name"
                  v-bind="item?.formItemProps"
              >
                <template v-if="chkAndSetCellSlot({value: scope.row[item.name], scope, item})">
                  <slot :name="scope.row[TABLE_CELL_SLOT]"></slot>
                </template>
                <component
                    v-else
                    ref="formItemListRef"
                    :is="scope.row[`${TABLE_CELL_COMPONENT}${item.name}`]"
                    v-model="scope.row[item.name]"
                    @change="(event: Record<string, any>) => handleChange({value: scope.row[item.name], scope, item, event})"
                    :formData="scope.row"
                    :scope="scope"
                    v-bind="getComponentProps(item)"
                />
              </el-form-item>
            </template>
            <template v-else>
              {{ formatCellValue({value: scope.row[item.name], scope, item}) }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>