import api from '@services/proxy';
import { OptionState } from '@typings/datatable';
export const ITEM_NAME = 'Scan';
export const SEARCH_COLUMNS: string[] = ['ip', 'port', 'host'];
export const API = api;
export const ROLES: OptionState = [{
  label: 'Admin',
  value: 'Admin'
}, {
  label: 'User',
  value: 'User'
}]
export interface ProxyState {
  _id?: string,
  username?: string,
  password?: string,
  ip?: string,
  port?: number,
  host?: string,
  status?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
}