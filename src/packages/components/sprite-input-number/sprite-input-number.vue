<script setup lang="ts">

import {ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types"
import {FORM_ITEM_EMIT_NAME} from "@packages/constants";

defineOptions({name: 'SpriteInputNumber'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {})
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
  <el-input-number @change="handleChange" v-else v-model="internalModel">
    <template #prefix v-if="props?.itemProps?.decreaseIconSlot">
      <slot :name="props.itemProps.decreaseIconSlot"></slot>
    </template>
    <template #prefix v-if="props?.itemProps?.increaseIconSlot">
      <slot :name="props.itemProps.increaseIconSlot"></slot>
    </template>
    <template #prefix v-if="props?.itemProps?.prefixSlot">
      <slot :name="props.itemProps.prefixSlot"></slot>
    </template>
    <template #suffix v-if="props?.itemProps?.suffixSlot">
      <slot :name="props.itemProps.suffixSlot"></slot>
    </template>
  </el-input-number>
</template>