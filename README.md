### 安装 SpriteForms
```vue
npm install sprite-forms
```
### SpriteForms
#### 表单配置项 `FormItemConfig`
- **name** `string` `必填`
    >字段名
- **label**: `string` `非必填`
    >字段描述
- **component**: `PropFunction<FormElemType | string>` `非必填`
  >字段组件
- **mode**: `PropFunction<DisplayMode>` `非必填`
  >组件展示模式
- **visible**: `PropFunction<boolean>` `非必填`
  >组件隐藏
- **rules**: `PropFunction<FormRules>` `非必填`
  >字段校验（优先级最高）
- **required**: `PropFunction<boolean>` `非必填`
  >字段必填（简要必填配置方式）
- **options**: `PropFunction<Record<string, any>[]>` `非必填`
  >所有选项类型组件的选项数据
- **remoteOptions**: `PropFunction<Promise<Record<string, any>[]>>` `非必填`
  >所有选项类型组件的远程选项数据
- **valueKey**: `string` `非必填`
  >选项值字段
- **labelKey**: `string` `非必填`
  >选项描述字段
- **slot**: `string` `非必填`
  >字段插槽（插槽在 el-form-item 组件里面）
- **column**: `Record<string, any>` `非必填`
  >字段布局（el-col）
- **customSlot**: `string` `非必填`
  >字段自定义插槽（插槽脱离 el-form-item 组件）
- **viewSlot**: `string` `非必填`
  >VIEW 模式的插槽
- **labelSlot**: `string` `非必填`
  >字段描述插槽
- **errorSlot**: `string` `非必填`
  >字段错误提示插槽
- **formItemProps**: `Record<string, any>` `非必填`
  >字段组件父组件配置（ el-form-item）
- **props**: `Record<string, any>` `非必填`
  >字段组件配置
- **itemProps**: `ItemProps` `非必填`
  >字段组件配置子组件配置（比如下拉选择的 el-option、el-radio、el-checkbox 属性、插槽以及其他组件（el-input）的插槽）
- **change**: `(data: FormItemChangeParams) => void` `非必填`
  >字段值改变时触发
- **format**: `(data: any) => any` `非必填`
  >仅在 VIEW 模式下格式化展示的文本
- **emptyText**: `string` `非必填`
  >VIEW 模式下为 undefined、null 时展示的默认文本
### SpriteTable
#### 列配置项 `ColumnItem`
- name: `string` `必填`
  >列字段名
- label: `string` `非必填`
  >列字段描述
- width: `string | number` `非必填`
  >列宽
- rules: `PropFunction<FormRules>` `非必填`
  >字段校验（优先级最高）
- customSlot: `string` `非必填`
  >字段自定义插槽（插槽脱离 el-form-item 组件）
- slot: `string` `非必填`
  >字段插槽（插槽在 el-form-item 组件里面）
- props: `Record<string, any>` `非必填`
  >el-table-column 配置
- formItemProps: `Record<string, any>` `非必填`
  >字段组件父组件配置（ el-form-item）
- component: `PropFunction<FormElemType | string | false>` `非必填`
  >单元格表单组件（如果返回 false 则不使用表单组件）
- format: `PropFunction<any>` `非必填`
  >格式化单元格的值
- change: `(data: CellChangeParams) => void` `非必填`
  >字段值改变时触发
- options:` PropFunction<Record<string, any>[]>` `非必填`
  >所有选项类型组件的选项数据
- remoteOptions: `PropFunction<Promise<Record<string, any>[]>>` `非必填`
  >所有选项类型组件的远程选项数据
- valueKey: `string` `非必填`
  >选项值字段
- labelKey: `string` `非必填`
  >选项描述字段
- required: `PropFunction<boolean>` `非必填`
  >字段必填（简要必填配置方式）
- emptyText: `string` `非必填`
  >为 undefined、null 时展示的默认文本