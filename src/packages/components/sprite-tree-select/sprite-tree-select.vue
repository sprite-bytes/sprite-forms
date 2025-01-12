<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types"

defineOptions({name: 'SpriteTreeSelect'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {})
const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  loadOptions
} = useFormItem(props, internalModel)

onMounted(() => {
  loadOptions()
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-tree-select v-else v-model="internalModel" :data="options"/>
</template>