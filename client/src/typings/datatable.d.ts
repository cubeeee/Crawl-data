export type FilterState = {
  text: string | JSX.Element,
  value: any
}[]
export type OptionState = {
  label: string | JSX.Element,
  value: string | boolean | number,
  disabled?: boolean
}[]
export interface InitalState<TData> {
  pagination: {
    current: number,
    pageSize: number,
    pageSizeOptions: number[],
    showSizeChanger: boolean,
    total?: number
  },
  filters?: {
    keyword?: string,
    [x: string]: string | number | boolean | undefined
  },
  sort?: {
    field?: string,
    order?: string
  },
  data?: TData[],
  loading?: boolean,
  selectedRowKeys: any[],
  updated: number
}
export interface IAjax {
  field?: string,
  order?: string,
  pageSize: number | string,
  current: number | string,
  searchColumn: ColumnState,
  search?: {
    [key: string]: any
  }
}
export interface ResponseAjax<TData> {
  success: number,
  data?: TData[],
  recordsTotal?: number,
  recordsFiltered?: number,
  message?: string
}
export interface InitalProps<TData> {
  onReload?: () => void,
  setState?: React.Dispatch<React.SetStateAction<InitalState>>,
  state?: InitalState,
  item?: TData,
  ids?: string[],
  filters?: {
    [x: string]: string | number | boolean,
    keyword?: string,
  }
}