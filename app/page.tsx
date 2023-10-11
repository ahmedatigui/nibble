"use client";

import { useAtom } from "jotai";

// Utils
import createApiRequestFunction from "@/utils/restApi";
import {
  httpRequestConfigAtom,
  httpResponseConfigAtom,
  configParamsAtom,
} from "../utils/atoms";

// Components
import SelectDemo from "../Components/Select";
import { Button, InputBase } from "@mui/material-next";
import * as Tabs from "@radix-ui/react-tabs";

// Icons
import Send from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import KeyValueList from "@/Components/KeyValueList";
import { paramsAtomType } from "@/utils/types";

export default function Home() {
  const [rKVL, setRKVL] = useState<JSX.Element[] | null>(null);
  const [configParams, setConfigParams] = useAtom(configParamsAtom);
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom
  );
  const [httpResponseConfig, setHttpResponseConfig] = useAtom(
    httpResponseConfigAtom
  );

  useEffect(() => {
    console.log(configParams);
    setRKVL(renderKeyValueLists());
  }, [configParams]);

  useEffect(() => console.log(httpRequestConfig), [httpRequestConfig]);

  async function handleSubmit() {
    try {
      setHttpResponseConfig((prev) => ({ ...prev, status: "loading" }));
      console.log(httpRequestConfig);
      const response: any = await createApiRequestFunction({
        apiURL: httpRequestConfig.apiURL,
        httpMethod: httpRequestConfig.httpMethod,
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

  const renderKeyValueLists = (): JSX.Element[] =>
    configParams.map((list: paramsAtomType, ind: number) => (
      <KeyValueList key={list.id} order={ind} />
    ));

  return (
    <>
      <header className="nav | wrapper | bg-surface-container-low clr-on-surface">
        Nibble
      </header>
      <main className="main  | clr-on-surface">
        <aside className="sidebar | bg-surface-container large-rounding">
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
        </aside>
        <section>
          <div className="panel action-panel | bg-surface-container large-rounding padding-2">
            <div className="input-container | bg-surface-container-high">
              <SelectDemo />
              <InputBase
                className="input"
                defaultValue="https://jsonplaceholder.typicode.com/users"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHttpRequestConfig((prev) => ({
                    ...prev,
                    apiURL: e.target.value,
                  }))
                }
              />
              <Button className="button" onClick={() => handleSubmit()}>
                <Send />
              </Button>
            </div>
            <div className="status">
              <span>200 OK</span>
              <span>75ms</span>
              <span>2.14kb</span>
            </div>
          </div>
          <div className="panels">
            <div className="panel | bg-surface-container large-rounding">
              <Tabs.Root className="TabsRoot" defaultValue="tab1">
                <Tabs.List
                  className="TabsList"
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Params
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Headers
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab3">
                    Auth
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab4">
                    Body
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                  <div className="keyValueListContainer">
                    {rKVL ?? renderKeyValueLists()}
                  </div>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                  <p className="Text">
                    Change your password here. After saving, you willl be logged
                    out.
                  </p>
                </Tabs.Content>
              </Tabs.Root>
            </div>
            <div className="panel | bg-surface-container large-rounding">
              <Tabs.Root className="TabsRoot" defaultValue="tab1">
                <Tabs.List
                  className="TabsList"
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger className="TabsTrigger" value="tab1">
                    JSON
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Raw
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab3">
                    Headers
                  </Tabs.Trigger>
                  <Tabs.Trigger className="TabsTrigger" value="tab4">
                    Stats
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                  <p className="Text">
                    Make changes to your account here. Click save when you are
                    done.
                  </p>
                  <section className="response">
                    <pre>
                      {httpResponseConfig.status === "hasData"
                        ? `${JSON.stringify(
                            httpResponseConfig.data,
                            null,
                            "\n"
                          )}`
                        : `${httpResponseConfig.error}` ??
                          `${httpResponseConfig.status}`}
                    </pre>
                  </section>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                  <p className="Text">
                    Change your password here. After saving, willl be logged
                    out.
                  </p>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab3">
                  <p className="Text">
                    Change your password here. After saving, willl be logged
                    out.
                  </p>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab4">
                  <p className="Text">
                    Change your password here. After saving, willl be logged
                    out.
                  </p>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
