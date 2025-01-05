export interface TableConfig {

}

export interface ColumnItems {
    name: string
    label?: string
    width?: string | number
    slot?: string
    config?: Record<string, any>
    format?: Function
}