<script setup lang="ts">

defineOptions({
  name: 'SelectFormItem'
})

const props = defineProps<{
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  value: any
}>()

</script>

<template>
  <el-select v-model="props.value">
    <el-option
        v-for="item in props.options"
        :label="item.label"
        :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<style scoped>

</style>