<script setup lang="ts">
import {reactive, ref} from "vue";

import {FormComponentType, type FormConfig, type FormItemConfig} from "@packages/types";
import {ElMessage} from "element-plus";

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
    component: FormComponentType.RADIO,
    label: '性别',
    name: 'gender',
    required: true,
    options: [{value: 1, label: '男',}, {value: 2, label: '女'}],
  },
  {
    component: FormComponentType.CHECKBOX,
    label: '爱好',
    name: 'hobby',
    required: true,
    options: [{value: 1, label: '语文',}, {value: 2, label: '数学',}, {value: 3, label: '物理'}],
  },
  {
    component: FormComponentType.INPUT,
    label: '姓名',
    name: 'name',
    view: true,
    format(data) {
      return `${data?.hobby}你好`
    },
    readonly(formData: any) {
      return formData.politicalOutlook !== 1;
    },
    disabled(formData: any) {
      const {hobby = []} = formData;
      return hobby.includes(1)
    },
  },
  {
    component: FormComponentType.INPUT_NUMBER,
    label: '年龄',
    name: 'age',
    change(data: string) {
      // formState['politicalOutlook'] = undefined
      console.log('change', data)
    },
  },
  {
    component: FormComponentType.SELECT,
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    required: true,
    valueKey: 'value',
    view(formData) {
      console.log('view', formData)
      return formData?.age === 20
    },
    options: (data: any) => {
      return data.age == 1 ? [{value: 1, name: '党员',}, {value: 2, name: '团员'}]
          : [{value: 3, name: '党员1',}, {value: 4, name: '团员1',}]
    }
  },
  {
    component: FormComponentType.CASCADER,
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
    component: FormComponentType.SWITCH,
    label: '是否通过',
    name: 'whetherPass',
  },
  {
    component: FormComponentType.SLIDER,
    label: '意愿度',
    name: 'willingness',
  },
  {
    component: FormComponentType.TIME_PICKER,
    label: '起床时间',
    name: 'wakeUpTime',
  },
  {
    component: FormComponentType.DATE_PICKER,
    label: '出生年月',
    name: 'birthday',
  },
  {
    component: FormComponentType.RATE,
    label: '评价',
    name: 'rate',
  },
  {
    component: FormComponentType.COLOR_PICKER,
    label: '喜欢的颜色',
    name: 'color',
  },
  {
    name: 'post',
    label: '岗位',
    slot: 'postSlot',
  },
  {
    name: 'mobile',
    customSlot: 'mobileSlot',
  }
])

const spriteFormsRef = ref()
const submitForm = () => {
  spriteFormsRef.value.validate().then(() => {
    ElMessage.success('操作成功')
  }).catch(() => {
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