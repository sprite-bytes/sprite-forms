<script setup lang="ts">
import {reactive} from "vue";
import SpriteTable from "@packages/components/sprite-table/sprite-table.vue";
import type {ColumnItem, TableConfig} from "@packages/types";
import {FormElemType} from "@packages/enums";

const getOptions = (params: any) => {
  const list = [{value: 1, name: `党员${params.label}`,}, {value: 2, name: `团员${params.label}`}]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(list)
    }, 2000)
  })
}

const columns = reactive<ColumnItem[]>([
  {
    name: 'name',
    label: '姓名',
    component: FormElemType.INPUT
  },
  {
    name: 'age',
    label: '年龄',
    component: FormElemType.INPUT_NUMBER
  },
  {
    name: 'gender',
    label: '性别',
    component: ({row}: any) => {
      return row.age < 10 ? FormElemType.SELECT : FormElemType.RADIO
    },
    options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
    change: async (params) => {
      const {getPropsByField, loadOptions} = params
      const props = getPropsByField('name')
      if (props) {
        props.label = '学生姓名'
      }
      const result = await loadOptions({
        targetField: 'politicalOutlook',
        params: {
          label: '%'
        },
      })
      console.log('result=>', result)
      console.log('props=>', props)
      console.log(params)
    }
  },
  {
    component: FormElemType.SELECT,
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    valueKey: 'value',
    required: true,
    remoteOptions: ({params}: any) => {
      return getOptions({label: params?.label || '#'})
    }
  },
])

const data = reactive([
  {name: '格子', age: 18, gender: 1},
  {name: '格子大暑版', age: 20, gender: 2},
  {name: '格子惊蛰版', age: 20, gender: 1}
])

const config = reactive<TableConfig>({
  tableProps: {
    border: true,
  }
})
</script>

<template>
  <SpriteTable :config="config" :columns="columns" :data="data"/>
</template>

<style scoped>

</style>