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

export interface FormItemAttribute {
    options?: Record<string, any> // 下拉选择、单选、多选的配置列表
    labelKey?: string
    valueKey?: string
    col?: Record<string, any> // 布局属性
    formItem?: Record<string, any> // 表单属性
    com?: Record<string, any> // 表单实例组件属性
    comItem?: Record<string, any>
}

export interface FormItemConfig {
    prop: string // 字段名
    component?: FormComponentType // 表单类型
    readonly?: boolean | ((formData: Record<string, any>) => boolean)
    visible?: boolean | ((formData: Record<string, any>) => boolean)
    rules?: boolean | ((formData: Record<string, any>) => boolean)
    disabled?: boolean | ((formData: Record<string, any>) => boolean)
    options?: Record<string, any>[] | ((formData: Record<string, any>) => Record<string, any>[])
    remoteOptions?: () => Record<string, any>[]
    label?: string // 字段描述
    attribute?: FormItemAttribute // 字段其他属性
    slot?: string // 表单插槽
    customSlot?: string
}

export interface FormConfig {
    layout?: Record<string, any>
    formAttribute?: Record<string, any>
}