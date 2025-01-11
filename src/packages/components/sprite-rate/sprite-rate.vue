<script setup lang="ts">

import {ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import type {FormItemProps} from "@packages/types"

defineOptions({name: 'SpriteRate'})

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

</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-rate v-else v-model="internalModel"/>
</template>