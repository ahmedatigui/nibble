import { atom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import {
  httpRequestConfigType,
  httpResponseConfigType,
  keyValueAtomType,
  APIRequestDataMapType,
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

export const currentActiveLeafAtom = atom("tab-simple-tree-id-initial");
export const currentLeafsAtom = atom(data);

export const APIRequestDataMapAtom = atom<APIRequestDataMapType>({
  "tab-simple-tree-id-initial": {
    method: "GET",
    url: `https://jsonplaceholder.typicode.com/users/${Math.round(
      Math.random() * 10,
    )}`,
    request: {
      params: [{ id: uuidV4(), key: "", value: "", checked: true }],
      headers: [{ id: uuidV4(), key: "", value: "", checked: true }],
      auth: null,
      body: null,
    },
    response: {
      typed: null,
      raw: null,
      headers: null,
      stats: null,
    },
  },
});
