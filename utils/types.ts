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

export type CheckedState = boolean | "indeterminate";

export interface keyValueAtomType {
  id: string;
  key: string;
  value: string;
  checked: CheckedState | undefined;
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
  timing: number;
  request: {
    params: keyValueAtomType[];
    headers: keyValueAtomType[];
    auth: any;
    body: any;
  };
  response: {
    httpResponse: httpResponseConfigType;
    typed: any;
    raw: any;
    headers: any;
    stats: any;
    statusCode: any;
    statusText: any;
  };
  tab: {
    name: string;
    id: string;
  };
  style: {
    theme: "light" | "dark";
  };
};

export type APIRequestDataMapType = {
  [key: string]: APIRequestDataType;
};
