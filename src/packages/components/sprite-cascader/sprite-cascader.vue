<script setup lang="ts">
import type {FormItemProps} from "@packages/types";
import {onMounted, ref} from "vue";
import {useFormItem} from "@packages/hooks/use-form-item.ts";
import {FORM_ITEM_EMIT_NAME} from "@packages/constants";

defineOptions({name: 'SpriteCascader'})

interface Props extends FormItemProps {
  value?: Array<string | number | boolean>
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => ([])
})

const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  loadOptions
} = useFormItem(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

onMounted(() => {
  loadOptions()
})

defineExpose({
  loadOptions,
  bindFieldName: props.name,
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-cascader
      v-else
      v-model="internalModel"
      :options="options"
      :props="props"
      @change="handleChange"
  >
    <template #empty v-if="props?.itemProps?.emptySlot">
      <slot :name="props.itemProps.emptySlot"></slot>
    </template>
  </el-cascader>
</template>