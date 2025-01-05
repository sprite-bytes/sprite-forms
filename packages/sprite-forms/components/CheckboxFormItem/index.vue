<script setup lang="ts">

defineOptions({
  name: 'CheckboxFormItem'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  model?: Array<string | number | boolean>
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  model: () => []
})

const emit = defineEmits(['update:model']);

const handleChange = (value: Array<string | number | boolean>) => {
  emit('update:model', value)
}


</script>

<template>
  <el-checkbox-group
      @change="handleChange"
      v-model="props.model"
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

<style scoped>

</style>