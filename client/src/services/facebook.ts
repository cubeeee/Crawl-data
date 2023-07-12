import axios from './axios';
import ApiState from '@typings/api';
import { FacebookState } from '@pages/Facebook/constant';
const pathApi = 'http://localhost:8008/api';
type FacebookApiState = ApiState<FacebookState>
const api: FacebookApiState = {
  getAll: (data) => {
    const url = `${pathApi}/facebook/getAll`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `${pathApi}/facebook/add`;
    return axios.post(url, data);
  },
  editItem: (_id, data) => {
    const url = `${pathApi}/facebook/edit/${_id}`;
    return axios.post(url, data);
  },
  deleteItem: (_id) => {
    const url = `${pathApi}/facebook/delete/${_id}`;
    return axios.post(url);
  }
};
export default api;