<script setup lang="ts">
import {ref} from 'vue';
import {isFunction, isUndefined, omit} from "lodash";
import {type FormConfig, type FormItemConfig} from "@packages/types";
import type {FormInstance} from "element-plus";
import type {ValidateFieldsError} from "async-validator";

defineOptions({name: 'SpriteForms'})

interface Props {
  config?: FormConfig,
  formItems: FormItemConfig[]
  model: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    trigger: 'change',
  }),
  formItems: () => [],
  model: () => ({})
})

const getRules = (item: FormItemConfig) => {
  if (Array.isArray(item?.rules)) {
    return item?.rules
  }
  if (item.required) {
    return [{
      required: true,
      message: `${item.label || item.name}必填`,
      trigger: props?.config?.trigger,
    }]
  }
  return item?.rules || []
}

const getComponentProps = (item: FormItemConfig) => {
  return {
    // 忽略 disabled、readonly、options 属性，避免冲突
    ...omit(item, 'disabled', 'readonly'),
    ...item.props
  };
};

// 判断表单项是否可见
const isVisible = (item: FormItemConfig, formData: Record<string, any>) => {
  if (isFunction(item.visible)) {
    return item.visible(formData);
  }
  // 默认设置为 TRUE
  return isUndefined(item.visible) ? true : item.visible;
};

// 判断表单项是否禁用
const isDisabled = (item: FormItemConfig, formData: Record<string, any>) => {
  if (isFunction(item.mode)) {
    return item.mode(formData);
  }
  return item.mode === 'DISABLED';
};

// 判断表单项是否只读
const isReadonly = (item: FormItemConfig, formData: Record<string, any>) => {
  if (isFunction(item.mode)) {
    return item.mode(formData);
  }
  return item.mode === 'READONLY';
};

const formRef = ref<FormInstance>()
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: boolean, invalidFields?: ValidateFieldsError) => {
      if (valid) {
        resolve(props.model)
      } else {
        reject(invalidFields)
      }
    });
  })
}

const resetFields = () => {
  formRef.value?.resetFields()
}

defineExpose({
  validate,
  resetFields,
  formRef,
})

const emit = defineEmits(['change']);

const formData = new Proxy(props.model, {
  set(target, property: string, value) {
    emit('change', {target, property, value})
    target[property] = value;
    return true
  }
})

/**
 * 整个表单实例对象
 */
const formItemListRef = ref()

/**
 * 根据字段名获取当前字段绑定的组件实例
 * @param targetField 字段名
 */
const getRef: (targetField: string) => any = (targetField) => {
  for (const itemRef of formItemListRef.value) {
    if (itemRef.bindFieldName === targetField) {
      return itemRef
    }
  }
  return null
}

/**
 * 加载字典数据，如下拉选择、多选、单选
 * @param targetField 目标字段
 * @param params 自定义请求参数
 */
const loadOptions = (targetField: string, params: Record<string, any>) => {
  const itemRef: any = getRef(targetField)
  if (itemRef) {
    itemRef.loadOptions(params)
  }
}

const handleChange = (data: any, item: FormItemConfig) => {
  if (isFunction(item.change)) {
    item.change({
      data,
      getRef,
      loadOptions,
      refs: formItemListRef.value,
    });
  }
}

const getComponent = (item: FormItemConfig, formData: Record<string, any>) => {
  if (isFunction(item.component)) {
    return item.component({item, formData})
  }
  return item.component
}
</script>

<template>
  <el-form class="sprite-forms" ref="formRef" :model="formData" :rules="config?.rules" v-bind="config?.props">
    <el-row v-bind="config?.layout">
      <template v-for="item in formItems" :key="item.name">
        <template v-if="isVisible(item, props.model)">
          <slot v-if="item?.customSlot" :name="item.customSlot"></slot>
          <el-col v-else v-bind="item?.column">
            <el-form-item
                :label="item.label"
                :prop="item.name"
                :rules="getRules(item)"
                v-bind="item?.formItemProps"
            >
              <slot v-if="item.labelSlot" :name="item.labelSlot"/>
              <slot v-if="item.errorSlot" :name="item.errorSlot"/>
              <slot v-if="item.slot" :name="item.slot" :scope="{item, value: props.model[item.name]}"/>
              <component
                  v-else
                  :is="getComponent(item, props.model)"
                  :disabled="isDisabled(item, props.model)"
                  :readonly="isReadonly(item, props.model)"
                  :formState="props.model"
                  v-model="formData[item.name]"
                  v-bind="getComponentProps(item)"
                  ref="formItemListRef"
                  @change="(data: any) => handleChange(data, item)"
              />
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-row>
    <slot></slot>
  </el-form>
</template>