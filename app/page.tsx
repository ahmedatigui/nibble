"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";

// Utils
import createApiRequestFunction from "@/utils/restApi";
import {
  httpRequestConfigAtom,
  httpResponseConfigAtom,
  configParamsAtom,
  configHeadersAtom,
} from "../utils/atoms";
import { keyValueAtomType, ReadyHeadersType } from "@/utils/types";

// Components
import KeyValueList from "@/Components/KeyValueList";
import SelectDemo from "@/Components/Select";
import FileManager from "@/Components/FileManager";
import FileTabs from "@/Components/FileTabs";
import ReqBodyTabContent from "@/Components/Tabs/ReqBodyTabContent";
import ReqParamsTabContent from "@/Components/Tabs/ReqParamsTabContent";
import ReqHeadersTabContent from "@/Components/Tabs/ReqHeadersTabContent";
import ReqAuthTabContent from "@/Components/Tabs/ReqAuthTabContent";
import ResBodyJSONTabContent from "@/Components/Tabs/ResBodyJSONTabContent";
import ResBodyRawTabContent from "@/Components/Tabs/ResBodyRawTabContent";
import ResHeadersTabContent from "@/Components/Tabs/ResHeadersTabContent";
import {
  Box,
  TextField,
  Button,
  Text,
  Tabs,
  Flex,
  Grid,
} from "@radix-ui/themes";

// Icons
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [renderedParamsKeyValueList, setRenderedParamsKeyValueList] = useState<
    JSX.Element[] | null
  >(null);
  const [renderedHeadersKeyValueList, setRenderedHeadersKeyValueList] =
    useState<JSX.Element[] | null>(null);
  const [configParams, setConfigParams] = useAtom(configParamsAtom);
  const [configHeaders, setConfigHeaders] = useAtom(configHeadersAtom);
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom,
  );
  const [httpResponseConfig, setHttpResponseConfig] = useAtom(
    httpResponseConfigAtom,
  );

  async function handleSubmit() {
    const readyParams = configParams
      .filter((list) => list.checked && list.key.length && list.value.length)
      .map((list) => new URLSearchParams({ [list.key]: list.value }));

    let readyHeaders: ReadyHeadersType = {};
    const filteredList = configHeaders.filter(
      (list) => list.checked && list.key.length && list.value.length,
    );
    filteredList.forEach(
      (list) => (readyHeaders[`${list.key}`] = `${list.value}`),
    );

    try {
      setHttpResponseConfig((prev) => ({ ...prev, status: "loading" }));
      console.log(httpRequestConfig);
      const response: any = await createApiRequestFunction({
        apiURL: httpRequestConfig.apiURL,
        httpMethod: httpRequestConfig.httpMethod,
        headers: readyHeaders,
        params: readyParams,
      });

      const data: any = response.data;
      setHttpResponseConfig((prev) => ({
        ...prev,
        status: "hasData",
        data: data,
      }));
      console.log(httpResponseConfig);
      console.log(response, data);
    } catch (error) {
      setHttpResponseConfig((prev) => ({
        ...prev,
        status: "hasError",
        error: error,
      }));
      console.log(httpResponseConfig);
    }
  }

  const renderKeyValueLists = (
    atomName: string,
    theList: keyValueAtomType[],
  ): JSX.Element[] =>
    theList.map((list: keyValueAtomType, ind: number) => (
      <KeyValueList key={list.id} atomName={atomName} order={ind} />
    ));

  useEffect(() => {
    console.log(configParams);
    setRenderedParamsKeyValueList(renderKeyValueLists("params", configParams));
    const readyList = configParams
      .filter((list) => list.checked && list.key.length && list.value.length)
      .map((list) => new URLSearchParams({ [list.key]: list.value }));
    console.log("READYLIST: ", readyList);
    console.log("READYPARAM: ", readyList.length && readyList[0].toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configParams]);

  useEffect(() => {
    console.log(configHeaders);
    setRenderedHeadersKeyValueList(
      renderKeyValueLists("headers", configHeaders),
    );
    const readyList = configHeaders
      .filter((list) => list.checked && list.key.length && list.value.length)
      .map((list) => ({ [`${list.key}`]: `${list.value}` }));
    console.log("READYLIST: ", readyList);

    let readyHeaders: ReadyHeadersType = {};

    const filteredList = configHeaders.filter(
      (list) => list.checked && list.key.length && list.value.length,
    );
    filteredList.forEach(
      (list) => (readyHeaders[`${list.key}`] = `${list.value}`),
    );

    console.log(readyHeaders);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configHeaders]);

  useEffect(() => console.log(httpRequestConfig), [httpRequestConfig]);

  return (
    <Grid rows="auto 1fr" gap="4" className="h-screen overflow-hidden">
      <Box p="4">Nibble</Box>
      <Grid columns="auto 1fr" gap="4">
        <Box>
          <FileManager />
        </Box>
        <Grid rows="auto 1fr" gap="4">
          <FileTabs />
        </Grid>
      </Grid>
    </Grid>
  );
}
