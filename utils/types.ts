import { AxiosRequestConfig } from "axios";

export interface httpRequestConfigType {
  apiURL: string;
  httpMethod: string | null;
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

export type FileManagerDataType = {
  id: string;
  name: string;
  children?: FileManagerDataType[];
};

export type APIRequestDataType = {
  method: string;
  url: string;
  request: {
    params: keyValueAtomType[];
    headers: keyValueAtomType[];
    auth: any;
    body: any;
  };
  response: {
    typed: any;
    raw: any;
    headers: any;
    stats: any;
  };
};

export type APIRequestDataMapType = {
  [key: string]: APIRequestDataType;
};
