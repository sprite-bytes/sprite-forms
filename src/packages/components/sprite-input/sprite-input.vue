<script setup lang="ts">

import {ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types"

defineOptions({name: 'SpriteInput'})

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
  <el-input v-else v-model="internalModel">
    <template #append v-if="props?.itemProps?.appendSlot">
      <slot :name="props.itemProps.appendSlot"></slot>
    </template>
    <template #prefix v-if="props?.itemProps?.prefixSlot">
      <slot :name="props.itemProps.prefixSlot"></slot>
    </template>
    <template #suffix v-if="props?.itemProps?.suffixSlot">
      <slot :name="props.itemProps.suffixSlot"></slot>
    </template>
    <template #prepend v-if="props?.itemProps?.prependSlot">
      <slot :name="props.itemProps.prependSlot"></slot>
    </template>
  </el-input>
</template>