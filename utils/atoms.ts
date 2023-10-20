import { atom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import {
  httpRequestConfigType,
  httpResponseConfigType,
  keyValueAtomType,
} from "./types";

export const httpRequestConfigAtom = atom<httpRequestConfigType>({
  apiURL: "https://jsonplaceholder.typicode.com/users",
  httpMethod: "GET",
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
