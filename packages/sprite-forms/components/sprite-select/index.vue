<script setup lang="ts">
import {ref} from "vue"

import {useFormItem} from "../../../hooks/use-form-item.ts"
import type {FormItemProps} from "../../src/types.ts"

defineOptions({name: 'SpriteSelect'})

interface Props extends FormItemProps {
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
})

const internalModel = ref(props.value);

const {isView, viewSlot, viewValue, options, handleChange} = useFormItem<Props>(props, internalModel)
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-select
      v-else
      @change="handleChange"
      v-model="internalModel"
  >
    <el-option
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-option>
  </el-select>
</template>