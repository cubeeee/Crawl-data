import axios from './axios';
import ApiState from '@typings/api';
import { ProxyState } from '@pages/Proxy/constant';
const pathApi = 'http://localhost:8008/api';
type ProxyApiState = ApiState<ProxyState>
const api: ProxyApiState = {
  getAll: (data) => {
    const url = `${pathApi}/proxy/getAll`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `${pathApi}/proxy/add`;
    return axios.post(url, data);
  },
  editItem: (_id, data) => {
    const url = `${pathApi}/proxy/edit/${_id}`;
    return axios.post(url, data);
  },
  deleteItem: (_id) => {
    const url = `${pathApi}/proxy/delete/${_id}`;
    return axios.post(url);
  }
};
export default api;