import api from '@services/user';
import { OptionState } from '@typings/datatable';
export const ITEM_NAME = 'User';
export const SEARCH_COLUMNS: string[] = ['username'];
export const API = api;
export const ROLES: OptionState = [{
  label: 'Admin',
  value: 'Admin'
}, {
  label: 'User',
  value: 'User'
}]
export interface UserState {
  _id?: string,
  username?: string,
  password?: string,
  role?: string,
  createdAt?: Date,
  updatedAt?: Date,
}