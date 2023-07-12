import axios from './axios';
import ApiState, { ApiResponse } from '@typings/api';
import { ProductState } from '@pages/Product/constant';
import { AxiosResponse } from 'axios';
const pathApi = 'http://localhost:8008/api/product';
type UserApiState = ApiState<ProductState> & {
  addItem: (data: any) => Promise<AxiosResponse<ApiResponse<ProductState>>>;
}
const api: UserApiState = {
  getAll: (data) => {
    const url = `${pathApi}/getAll`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `${pathApi}/add`;
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  editItem: (_id, data) => {
    const url = `${pathApi}/edit/${_id}`;
    return axios.post(url, data);
  },
  deleteItem: (_id) => {
    const url = `${pathApi}/delete/${_id}`;
    return axios.post(url);
  }
};
export default api;