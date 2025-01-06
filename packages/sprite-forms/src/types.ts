export enum FormComponentType {
    RADIO = 'RadioFormItem', // 单选框
    CHECKBOX = 'CheckboxFormItem', // 多选框
    INPUT = 'input', // 输入框
    INPUT_NUMBER = 'input-number', // 计数器
    SELECT = 'SelectFormItem', // 选择器
    CASCADER = 'cascader', // 级联选择器
    SWITCH = 'switch', // 开关
    SLIDER = 'slider', // 滑块
    TIME_PICKER = 'time-picker', // 时间选择器
    DATE_PICKER = 'date-picker', // 日期选择器
    UPLOAD = 'upload', // 上传
    RATE = 'rate', // 评分
    COLOR_PICKER = 'color-picker', // 颜色选择器
}

export const formComponentTypeList = [
    FormComponentType.INPUT,
    FormComponentType.INPUT_NUMBER,
    FormComponentType.CASCADER,
    FormComponentType.SWITCH,
    FormComponentType.SLIDER,
    FormComponentType.TIME_PICKER,
    FormComponentType.DATE_PICKER,
    FormComponentType.UPLOAD,
    FormComponentType.RATE,
    FormComponentType.COLOR_PICKER,
]

export interface FormItemProps {
    formItem?: Record<string, any> // 表单属性
    component?: Record<string, any>
}

export interface FormItemConfig {
    name: string // 字段名
    label?: string // 字段描述
    component?: FormComponentType | string // 表单项类型
    required?: boolean, // 是否必填
    rules?: any,
    readonly?: boolean | ((formData?: Record<string, any>) => boolean)
    visible?: boolean | ((formData?: Record<string, any>) => boolean)
    disabled?: boolean | ((formData?: Record<string, any>) => boolean)
    options?: Record<string, any>[] | ((formData?: Record<string, any>) => Record<string, any>[])
    remoteOptions?: (formData?: Record<string, any>) => Record<string, any>[]
    labelKey?: string
    valueKey?: string
    column?: Record<string, any> // 表单布局属性
    slot?: string // 表单插槽
    customSlot?: string // 自定义插槽
    props?: FormItemProps
    change?: (data: any) => void
}

export interface FormConfig {
    rules?: any // 表单校验
    layout?: Record<string, any> // 表单布局基于 ElRow & ElCol 组件
    props?: Record<string, any> // 表单属性用于 ElForm 组件
}