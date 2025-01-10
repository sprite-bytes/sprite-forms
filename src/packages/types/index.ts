import type {FormRules} from 'element-plus'

export enum FormComponentType {
    RADIO = 'sprite-radio', // 单选框
    CHECKBOX = 'sprite-checkbox', // 多选框
    INPUT = 'sprite-input', // 输入框
    INPUT_NUMBER = 'el-input-number', // 计数器
    SELECT = 'sprite-select', // 选择器
    CASCADER = 'el-cascader', // 级联选择器
    SWITCH = 'el-switch', // 开关
    SLIDER = 'el-slider', // 滑块
    TIME_PICKER = 'el-time-picker', // 时间选择器
    DATE_PICKER = 'el-date-picker', // 日期选择器
    UPLOAD = 'el-upload', // 上传
    RATE = 'el-rate', // 评分
    COLOR_PICKER = 'el-color-picker', // 颜色选择器
}

export enum DisplayMode {
    VIEW = 'VIEW', // 详情
    EDIT = 'EDIT', // 编辑
    READONLY = 'READONLY', // 只读
    DISABLED = 'DISABLED', // 禁用
}

export type PropFunction<T> = T | ((params?: Record<string, any>) => T | any)

export interface ItemProps {
    optionProps?: Record<string, any> // 字段组件子组件属性
    suffixSlot?: string // 输入框头部内容，只对非 type="textarea" 有效
    prefixSlot?: string // 输入框尾部内容，只对非 type="textarea" 有效
    prependSlot?: string // 输入框前置内容，只对非 type="textarea" 有效
    appendSlot?: string // 输入框后置内容，只对非 type="textarea" 有效
    headerSlot?: string // 下拉列表顶部的内容
    footerSlot?: string // 下拉列表底部的内容
    emptySlot?: string // 无选项时的列表
    tagSlot?: string // SELECT 组件自定义标签内容
    loadingSlot?: string // SELECT 组件自定义 loading 内容
    labelSlot?: string // SELECT 组件自定义标签内容
}

export interface FormItemConfig {
    name: string // 字段名
    label?: string // 字段描述
    component?: PropFunction<FormComponentType | string> // 字段组件
    mode?: PropFunction<DisplayMode> // 组件展示模式
    visible?: PropFunction<boolean> // 组件隐藏
    rules?: PropFunction<FormRules>, // 字段校验（优先级最高）
    required?: PropFunction<boolean>, // 字段必填（简要必填配置方式）
    options?: PropFunction<Record<string, any>[]> // 所有选项类型组件的选项数据
    remoteOptions?: PropFunction<Promise<Record<string, any>[]>> // 所有选项类型组件的远程选项数据
    valueKey?: string // 选项值字段
    labelKey?: string  // 选项描述字段
    slot?: string // 字段插槽（插槽在 el-form-item 组件里面）
    column?: Record<string, any> // 字段布局（el-col）
    customSlot?: string // 字段自定义插槽（插槽脱离 el-form-item 组件）
    viewSlot?: string // VIEW 模式的插槽
    labelSlot?: string // 字段描述插槽
    errorSlot?: string // 字段错误提示插槽
    formItemProps?: Record<string, any> // 字段组件父组件配置（ el-form-item）
    props?: Record<string, any> // 字段组件配置
    itemProps?: ItemProps // 字段组件配置子组件配置（比如下拉选择的 el-option、el-radio、el-checkbox 属性、插槽以及其他组件（el-input）的插槽）
    change?: (data: any) => void // 字段值改变时触发
    formChange?: (data: any) => void // 表单数据改变时触发
    format?: (data: any) => any // 仅在 VIEW 模式下格式化展示的文本
    emptyText?: string // VIEW 模式下为 undefined、null 时展示的默认文本
}

export interface FormItemProps extends FormItemConfig {
    formData: Record<string, any> // 整个表单数据
}

export interface FormConfig {
    trigger?: 'blur' | 'change'
    rules?: FormRules[] // 表单校验规则（优先级小于字段属性定义）
    layout?: Record<string, any> // 表单布局配置（基于 ElRow & ElCol 组件实现）
    props?: Record<string, any> // 表单属性用于 ElForm 组件
    emptyText?: string // view 模式下空值展示的文本（优先级小于字段属性定义）
}

export interface TableConfig {

}

export interface ColumnItems {
    name: string
    label?: string
    width?: string | number
    slot?: string
    config?: Record<string, any>
    format?: (data: any) => any
}