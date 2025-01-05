<script setup lang="ts">

defineOptions({
  name: 'RadioFormItem'
})

interface Props {
  labelKey?: string,
  valueKey?: string,
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  model: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
})

</script>

<template>
  <el-radio-group v-model="props.model">
    <el-radio
        v-for="item in props.options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
    >
    </el-radio>
  </el-radio-group>
</template>

<style scoped>

</style>