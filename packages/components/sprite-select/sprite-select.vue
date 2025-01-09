<script setup lang="ts">
import {onMounted, ref} from "vue"

import {useFormItem} from "../../hooks/use-form-item.ts"
import type {FormItemProps} from "../../types"

defineOptions({name: 'SpriteSelect'})
interface Props extends FormItemProps {
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  isLoading,
  handleChange,
  initOptions
} = useFormItem<Props>(props, internalModel)

onMounted(() => {
  initOptions()
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-select
      v-else
      :loading="isLoading"
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