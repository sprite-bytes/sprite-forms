<script setup lang="ts">
import {ref} from "vue";

const columns = ref([
  {
    name: 'name',
    label: '姓名',
  },
  {
    name: 'age',
    label: '年龄'
  },
  {
    name: 'gender',
    label: '性别',
    format: () => {
      return '男'
    }
  }
])
const data = ref([
  {name: '格子', age: 18, gender: '1'},
  {name: '格子大暑版本', age: 20, gender: '0'}
])

const config = ref({
  border: true,
})
</script>

<template>
  <SpriteTable :config="config" :columns="columns" :data="data"/>
</template>

<style scoped>

</style>