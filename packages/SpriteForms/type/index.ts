export enum FormItem {
    RADIO = 'Radio', // 单选框
    CHECKBOX = 'Checkbox', // 多选框
    INPUT = 'Input', // 输入框
    INPUT_NUMBER = 'InputNumber', // 计数器
    SELECT = 'Select', // 选择器
    CASCADER = 'Cascader ', // 级联选择器
    SWITCH = 'Switch', // 开关
    SLIDER = 'Slider', // 滑块
    TIME_PICKER = 'TimePicker', // 时间选择器
    DATE_PICKER = 'DatePicker', // 日期选择器
    UPLOAD = 'Upload', // 上传
    RATE = 'Rate', // 评分
    COLOR_PICKER = 'ColorPicker', // 颜色选择器
}

export interface FormItemAttribute {
    options?: Record<string, any> // 下拉选择、单选、多选的配置列表
    labelKey?: string
    valueKey?: string
    col?: Record<string, any> // 布局属性
    formItem?: Record<string, any> // 表单属性
    com?: Record<string, any> // 表单实例组件属性
    comItem?: Record<string, any>
}

export interface FormItems {
    type: FormItem // 表单类型
    prop: string // 字段名
    label?: string // 字段描述
    attribute?: FormItemAttribute // 字段其他属性
}

export interface FormConfig {
    layout?: Record<string, any>
    formAttribute?: Record<string, any>
}