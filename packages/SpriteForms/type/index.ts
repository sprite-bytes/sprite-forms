/**表单类型枚举*/
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

export interface formItems {
    type: FormItem
    prop: string
    label?: string
    attribute?: Record<string, any>
    options?: Record<string, any>
}

export interface FormConfig {
    formItems: formItems[]
    attribute?: Record<string, any>
}