<script setup lang="ts">
import {reactive, ref} from "vue";
import {FormComponentType, FormConfig, FormItemConfig} from "../../../packages/SpriteForms/types";

const formConfig = reactive<FormConfig>({
  layout: {
    gutter: 10
  },
  formAttribute: {
    labelWidth: 'auto'
  }
})

const formItems = ref<FormItemConfig[]>([
  {
    component: FormComponentType.RADIO,
    label: '性别',
    prop: 'gender',
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
    prop: 'hobby',
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
    prop: 'name',
    visible(formData) {
      return formData.age !== 1;
    },
    disabled(formData) {
      const { hobby = [] } = formData;
      return hobby.includes(1)
    },
  },
  {
    component: FormComponentType.INPUT_NUMBER,
    label: '年龄',
    prop: 'age',
  },
  {
    component: FormComponentType.SELECT,
    label: '政治面貌',
    prop: 'politicalOutlook',
    options: [
      {
        value: 1,
        label: '党员',
      },
      {
        value: 2,
        label: '团员',
      }
    ],
  },
  {
    component: FormComponentType.CASCADER,
    label: '地址',
    prop: 'address',
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
    prop: 'whetherPass',
  },
  {
    component: FormComponentType.SLIDER,
    label: '意愿度',
    prop: 'willingness',
  },
  {
    component: FormComponentType.TIME_PICKER,
    label: '起床时间',
    prop: 'wakeUpTime',
  },
  {
    component: FormComponentType.DATE_PICKER,
    label: '出生年月',
    prop: 'birthday',
  },
  {
    component: FormComponentType.RATE,
    label: '评价',
    prop: 'rate',
  },
  {
    component: FormComponentType.COLOR_PICKER,
    label: '喜欢的颜色',
    prop: 'color',
  },
  {
    prop: 'post',
    label: '岗位',
    slot: 'postSlot',
  },
  {
    prop: 'mobile',
    customSlot: 'mobileSlot',
  }
])

const modelModel = reactive<Record<string, any>>({
  name: '格子惊蛰版',
  willingness: 10
})
</script>

<template>
  <div class="examples-container">
    <SpriteForms
        :model="modelModel"
        :config="formConfig"
        :form-items="formItems"
    >
      <template #postSlot="{scope : {item}}">
        <div>{{ item }}</div>
      </template>
      <template #mobileSlot>
        <div>手机号</div>
      </template>
    </SpriteForms>
  </div>
</template>

<style scoped>
.examples-container {
  width: 50%;
  margin: auto;
}
</style>