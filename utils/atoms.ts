import { atom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import {
  httpRequestConfigType,
  httpResponseConfigType,
  keyValueAtomType,
  APIRequestDataMapType
} from "./types";
import { data } from "./data";

export const httpRequestConfigAtom = atom<httpRequestConfigType>({
  apiURL: "https://jsonplaceholder.typicode.com/users/1",
  httpMethod: "GET",
  data: null,
});

export const httpResponseConfigAtom = atom<httpResponseConfigType>({
  status: "idle",
  data: null,
  error: null,
});

export const configParamsAtom = atom<keyValueAtomType[]>([
  { id: uuidV4(), key: "", value: "", checked: true },
]);

export const configHeadersAtom = atom<keyValueAtomType[]>([
  { id: uuidV4(), key: "", value: "", checked: true },
]);

export const environmentVariablesAtom = atom({});

export const currentActiveLeafAtom = atom("tab-0");
export const currentLeafsAtom = atom(data);

export const APIRequestDataMapAtom = atom<APIRequestDataMapType>({"tab-simple-tree-id-initial": {
  method: "GET",
  url: `https://jsonplaceholder.typicode.com/users/${Math.random() * 100}`,
  request: {
    params: null,
    headers: null,
    auth: null,
    body: null,
  },
  response: {
    typed: null,
    raw: null,
    headers: null,
    stats: null,
  },
}});
