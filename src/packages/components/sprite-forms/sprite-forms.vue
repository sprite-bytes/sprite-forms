<script setup lang="ts">
import {ref} from 'vue';
import {isUndefined, omit} from "lodash";
import {type FormConfig, type FormItemConfig} from "@packages/types";

defineOptions({name: 'SpriteForms'})

const props = defineProps<{
  config?: FormConfig,
  formItems: FormItemConfig[]
  model: Record<string, any>
}>()

const getRules = (item: FormItemConfig) => {
  if (Array.isArray(item?.rules)) {
    return item?.rules
  }
  if (item.required) {
    return [{
      required: true,
      message: `${item.label || item.name}必填`,
      trigger: 'change',
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
  return !!item.disabled;
};

// 判断表单项是否只读
const isReadonly = (item: FormItemConfig, formData: Record<string, any>) => {
  if (typeof item.readonly === 'function') {
    return item.readonly(formData);
  }
  return !!item.readonly;
};

const formRef = ref()
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: boolean, errorMessage: {
      field: string,
      fieldValue: never,
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

const handleChange = (data: any, item: FormItemConfig) => {
  if (typeof item.change === 'function') {
    item.change(data);
  }
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
                  :is="item.component"
                  :disabled="isDisabled(item, props.model)"
                  :readonly="isReadonly(item, props.model)"
                  :formState="props.model"
                  v-model="formData[item.name]"
                  v-bind="getComponentProps(item)"
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