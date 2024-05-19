"use client";

import { useEffect } from "react";
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

    let startTime = 0;
    try {
      setAPIRequestDataMap(
        produce((draft) => {
          draft[tab].response.httpResponse.status = "loading";
        }),
      );

      startTime = performance.now();
      // console.log("APIRequestDataMap: ", APIRequestDataMap);
      const response: any = await createApiRequestFunction({
        apiURL: APIRequestDataMap[tab].url,
        httpMethod: APIRequestDataMap[tab].method,
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
      <Grid columns="1fr auto" gap="4">
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
          <Button size="3" onClick={() => handleSubmit()}>
            <PaperPlaneIcon />
          </Button>
        </Grid>
        <Flex direction="row" justify="between" align="center" gap="2" px="4">
          <Text size="3" align="center">
            {APIRequestDataMap[tab].response.statusCode ?? "-"}
          </Text>
          <Text size="3" align="center">
            {" | "}
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
            {APIRequestDataMap[tab].response.httpResponse.status === "hasData"
              ? `${APIRequestDataMap[tab].timing / 1000}s`
              : "-"}
          </Text>
        </Flex>
      </Grid>
      <Grid columns="1fr 1fr" gap="4">
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
      </Grid>
    </>
  );
}
