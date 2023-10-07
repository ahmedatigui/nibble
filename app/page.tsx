'use client';

import { useAtom } from 'jotai';

// Utils
import createApiRequestFunction from '@/utils/restApi';
import { httpRequestConfigAtom, httpResponseConfigAtom } from '../utils/atoms';

// Hooks
import { useRestApi } from '@/hooks/useRestApi';

// Components
import UnstyledSelectControlled from '../Components/Select';
import { Button, InputBase } from '@mui/material-next';
import * as Tabs from '@radix-ui/react-tabs';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';

// Icons
import Send from '@mui/icons-material/Send';
import { useEffect } from 'react';

export default function Home() {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom
  );
  const [httpResponseConfig, setHttpResponseConfig] = useAtom(
    httpResponseConfigAtom
  );

  useEffect(() => console.log(httpRequestConfig), [httpRequestConfig]);

  async function handleSubmit() {
    try {
      setHttpResponseConfig((prev) => ({ ...prev, status: 'loading' }));
      const response: any = await createApiRequestFunction({
        apiURL: 'https://jsonplaceholder.typicode.com/users',
        httpMethod: 'GET',
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
              <UnstyledSelectControlled
                setHttpRequestConfig={setHttpRequestConfig}
              />
              <InputBase
                className="input"
                defaultValue="https://jsonplaceholder.typicode.com/users"
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
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
                    <div className="keyValueListRow">
                      <div className="keyValueListInput">
                        <input className="key" id="key" placeholder="Key" />
                      </div>
                      <div className="keyValueListInput">
                        <input
                          className="keyValueListInput value"
                          id="value"
                          placeholder="Value"
                        />
                      </div>
                      <div className="keyValueListCheckBox">
                        <Checkbox.Root
                          className="CheckboxRoot"
                          defaultChecked
                          id="c1"
                        >
                          <Checkbox.Indicator className="CheckboxIndicator">
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                      <div className="keyValueListButton">
                        <button>
                          <span>
                            <TrashIcon />
                          </span>
                        </button>
                      </div>
                    </div>
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
                      {httpResponseConfig.status === 'hasData'
                        ? `${JSON.stringify(
                            httpResponseConfig.data,
                            null,
                            '\n'
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
