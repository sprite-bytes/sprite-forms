<script setup lang="ts">

defineOptions({
  name: 'CheckboxFormItem'
})

const props = defineProps<{
  options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[]),
  model: Array<string | number | boolean>
}>()

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
        :label="item.label"
        :value="item.value"
    >
    </el-checkbox>
  </el-checkbox-group>
</template>

<style scoped>

</style>