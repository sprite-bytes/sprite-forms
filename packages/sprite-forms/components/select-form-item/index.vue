<script setup lang="ts">

import {ref} from "vue";

defineOptions({
  name: 'SelectFormItem'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options: Record<string, any>[],
  value?: string | number | boolean
  change?: any
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: '',
})

const internalModel = ref(props.value);

const handleChange = () => {
  if (typeof props.change === 'function') {
    props.change(internalModel.value)
  }
}
</script>

<template>
  <el-select @change="handleChange" v-model="internalModel">
    <el-option
        v-for="item in props.options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-option>
  </el-select>
</template>