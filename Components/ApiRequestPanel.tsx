"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { produce } from "immer";

// Utils
import createApiRequestFunction from "@/utils/restApi";
import {
  httpRequestConfigAtom,
  httpResponseConfigAtom,
  configParamsAtom,
  configHeadersAtom,
  APIRequestDataMapAtom,
} from "../utils/atoms";
import { keyValueAtomType, ReadyHeadersType } from "@/utils/types";

// Components
import KeyValueList from "@/Components/KeyValueList";
import SelectDemo from "@/Components/Select";
import FileManager from "@/Components/FileManager";
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

export default function ApiRequestPanel({ tab }: { tab: string }) {
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

  // New Data strcuture Atom
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );

  async function handleSubmit() {
    const readyParams = APIRequestDataMap[tab].request.params
      .filter(
        (list: keyValueAtomType) =>
          list.checked && list.key.length && list.value.length,
      )
      .reduce(
        (params: keyValueAtomType[], list: keyValueAtomType) => ({
          ...params,
          [list.key]: list.value,
        }),
        [],
      );

    let readyHeaders: ReadyHeadersType = {};
    const filteredList = APIRequestDataMap[tab].request.headers.filter(
      (list: keyValueAtomType) =>
        list.checked && list.key.length && list.value.length,
    );
    filteredList.forEach(
      (list: keyValueAtomType) =>
        (readyHeaders[`${list.key}`] = `${list.value}`),
    );

    try {
      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].response.httpResponse.status = "loading";
        }),
      );
      console.log(APIRequestDataMap);
      const response: any = await createApiRequestFunction({
        apiURL: APIRequestDataMap[tab].url,
        httpMethod: APIRequestDataMap[tab].method,
        headers: readyHeaders,
        params: readyParams,
      });

      const data: any = response.data;

      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].response.httpResponse.status = "hasData";
          draft[tab].response.httpResponse.data = data;
        }),
      );
      console.log(APIRequestDataMap);
      console.log(response, data);
    } catch (error) {
      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].response.httpResponse.status = "hasError";
          draft[tab].response.httpResponse.error = error;
        }),
      );
      console.log(APIRequestDataMap);
    }
  }

  const renderKeyValueLists = (
    atomName: string,
    theList: keyValueAtomType[],
  ): JSX.Element[] =>
    theList.map((list: keyValueAtomType, ind: number) => (
      <KeyValueList key={list.id} atomName={atomName} order={ind} tab={tab} />
    ));

  useEffect(() => {
    console.log(APIRequestDataMap[`${tab}`].request.params);
    setRenderedParamsKeyValueList(
      renderKeyValueLists("params", APIRequestDataMap[`${tab}`].request.params),
    );
    const readyList = configParams
      .filter((list) => list.checked && list.key.length && list.value.length)
      .map((list) => new URLSearchParams({ [list.key]: list.value }));
    console.log("READYLIST: ", readyList);
    console.log("READYPARAM: ", readyList.length && readyList[0].toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [APIRequestDataMap]);

  useEffect(() => {
    console.log(APIRequestDataMap[`${tab}`].request.headers);
    setRenderedHeadersKeyValueList(
      renderKeyValueLists(
        "headers",
        APIRequestDataMap[`${tab}`].request.headers,
      ),
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
  }, [APIRequestDataMap]);

  useEffect(
    () => console.log("APIRequestDataMap: ", APIRequestDataMap),
    [APIRequestDataMap],
  );

  useEffect(() =>
    console.info(
      "ApiRequestPanel: ",
      tab,
      APIRequestDataMap,
      APIRequestDataMap[`${tab}`],
    ),
  );

  return (
    <>
      <Grid columns="1fr auto" gap="4">
        <Grid columns="auto 1fr auto">
          <SelectDemo />
          <TextField.Root>
            <TextField.Input
              id="Url"
              defaultValue={`${
                APIRequestDataMap[`${tab}`].url ??
                "https://jsonplaceholder.typicode.com/users/1"
              }`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setHttpRequestConfig((prev) => ({
                  ...prev,
                  apiURL: e.target.value,
                }));
                setAPIRequestDataMap(
                  produce((draft) => {
                    draft[`${tab}`].url = e.target.value;
                  }),
                );
              }}
            />
          </TextField.Root>
          <Button onClick={() => handleSubmit()}>
            <PaperPlaneIcon />
          </Button>
        </Grid>
        <Flex direction="row" justify="between" align="center" gap="2" px="4">
          <Text size="3" align="center">
            200 OK
          </Text>
          <Text size="3" align="center">
            75ms
          </Text>
          <Text size="3" align="center">
            2.14kb
          </Text>
        </Flex>
      </Grid>
      <Grid columns="1fr 1fr" gap="4">
        <Box>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List aria-label="Manage your account">
              <Tabs.Trigger value="tab1">Params</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Headers</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Auth</Tabs.Trigger>
              <Tabs.Trigger value="tab4">Body</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <ReqParamsTabContent
                renderedParamsKeyValueList={renderedParamsKeyValueList}
                renderKeyValueLists={renderKeyValueLists}
                APIRequestDataMap={APIRequestDataMap}
                tab={tab}
              />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <ReqHeadersTabContent
                renderedHeadersKeyValueList={renderedHeadersKeyValueList}
                renderKeyValueLists={renderKeyValueLists}
                APIRequestDataMap={APIRequestDataMap}
                tab={tab}
              />
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <ReqAuthTabContent />
            </Tabs.Content>
            <Tabs.Content value="tab4">
              <ReqBodyTabContent tab={tab} />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
        <Box>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List aria-label="Manage your account">
              <Tabs.Trigger value="tab1">JSON</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Raw</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Headers</Tabs.Trigger>
              <Tabs.Trigger value="tab4">Stats</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <ResBodyJSONTabContent tab={tab} />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <ResBodyRawTabContent tab={tab} />
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <ResHeadersTabContent />
            </Tabs.Content>
            <Tabs.Content value="tab4">
              <ResHeadersTabContent />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Grid>
    </>
  );
}
