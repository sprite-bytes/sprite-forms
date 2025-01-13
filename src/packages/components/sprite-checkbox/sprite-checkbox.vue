<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types";
import {FORM_ITEM_EMIT_NAME} from "@packages/constants";

defineOptions({name: 'SpriteCheckbox'})

interface Props extends FormItemProps {
  value?: Array<string | number | boolean>
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => ([])
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
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
  scope: props.scope
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-checkbox-group
      v-else
      @change="handleChange"
      v-model="internalModel"
  >
    <el-checkbox
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-checkbox>
  </el-checkbox-group>
</template>