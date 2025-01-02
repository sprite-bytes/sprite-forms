<script setup lang="ts">
import {type FormConfig, FormItem, type FormItems} from "./type";

defineProps<{
  config?: FormConfig,
  formItems: FormItems[]
  model: any
}>()
defineOptions({
  name: 'SpriteForms',
})

</script>

<template>
  <el-form :model="model" v-bind="config?.formAttribute">
    <el-row v-bind="config?.layout">
      <template v-for="item in formItems" :key="item.prop">
        <el-col v-if="FormItem.RADIO == item.type" v-bind="item.attribute?.col">
          <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-bind="item.attribute?.formItem">
            <el-radio-group v-model="model[item.prop]" v-bind="item.attribute?.com">
              <el-radio
                  v-for="option in item.attribute?.options"
                  :key="option.value"
                  :label="option.value"
                  v-bind="item.attribute?.comItem">
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.CHECKBOX == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-checkbox-group v-model="model[item.prop]" v-bind="item.attribute?.com">
              <el-checkbox
                  v-for="option in item.attribute?.options"
                  :key="option.value"
                  :label="option.value"
                  v-bind="item.attribute?.comItem">
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.INPUT == item.type" v-bind="item.attribute?.col">
          <el-form-item
              :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-input
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.INPUT_NUMBER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-input-number
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.SELECT == item.type" v-bind="item.attribute?.col">
          <el-form-item
              :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-select
                v-model="model[item.prop]" v-bind="item.attribute?.com">
              <el-option
                  v-for="option in item.attribute?.options"
                  :key="option.value" :label="option.label"
                  :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.CASCADER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-cascader
                v-model="model[item.prop]"
                :options="item.attribute?.options" v-bind="item.attribute?.com">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.SWITCH == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-switch
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.SLIDER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-slider
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-slider>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.TIME_PICKER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-time-select
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.DATE_PICKER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-date-picker
                type="date"
                v-model="model[item.prop]" v-bind="item.attribute?.com">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.UPLOAD == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-upload v-bind="item.attribute?.com">
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.RATE == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-rate v-model="model[item.prop]" v-bind="item.attribute?.com"></el-rate>
          </el-form-item>
        </el-col>
        <el-col v-if="FormItem.COLOR_PICKER == item.type" v-bind="item.attribute?.col">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <el-color-picker v-model="model[item.prop]" v-bind="item.attribute?.com"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="item.slot">
          <el-form-item :label="item.label" :prop="item.prop" v-bind="item.attribute?.formItem">
            <slot :name="item.slot" :scope="{item, config, value: model[item.prop]}"></slot>
          </el-form-item>
        </el-col>
        <el-col v-if="item.customSlot">
          <slot :name="item.slot" :scope="{item, config, value: model[item.prop]}"></slot>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>