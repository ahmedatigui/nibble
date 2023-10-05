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
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';

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
              <UnstyledSelectControlled setHttpRequestConfig={setHttpRequestConfig} />
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
              <Tabs defaultValue={1} className="tabs">
                <TabsList className="tabs-list">
                  <Tab value={1} className="tab">
                    One
                  </Tab>
                  <Tab value={2} className="tab">
                    Two
                  </Tab>
                  <Tab value={3} className="tab">
                    Three
                  </Tab>
                </TabsList>
                <TabPanel value={1} className="tab-panel">
                  First page
                </TabPanel>
                <TabPanel value={2} className="tab-panel">
                  Second page
                </TabPanel>
                <TabPanel value={3} className="tab-panel">
                  Third page
                </TabPanel>
              </Tabs>
            </div>
            <div className="panel | bg-surface-container large-rounding">
              <Tabs defaultValue={1} className="tabs">
                <TabsList className="tabs-list">
                  <Tab value={1} className="tab">
                    One
                  </Tab>
                  <Tab value={2} className="tab">
                    Two
                  </Tab>
                  <Tab value={3} className="tab">
                    Three
                  </Tab>
                </TabsList>
                <TabPanel value={1} className="tab-panel">
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
                </TabPanel>
                <TabPanel value={2} className="tab-panel">
                  Second page
                </TabPanel>
                <TabPanel value={3} className="tab-panel">
                  Third page
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
