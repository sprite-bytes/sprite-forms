<script setup lang="ts">

import {ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types";
import {FORM_ITEM_EMIT_NAME} from "@packages/constants";

defineOptions({name: 'SpriteColorPicker'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: ''
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
} = useFormItem(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

defineExpose({
  bindFieldName: props.name,
  scope: props.scope
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-color-picker
      v-else
      @change="handleChange"
      v-model="internalModel"
  >
  </el-color-picker>
</template>