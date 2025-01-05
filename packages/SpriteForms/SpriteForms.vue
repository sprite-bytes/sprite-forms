<script setup lang="ts">
import {ref} from 'vue';
import {isUndefined, omit} from "lodash";

defineOptions({
  name: 'SpriteForms',
})
import {type FormConfig, type FormItemConfig, FormComponentType, formComponentTypeList} from "./types";

const props = defineProps<{
  config?: FormConfig,
  formItems: FormItemConfig[]
  model: Record<string, any>
}>()

const getComponent = (component?: FormComponentType | string) => {
  for (let item of formComponentTypeList) {
    if (item === component) {
      return `el-${component}`;
    }
  }
  return component;
};

const getComponentProps = (item: FormItemConfig) => {
  const props: any = {
    // 忽略 disabled、readonly 属性，避免冲突
    ...omit(item, 'disabled', 'readonly'),
    ...item.attribute?.component
  };
  return props;
};

// 判断表单项是否可见
const isVisible = (item: FormItemConfig, formData: Record<string, any>) => {
  if (typeof item.visible === 'function') {
    return item.visible(formData);
  }
  return isUndefined(item.visible) ? true : item.visible;
};

// 判断表单项是否禁用
const isDisabled = (item: FormItemConfig, formData: Record<string, any>) => {
  if (typeof item.disabled === 'function') {
    return item.disabled(formData);
  }
  return item.disabled;
};

// 判断表单项是否只读
const isReadonly = (item: FormItemConfig, formData: Record<string, any>) => {
  if (typeof item.readonly === 'function') {
    return item.readonly(formData);
  }
  return item.readonly;
};

// 获取下拉选择的选项数据，根据数据源类型进行处理
const getOptions = (item: FormItemConfig) => {
  if (typeof item.remoteOptions === 'function') {
    return item.remoteOptions();
  } else if (item.options) {
    return item.options;
  }
  return [];
};

const formRef = ref()
const validateForm = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: boolean, errorMessage: {
      field: string,
      fieldValue: unknown,
      message: string
    }[]) => {
      if (valid) {
        resolve(props.model)
      } else {
        reject(errorMessage)
      }
    });
  })
}

defineExpose({
  validateForm,
})
</script>

<template>
  <el-form :model="model" ref="formRef" :rules="config?.rules" v-bind="config?.attribute">
    <el-row v-bind="config?.layout">
      <template v-for="item in formItems" :key="item.name">
        <template v-if="isVisible(item, props.model)">
          <slot v-if="item?.customSlot" :name="item.customSlot"></slot>
          <el-col v-else v-bind="item?.column">
            <el-form-item
                :label="item.label"
                :prop="item.name"
                :rules="item?.rules"
                v-bind="item?.attribute?.formItem"
            >
              <slot v-if="item.slot" :name="item.slot" :scope="{item, value: props.model[item.name]}"/>
              <component
                  v-else
                  :disabled="isDisabled(item, props.model)"
                  :readonly="isReadonly(item, props.model)"
                  :is="getComponent(item.component)"
                  v-model="props.model[item.name]"
                  :options="getOptions(item)"
                  v-bind="getComponentProps(item)"
              />
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-row>
    <slot></slot>
  </el-form>
</template>