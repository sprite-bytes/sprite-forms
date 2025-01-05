<script setup lang="ts">

defineOptions({
  name: 'SelectFormItem'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  model?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  model: () => ''
})

</script>

<template>
  <el-select v-model="props.model">
    <el-option
        v-for="item in props.options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-option>
  </el-select>
</template>

<style scoped>

</style>