import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuidV4 } from "uuid";
import {
  httpRequestConfigType,
  httpResponseConfigType,
  keyValueAtomType,
  APIRequestDataMapType,
  FileManagerDataType,
} from "./types";
// import { data } from "./data";

export const httpRequestConfigAtom = atom<httpRequestConfigType>({
  apiURL: "https://jsonplaceholder.typicode.com/users/1",
  httpMethod: "GET",
  data: null,
});

export const httpResponseConfigAtom = atom<httpResponseConfigType>({
  status: "idle" || "loading" || "hasData" || "hasError",
  data: {
    body: null,
    headers: null,
  },
  error: null,
});

export const configParamsAtom = atom<keyValueAtomType[]>([
  { id: uuidV4(), key: "", value: "", checked: true },
]);

export const configHeadersAtom = atom<keyValueAtomType[]>([
  { id: uuidV4(), key: "", value: "", checked: true },
]);

export const environmentVariablesAtom = atom({});

export const FileManagerDataAtom = atomWithStorage<FileManagerDataType[]>(
  "FileManagerData",
  [{ id: "tab-simple-tree-id-initial", name: "Untitled" }],
);

export const currentActiveLeafAtom = atom("tab-simple-tree-id-initial");
export const currentLeafsAtom = atom([
  { id: "tab-simple-tree-id-initial", name: "Untitled" },
]);

export const APIRequestDataMapAtom = atomWithStorage<APIRequestDataMapType>(
  "APIRequestDataMap",
  {
    "tab-simple-tree-id-initial": {
      method: "GET",
      url: `http://httpbin.org/get`,
      timing: 0,
      request: {
        params: [{ id: uuidV4(), key: "", value: "", checked: true }],
        headers: [
          {
            id: uuidV4(),
            key: "Content-Type",
            value: "application/json",
            checked: true,
          },
          { id: uuidV4(), key: "Accept", value: "*/*", checked: true },
          { id: uuidV4(), key: "", value: "", checked: true },
        ],
        auth: null,
        body: "// Hello, World!",
      },
      response: {
        httpResponse: {
          status: "idle",
          data: {
            body: null,
            headers: null,
          },
          error: null 
        },
        typed: null,
        raw: null,
        headers: null,
        stats: null,
        statusCode: null,
        statusText: null,
      },
      tab: {
        name: "Untitled",
        id: "tab-simple-tree-id-initial",
      },
      style: {
        theme: "light",
      },
    },
  },
);
