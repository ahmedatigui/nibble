"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Components
import UseSelect from "../Components/Select";
import { Button, InputBase } from "@mui/material-next";
import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";

// Icons
import Send from "@mui/icons-material/Send";
import { useRestApi } from "@/hooks/useRestApi";
import createApiRequestFunction from "@/utils/restApi";

export default function Home() {
  // const { data, isLoading, isError, error } = useRestApi({url: 'https://jsonplaceholder.typicode.com/users', method: 'GET'});
  // const response = await useRestApi({apiURL: 'https://jsonplaceholder.typicode.com/users', httpMethod: 'GET'});

  // if (isLoading) {
  //   console.log('Loading...');
  //   return <p style={{ textAlign: 'center' }}>loading...</p>;
  // }
  // if (isError) {
  //   console.log({ error });
  //   return <p style={{ textAlign: 'center' }}>Error</p>;
  // }
  async function handleSubmit() {
    const response = await createApiRequestFunction({
      apiURL: "https://jsonplaceholder.typicode.com/users",
      httpMethod: "GET",
    });
    console.log(response);
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
              {UseSelect()}
              <InputBase
                className="input"
                placeholder="https://www.page.com/api/"
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
          </div>
        </section>
      </main>
      {/* <section>
        {data?.map((user) => (
          <div
            key={user.id}
            style={{ border: '1px solid #ccc', textAlign: 'center' }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ width: 180, height: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </section> */}
    </>
  );
}
