<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";

defineOptions({
  name: 'SpriteCheckbox'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  value?: Array<string | number | boolean>
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => []
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
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