import api from '@services/facebook';
import { OptionState } from '@typings/datatable';
export const ITEM_NAME = 'Facebook';
export const SEARCH_COLUMNS: string[] = [];
export const API = api;
export const ROLES: OptionState = [{
  label: 'True',
  value: true
}, {
  label: 'False',
  value: false
}];

export const Status: OptionState = [
  {
    label: 'Success',
    value: 'success'
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Error',
    value: 'error',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
];

export interface FacebookState {
  _id?: string,
  name?: string
  facebookId?: string
  birth?: string
  status?: "success" | "pending" | "error" | "processing"
  export?: boolean
  createdAt?: Date,
  updatedAt?: Date,
}