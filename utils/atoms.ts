import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";

export const httpRequestConfigAtom = atom<{apiURL: string, httpMethod: string, body: string | null}>({apiURL: "https://jsonplaceholder.typicode.com/users", httpMethod: "GET", body: null});

export const httpResponseConfigAtom = atom<{status: string, data: object | null, error: unknown | null}>({status: "idle", data: null, error: null});

export const httpRequestStatusAtom = atom({});

export const environmentVariablesAtom = atom({});
