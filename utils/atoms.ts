import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
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

export const APIRequestDataMapAtom = atomWithStorage<APIRequestDataMapType>(
  "APIRequestDataMap",
  {
    "tab-simple-tree-id-initial": {
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/users/${Math.ceil(
        Math.random() * 10,
      )}`,
      request: {
        params: [{ id: uuidV4(), key: "", value: "", checked: true }],
        headers: [{ id: uuidV4(), key: "", value: "", checked: true }],
        auth: null,
        body: null,
      },
      response: {
        httpResponse: { status: "idle", data: null, error: null },
        typed: null,
        raw: null,
        headers: null,
        stats: null,
      },
    },
  },
);
