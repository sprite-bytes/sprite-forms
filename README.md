### 基础用法
```javascript
<script setup lang="ts">
import {reactive, ref} from "vue";
import SpriteForms from "../packages/SpriteForms";
import {FormConfig, FormItem, FormItems} from "../packages/SpriteForms/type";

const formConfig = reactive<FormConfig>({
  layout: {
    gutter: 10
  },
  formAttribute: {
    labelWidth: 'auto'
  }
})

const formItems = ref<FormItems[]>([
  {
    type: FormItem.RADIO,
    label: '性别',
    prop: 'gender',
    attribute: {
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
    }
  },
  {
    type: FormItem.CHECKBOX,
    label: '爱好',
    prop: 'hobby',
    attribute: {
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
    }
  },
  {
    type: FormItem.INPUT,
    label: '姓名',
    prop: 'name',
  },
  {
    type: FormItem.INPUT_NUMBER,
    label: '年龄',
    prop: 'age',
  },
  {
    type: FormItem.SELECT,
    label: '政治面貌',
    prop: 'politicalOutlook',
    attribute: {
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
    }
  },
  {
    type: FormItem.CASCADER,
    label: '地址',
    prop: 'address',
    attribute: {
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
    }
  },
  {
    type: FormItem.SWITCH,
    label: '是否通过',
    prop: 'whetherPass',
  },
  {
    type: FormItem.SLIDER,
    label: '意愿度',
    prop: 'willingness',
  },
  {
    type: FormItem.TIME_PICKER,
    label: '起床时间',
    prop: 'wakeUpTime',
  },
  {
    type: FormItem.DATE_PICKER,
    label: '出生年月',
    prop: 'birthday',
  },
  {
    type: FormItem.UPLOAD,
    label: '头像',
    prop: 'avatar',
  },
  {
    type: FormItem.RATE,
    label: '评价',
    prop: 'rate',
  },
  {
    type: FormItem.COLOR_PICKER,
    label: '喜欢的颜色',
    prop: 'color',
  },
])

const modelModel = reactive({
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
    />
  </div>
</template>

<style scoped>
.examples-container {
  width: 50%;
  margin: auto;
}
</style>
```