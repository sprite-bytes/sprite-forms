<script setup lang="ts">
import {reactive, ref} from "vue";
import {FormComponentType, FormConfig, FormItemConfig} from "../packages";

const formConfig = reactive<FormConfig>({
  rules: {
    gender: [
      {required: true, trigger: 'blur'},
    ]
  },
  layout: {
    gutter: 10
  },
  attribute: {
    labelWidth: 'auto'
  }
})

const formItems = ref<FormItemConfig[]>([
  {
    component: FormComponentType.RADIO,
    label: '性别',
    name: 'gender',
    options: [
      {
        value: 1,
        label: '男',
      },
      {
        value: 2,
        label: '女',
      }
    ],
  },
  {
    component: FormComponentType.CHECKBOX,
    label: '爱好',
    name: 'hobby',
    required: true,
    options: [
      {
        value: 1,
        label: '语文',
      },
      {
        value: 2,
        label: '数学',
      },
      {
        value: 3,
        label: '物理',
      }
    ],
  },
  {
    component: FormComponentType.INPUT,
    label: '姓名',
    name: 'name',
    readonly(formData) {
      return formData.politicalOutlook !== 1;
    },
    disabled(formData) {
      const {hobby = []} = formData;
      return hobby.includes(1)
    },
  },
  {
    component: FormComponentType.INPUT_NUMBER,
    label: '年龄',
    name: 'age',
  },
  {
    component: FormComponentType.SELECT,
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    required: true,
    valueKey: 'value',
    options: [
      {
        value: 1,
        name: '党员',
      },
      {
        value: 2,
        name: '团员',
      }
    ],
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

const formState = reactive<Record<string, any>>({
  name: '格子惊蛰版',
  willingness: 10,
  age: 23
})

const spriteFormsRef = ref()
const submitForm = () => {
  spriteFormsRef.value.validateForm().then(() => {
    console.log('通过')
  }).catch((error) => {
    console.log(error)
  })
}

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
  <div class="examples-container">
    <SpriteForms
        v-if="false"
        ref="spriteFormsRef"
        :model="formState"
        :config="formConfig"
        :form-items="formItems"
    >
      <template #postSlot="{scope : {item}}">
        <div>{{ item }}</div>
      </template>
      <template #mobileSlot>
        <div>手机号</div>
      </template>
      <el-button @click="submitForm">提交</el-button>
    </SpriteForms>
    <SpriteTable :config="config" :columns="columns" :data="data"/>
  </div>
</template>

<style scoped>
.examples-container {
  width: 50%;
  margin: auto;
}
</style>