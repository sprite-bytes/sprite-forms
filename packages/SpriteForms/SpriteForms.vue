<script setup lang="ts">
import {isUndefined} from "lodash";

defineOptions({
  name: 'SpriteForms',
})
import {type FormConfig, type FormItemConfig, FormComponentType, formComponentTypeList} from "./types";

const props = defineProps<{
  config?: FormConfig,
  formItems: FormItemConfig[]
  model: Record<string, any>
}>()

// 根据组件类型返回对应的 Element Plus 组件名
const getComponent = (component?: FormComponentType) => {
  for (let item of formComponentTypeList) {
    if (item === component) {
      return `el-${component}`;
    }
  }
  return component;
};

// 获取组件额外的属性绑定，如验证规则等
const getComponentProps = (item: FormItemConfig) => {
  const props: any = {};
  if (item.rules) {
    props.rules = item.rules;
  }
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
</script>

<template>
  <el-form :model="model" v-bind="config?.formAttribute">
    <el-row v-bind="config?.layout">
      <template v-for="item in formItems" :key="item.prop">
        <el-col v-bind="item.attribute?.col">
          <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-if="isVisible(item, props.model)"
          >
            <component
                :disabled="isDisabled(item, props.model)"
                :readonly="isReadonly(item, props.model)"
                :is="getComponent(item.component)"
                v-model="props.model[item.prop]"
                :options="getOptions(item)"
                v-bind="getComponentProps(item)"
            />
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>