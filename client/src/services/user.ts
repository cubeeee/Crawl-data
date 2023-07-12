import axios from './axios';
import ApiState from '@typings/api';
import { UserState } from '@pages/User/constant';
const pathApi = 'http://localhost:8008/api';
type UserApiState = ApiState<UserState>
const api: UserApiState = {
  getAll: (data) => {
    const url = `${pathApi}/user/getAll`;
    return axios.post(url, data);
  },
  addItem: (data) => {
    const url = `${pathApi}/auth/add`;
    return axios.post(url, data);
  },
  editItem: (_id, data) => {
    const url = `${pathApi}/auth/edit/${_id}`;
    return axios.post(url, data);
  },
  deleteItem: (_id) => {
    const url = `${pathApi}/auth/delete/${_id}`;
    return axios.post(url);
  }
};
export default api;