<script setup lang="ts">

import {ref} from "vue";

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

const emit = defineEmits(['update:model']);

const handleChange = (value: Array<string | number | boolean>) => {
  emit('update:model', value)
}
</script>

<template>
  <el-checkbox-group
      @change="handleChange"
      v-model="internalModel"
  >
    <el-checkbox
        v-for="item in props.options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-checkbox>
  </el-checkbox-group>
</template>