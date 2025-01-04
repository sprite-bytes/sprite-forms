![输入图片说明](lib/images/form-preview.png)
### 基础用法
```vue
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
    </SpriteForms>
  </div>
</template>

<style scoped>
  .examples-container {
    width: 50%;
    margin: auto;
  }
</style>
```