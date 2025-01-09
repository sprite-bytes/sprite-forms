<script setup lang="ts">
import {ref} from 'vue'
import FormUsage from './form-usage/index.vue'
import TableUsage from './table-usage/index.vue'

const activeName = ref('FormUsage')
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="表单使用演示" name="FormUsage">
      <FormUsage/>
    </el-tab-pane>
    <el-tab-pane label="表格使用演示" name="TableUsage">
      <TableUsage/>
    </el-tab-pane>
  </el-tabs>
</template>