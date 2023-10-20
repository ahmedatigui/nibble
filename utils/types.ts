import { AxiosRequestConfig } from "axios";

export interface httpRequestConfigType {
  apiURL: string;
  httpMethod: string;
  data?: string | null | undefined;
  config?: AxiosRequestConfig;
  headers?: any;
  params?: any;
}

export interface httpResponseConfigType {
  status: string;
  data: object | null | undefined;
  error: unknown | null | undefined;
}

export interface keyValueAtomType {
  id: string;
  key: string;
  value: string;
  checked: string | boolean;
}

export interface ReadyHeadersType {
  [key: string]: string;
}
