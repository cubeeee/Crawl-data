import { AxiosResponse } from 'axios';
import { IAjax, ResponseAjax } from './datatable';
export interface ApiResponse<T = null> {
  status: 'success' | 'error',
  message: string,
  data?: T
}
interface ApiState<TData> {
  getAll?: (data: IAjax) => Promise<AxiosResponse<ResponseAjax<TData>>>,
  addItem?: (data: TData) => Promise<AxiosResponse<ApiResponse<TData>>>,
  editItem?: (id: string, data: TData) => Promise<AxiosResponse<ApiResponse>>,
  deleteItem?: (id: string) => Promise<AxiosResponse<ApiResponse>>
}
export default ApiState;