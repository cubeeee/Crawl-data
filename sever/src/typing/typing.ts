import { Document } from "mongoose"

export enum EStatus {
    SUSSESS = 'success',
    PENDING = 'pending',
    ERROR = 'error',
    PROCESSING = 'processing'
}

export interface IFacebook {
    name: string
    facebookId: string
    birth: string
    status: EStatus
    export: boolean
    isBirthday: boolean
}

export type IFacebookDocument = IFacebook & Document;

export interface IProxy {
    ip: string
    port: number
    host: string
    username: string
    password: string
    status: boolean
}

export type IProxyDocument = IProxy & Document;

export enum ERole {
    Admin = "Admin",
    User = "User",
  }
  
  export interface IUser {
    username: string;
    password: string;
    role?: ERole;
  }
  
  export type IUserDocument = IUser & Document;