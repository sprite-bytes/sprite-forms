export enum FormComponentType {
    RADIO = 'sprite-radio', // 单选框
    CHECKBOX = 'sprite-checkbox', // 多选框
    INPUT = 'el-input', // 输入框
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

export interface ItemProps {
    props: Record<string, any>
    optionProps: Record<string, any> // 字段组件子组件属性
}

export interface FormItemConfig {
    name: string // 字段名
    label?: string // 字段描述
    component?: FormComponentType | string // 字段组件
    rules?: any, // 字段校验
    required?: boolean, // 字段必填
    view?: boolean | ((formData?: Record<string, any>) => boolean) // 开启 view 模式
    readonly?: boolean | ((formData?: Record<string, any>) => boolean) // 字段只读
    visible?: boolean | ((formData?: Record<string, any>) => boolean) // 字段隐藏
    disabled?: boolean | ((formData?: Record<string, any>) => boolean) // 字段禁用
    options?: Record<string, any>[] | ((formData?: Record<string, any>) => Record<string, any>[]) // 所有选项类型组件的选项数据
    remoteOptions?: (formData?: Record<string, any>) => Promise<Record<string, any>[]> // 所有选项类型组件的远程选项数据
    valueKey?: string // 所有选项类型组件的值字段
    labelKey?: string  // 所有选项类型组件的描述字段
    column?: Record<string, any> // 字段布局
    slot?: string // 字段插槽（插槽在 FormItem 组件里面）
    customSlot?: string // 字段自定义插槽（插槽脱离 FormItem 组件）
    viewSlot?: string // view 模式的插槽
    labelSlot?: string // 字段描述插槽
    errorSlot?: string // 字段错误提示插槽
    formItemProps?: Record<string, any> // 字段组件父组件配置
    props?: Record<string, any> // 字段组件配置
    itemProps?: ItemProps //
    change?: (data: any) => void // 字段值改变时触发
    formChange?: (data: any) => void // 表单数据改变时触发
    format?: (data: any) => any // 仅仅 view 模式下格式化展示的文本
    emptyText?: string // view 模式下空值展示的文本
    watchSource?: (formData?: Record<string, any>) => any
}

export interface FormItemProps extends FormItemConfig {
    formState: any // 表单数据
}

export interface FormConfig {
    rules?: any // 表单校验规则（优先级小于字段属性定义）
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
    format?: (...data: any) => any
}