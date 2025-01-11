<script setup lang="ts">
import {reactive, ref} from "vue";

import type {FormConfig, FormItemConfig} from "@packages/types";
import {ElMessage} from "element-plus";
import {DisplayMode, FormElemType} from "@packages/enums";
import SpriteForms from "@packages/components/sprite-forms/sprite-forms.vue";

const getOptions = (params: any) => {
  const list = [{value: 1, name: `党员${params.label}`,}, {value: 2, name: `团员${params.label}`}]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(list)
    }, 2000)
  })
}

const formConfig = reactive<FormConfig>({
  layout: {
    gutter: 10
  },
  props: {
    labelWidth: 'auto'
  }
})

const formState = reactive<Record<string, any>>({
  name: '格子惊蛰版',
  willingness: 10,
  age: 23
})

const formItems = ref<FormItemConfig[]>([
  {
    component: FormElemType.RADIO,
    label: '性别',
    name: 'gender',
    required: true,
    options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
  },
  {
    component: FormElemType.CHECKBOX,
    label: '爱好',
    name: 'hobby',
    required: true,
    options: [{value: 1, label: '语文'}, {value: 2, label: '数学'}, {value: 3, label: '物理'}],
  },
  {
    component: FormElemType.INPUT,
    label: '姓名',
    name: 'name',
    format({value}) {
      return `姓名：${value}`
    },
    change() {

    }
  },
  {
    component: ({formData}: any) => {
      return formData?.age == 1 ? FormElemType.INPUT_NUMBER : FormElemType.INPUT
    },
    label: '年龄',
    name: 'age',
    format({value}) {
      return `${value}岁`
    },
    mode: DisplayMode.EDIT,
    change: async function (params) {
      console.log('params=>', params)
      const {loadOptions, getPropsByField, getInstanceByField} = params
      const props = getPropsByField('politicalOutlook')
      console.log('props=>', props)
      const instance = getInstanceByField('politicalOutlook')
      console.log('instance=>', instance)
      const result = await loadOptions('politicalOutlook', {label: '@'})
      console.log('result=>', result)
    },
  },
  {
    component: FormElemType.SELECT,
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    required: true,
    valueKey: 'value',
    remoteOptions: ({params}: any) => {
      return getOptions({label: params?.label || '#'})
    }
  },
  {
    component: FormElemType.TREE_SELECT,
    label: '地址',
    name: 'address',
    options: [
      {
        value: '001',
        label: '北京市',
        children: [
          {
            value: '00101',
            label: '朝阳区',
          },
          {
            value: '00102',
            label: '海淀区',
          }
        ]
      },
      {
        value: '002',
        label: '重庆市',
        children: [
          {
            value: '00201',
            label: '渝北区',
          },
          {
            value: '00202',
            label: '江北区',
          },
          {
            value: '00203',
            label: '南岸区',
          }
        ]
      }
    ]
  },
  {
    component: FormElemType.SWITCH,
    label: '是否通过',
    name: 'whetherPass',
  },
  {
    component: FormElemType.SLIDER,
    label: '意愿度',
    name: 'willingness',
  },
  {
    component: FormElemType.TIME_PICKER,
    label: '起床时间',
    name: 'wakeUpTime',
  },
  {
    component: FormElemType.DATE_PICKER,
    label: '出生年月',
    name: 'birthday',
  },
  {
    component: FormElemType.COLOR_PICKER,
    label: '喜欢的颜色',
    name: 'color',
    mode: ({formData}: any) => {
      return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
    }
  },
  {
    component: FormElemType.RATE,
    label: '评价',
    name: 'rate',
  }
])

const spriteFormsRef = ref()
const submitForm = () => {
  spriteFormsRef.value.validate().then(() => {
    ElMessage.success('操作成功')
  }).catch((error: any) => {
    console.log('error=>', error)
    ElMessage.warning('请填写必填信息')
  })
}

const change = (data: any) => {
  console.log(data)
}
</script>

<template>
  <div class="examples-container">
    <SpriteForms
        ref="spriteFormsRef"
        :config="formConfig"
        :form-items="formItems"
        v-model:model="formState"
        @change="change"
    >
      <div class="action">
        <el-button size="large" type="primary" @click="submitForm">提 交</el-button>
      </div>
    </SpriteForms>
  </div>
</template>

<style scoped>
.examples-container {
  width: 50%;
  padding: 20px;
  text-align: center;
}
</style>