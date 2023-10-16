'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

// Utils
import createApiRequestFunction from '@/utils/restApi';
import {
  httpRequestConfigAtom,
  httpResponseConfigAtom,
  configParamsAtom,
} from '../utils/atoms';
import { paramsAtomType } from '@/utils/types';

// Components
import KeyValueList from '@/Components/KeyValueList';
import SelectDemo from '../Components/Select';
import { Box, TextField, Button, Text, Tabs, Code, Flex, Grid, ScrollArea } from '@radix-ui/themes';

// Icons
import { PaperPlaneIcon} from '@radix-ui/react-icons';

export default function Home() {
  const [rKVL, setRKVL] = useState<JSX.Element[] | null>(null);
  const [configParams, setConfigParams] = useAtom(configParamsAtom);
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom
  );
  const [httpResponseConfig, setHttpResponseConfig] = useAtom(
    httpResponseConfigAtom
  );

  async function handleSubmit() {
    try {
      setHttpResponseConfig((prev) => ({ ...prev, status: 'loading' }));
      console.log(httpRequestConfig);
      const response: any = await createApiRequestFunction({
        apiURL: httpRequestConfig.apiURL,
        httpMethod: httpRequestConfig.httpMethod,
      });

      const data: any = response.data;
      setHttpResponseConfig((prev) => ({
        ...prev,
        status: 'hasData',
        data: data,
      }));
      console.log(httpResponseConfig);
      console.log(response, data);
    } catch (error) {
      setHttpResponseConfig((prev) => ({
        ...prev,
        status: 'hasError',
        error: error,
      }));
      console.log(httpResponseConfig);
    }
  }

  const renderKeyValueLists = (): JSX.Element[] =>
    configParams.map((list: paramsAtomType, ind: number) => (
      <KeyValueList key={list.id} order={ind} />
    ));

  useEffect(() => {
    console.log(configParams);
    setRKVL(renderKeyValueLists());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configParams]);

  useEffect(() => console.log(httpRequestConfig), [httpRequestConfig]);

  return (
    <Grid rows="auto 1fr" gap="4" className="h-screen overflow-hidden">
      <Box p="4">Nibble</Box>
      <Grid columns="auto 1fr" gap="4">
        <Box>
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
            <li>4.</li>
          </ul>
          <ul>
            <li>A.</li>
            <li>B.</li>
            <li>C.</li>
            <li>D.</li>
          </ul>
        </Box>
        <Grid rows="auto 1fr" gap="4">
          <Grid columns="1fr auto" gap="4">
            <Grid columns="auto 1fr auto">
              <SelectDemo />
              <TextField.Root>
                <TextField.Input
                  id="Url"
                  defaultValue="https://jsonplaceholder.typicode.com/users"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHttpRequestConfig((prev) => ({
                      ...prev,
                      apiURL: e.target.value,
                    }))
                  }
                />
              </TextField.Root>
              <Button onClick={() => handleSubmit()}>
                <PaperPlaneIcon />
              </Button>
            </Grid>
            <Flex direction="row" justify="between" align="center" gap="2" px="4">
              <Text size="3" align="center">200 OK</Text>
              <Text size="3" align="center">75ms</Text>
              <Text size="3" align="center">2.14kb</Text>
            </Flex>
          </Grid>
          <Grid columns="1fr 1fr" gap="4">
            <Box>
              <Tabs.Root defaultValue="tab1">
                <Tabs.List
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger value="tab1">
                    Params
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab2">
                    Headers
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3">
                    Auth
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab4">
                    Body
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">
                <ScrollArea type="always" scrollbars="vertical">
                  <div className="keyValueListContainer">
                    {rKVL ?? renderKeyValueLists()}
                  </div>
                  </ScrollArea>
                </Tabs.Content>
                <Tabs.Content value="tab2">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
                <Tabs.Content value="tab3">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
                <Tabs.Content value="tab4">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
              </Tabs.Root>
            </Box>
            <Box>
              <Tabs.Root defaultValue="tab1">
                <Tabs.List
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger value="tab1">
                    JSON
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab2">
                    Raw
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab3">
                    Headers
                  </Tabs.Trigger>
                  <Tabs.Trigger value="tab4">
                    Stats
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">
                    <Box p="4">
                  <ScrollArea type="always" scrollbars="both" className="h-screen overflow-scroll">
                      <Code>
                        {httpResponseConfig.status === 'hasData'
                          ? `${JSON.stringify(
                              httpResponseConfig.data,
                              null,
                              '\n'
                            )}`
                          : `${httpResponseConfig.error}` ??
                            `${httpResponseConfig.status}`}
                      </Code>
                  </ScrollArea>
                    </Box>
                </Tabs.Content>
                <Tabs.Content value="tab2">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
                <Tabs.Content value="tab3">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
                <Tabs.Content value="tab4">
                  <Text>
                    Change your password here. After saving, you willl be logged out.
                  </Text>
                </Tabs.Content>
              </Tabs.Root>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
