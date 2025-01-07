<script setup lang="ts">

import {ref} from "vue";

defineOptions({
  name: 'SpriteRadio'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => ''
})
const internalModel = ref(props.value);
</script>

<template>
  <el-radio-group v-model="internalModel">
    <el-radio
        v-for="item in props.options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-radio>
  </el-radio-group>
</template>