<script setup lang="ts">
import {onMounted, ref} from "vue"

import {useFormItem} from "@packages/hooks/use-form-item.ts"
import type {FormItemProps} from "@packages/types"
import {FORM_ITEM_EMIT_NAME, OPTION_LABEL_KEY, OPTION_VALUE_KEY} from "@packages/constants";

defineOptions({name: 'SpriteSelect'})

interface Props extends FormItemProps {
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: OPTION_LABEL_KEY,
  valueKey: OPTION_VALUE_KEY,
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  isLoading,
  loadOptions
} = useFormItem(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

onMounted(() => {
  loadOptions()
})

defineExpose({
  loadOptions,
  bindFieldName: props.name,
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