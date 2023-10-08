import { AxiosRequestConfig } from "axios";

export interface httpRequestConfigType {
  apiURL: string;
  httpMethod: string;
  data?: string | null | undefined;
  config?: AxiosRequestConfig;
}

export interface httpResponseConfigType {
  status: string;
  data: object | null | undefined;
  error: unknown | null | undefined;
}

export interface paramsAtomType {
  count: number;
  lists: {key: string; value: string, checked: boolean}[];
}