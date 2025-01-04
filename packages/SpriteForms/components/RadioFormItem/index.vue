<script setup lang="ts">

defineOptions({
  name: 'RadioFormItem'
})

const props = defineProps<{
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  value: any
}>()

</script>

<template>
  <el-radio-group v-model="props.value">
    <el-radio
        v-for="item in props.options"
        :label="item.label"
        :value="item.value"
    >
    </el-radio>
  </el-radio-group>
</template>

<style scoped>

</style>