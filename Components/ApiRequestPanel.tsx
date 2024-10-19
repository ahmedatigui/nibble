"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { produce } from "immer";

// Utils
import createApiRequestFunction from "@/utils/restApi";
import { APIRequestDataMapAtom } from "../utils/atoms";
import { keyValueAtomType, ReadyHeadersType } from "@/utils/types";

// Components
import KeyValueList from "@/Components/KeyValueList";
import SelectDemo from "@/Components/Select";
import ReqBodyTabContent from "@/Components/Tabs/ReqBodyTabContent";
import ReqParamsTabContent from "@/Components/Tabs/ReqParamsTabContent";
import ReqHeadersTabContent from "@/Components/Tabs/ReqHeadersTabContent";
import ReqAuthTabContent from "@/Components/Tabs/ReqAuthTabContent";
import ResBodyJSONTabContent from "@/Components/Tabs/ResBodyJSONTabContent";
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
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const inputErrorRef = useRef<HTMLDivElement | null>(null);

  async function handleSubmit() {
    try {
      new URL(APIRequestDataMap[tab].url);
      if (inputErrorRef.current) inputErrorRef.current.style.display = "none";
    } catch (e) {
      if (inputErrorRef.current) inputErrorRef.current.style.display = "block";
      return false;
    }

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

    let startTime = 0;
    try {
      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].response.httpResponse.status = "loading";
        }),
      );

      startTime = performance.now();
      //console.log("APIRequestDataMap: ", APIRequestDataMap);
      const response: any = await createApiRequestFunction({
        apiURL: APIRequestDataMap[tab].url,
        httpMethod: APIRequestDataMap[tab].method,
        data: APIRequestDataMap[tab].request.body,
        headers: readyHeaders,
        params: readyParams,
      });

      //console.info("response: ", response);

      // const timing = APIRequestDataMap[tab].timing;

      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].timing = performance.now() - startTime;
          draft[tab].response.httpResponse.status = "hasData";
          draft[tab].response.httpResponse.data = response.data;
          draft[tab].response.headers = response.headers;
          draft[tab].response.statusCode = response.status;
          draft[tab].response.statusText = response.statusText;
        }),
      );

      //console.log("APIRequestDataMap: ", APIRequestDataMap);
    } catch (error) {
      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].timing = performance.now() - startTime;
          draft[tab].response.httpResponse.status = "hasError";
          draft[tab].response.httpResponse.error = error;
        }),
      );

      //console.log("APIRequestDataMap:", APIRequestDataMap);
    }
  }

  const renderKeyValueLists = (
    atomName: string,
    theList: keyValueAtomType[],
  ): JSX.Element[] =>
    theList.map((list: keyValueAtomType, ind: number) => (
      <KeyValueList
        key={list.id}
        atomName={atomName}
        order={ind}
        tab={tab}
        keyValue={list}
      />
    ));

  return (
    <>
      <div ref={inputErrorRef} className="input-error">
        Invalid URL! (https://example.com or http://example.com)
      </div>
      <div className="action-panel">
        <Grid columns="auto 1fr auto" gap="2">
          <SelectDemo tab={tab} />
          <TextField.Root>
            <TextField.Input
              size="3"
              id="Url"
              defaultValue={APIRequestDataMap[tab].url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAPIRequestDataMap(
                  produce((draft) => {
                    draft[`${tab}`].url = e.target.value;
                  }),
                );
              }}
            />
          </TextField.Root>
          <Button
            size="3"
            onClick={() => handleSubmit()}
            disabled={
              APIRequestDataMap[tab].response.httpResponse.status === "loading"
            }
          >
            <PaperPlaneIcon />
          </Button>
        </Grid>
        <Flex
          direction="row"
          justify="center"
          align="center"
          gap="2"
          wrap="nowrap"
          className="sm:none"
        >
          <Text size="3" align="center">
            {APIRequestDataMap[tab].response.httpResponse.status === "hasData"
              ? APIRequestDataMap[tab].response.statusCode
              : "-"}
          </Text>
          <Text size="3" align="center">
            {" | "}
          </Text>
          <Text size="3" align="center">
            {APIRequestDataMap[tab]?.response?.headers &&
            APIRequestDataMap[tab]?.response?.headers["content-length"]
              ? `${Number(
                  APIRequestDataMap[tab]?.response?.headers["content-length"] /
                    1024,
                ).toFixed(3)}Kb`
              : "-"}
          </Text>
          <Text size="3" align="center">
            {" | "}
          </Text>
          <Text size="3" align="center">
            {APIRequestDataMap[tab].response.httpResponse.status === "hasData"
              ? `${Number(APIRequestDataMap[tab].timing / 1000).toFixed(2)}s`
              : "-"}
          </Text>
        </Flex>
      </div>
      <div className="config-panels">
        <div className="tabby1">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List aria-label="Manage your account">
              <Tabs.Trigger value="tab1">Params</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Headers</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Body</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <ReqParamsTabContent
                renderKeyValueLists={renderKeyValueLists}
                APIRequestDataMap={APIRequestDataMap}
                tab={tab}
              />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <ReqHeadersTabContent
                renderKeyValueLists={renderKeyValueLists}
                APIRequestDataMap={APIRequestDataMap}
                tab={tab}
              />
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <ReqBodyTabContent tab={tab} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="tabby2">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List aria-label="Manage your account">
              <Tabs.Trigger value="tab1">Response</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Headers</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <ResBodyJSONTabContent tab={tab} />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <ResHeadersTabContent
                renderKeyValueLists={renderKeyValueLists}
                APIRequestDataMap={APIRequestDataMap}
                tab={tab}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </>
  );
}
