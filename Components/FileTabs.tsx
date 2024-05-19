import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";

// Components
import ApiRequestPanel from "./ApiRequestPanel";
import { Grid, Tabs } from "@radix-ui/themes";

// Utils
import { currentActiveLeafAtom, currentLeafsAtom } from "../utils/atoms";

export default function FileTabs() {
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );

  const [currentLeafs, setCurrentLeafs] = useAtom(currentLeafsAtom);

  const [tab, setTab] = useState(currentActiveLeaf);
  const [tabList, setTabList] = useState<React.JSX.Element>();

  const renderFocusedTabsTrigger = () => {
    //console.log("RENDERFTL: ", currentActiveLeaf);
    return (
      <>
        <ApiRequestPanel tab={tab} />
        {/*<Tabs.Root
        className="TabsRoot"
        defaultValue={"tab-simple-tree-id-initial"}
        onValueChange={(value) => {
          setTab(value);
          console.info("TABTRIGGER: ", value);
        }}
      >
        <Tabs.List className="TabsList" aria-label="Manage your account">
          {currentLeafs.map((leaf: FileManagerDataType) => (
            <Tabs.Trigger
              className="TabsTrigger"
              value={leaf.id}
              key={leaf.id}
              onClick={() => {
                // setActiveLeaf(`tab-${leaf.id}`);
                setCurrentActiveLeaf(leaf.id);
              }}
            >
              {leaf.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content
          className="TabsContent"
          key={currentActiveLeaf}
          value={currentActiveLeaf}
        >
          <ApiRequestPanel tab={tab} />
            </Tabs.Content>*/}
        {/* {currentLeafs.map((leaf: FileManagerDataType) => (
          <Tabs.Content className="TabsContent" key={leaf.id} value={leaf.id}>
            <ApiRequestPanel tab={tab} />
          </Tabs.Content>
        ))} */}
        {/*</Tabs.Root>*/}
      </>
    );
  };

  const renderFocusedTabsContent = () =>
    currentLeafs.map((leaf) => (
      <Tabs.Content className="TabsContent" value={leaf.id} key={leaf.id}>
        Content: {leaf.name}
      </Tabs.Content>
    ));

  useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    setTabList(trigger);
    console.log("TABS_FOCUSED: ", currentLeafs);
  }, [currentLeafs, currentActiveLeaf]);

  // useEffect(() => setActiveLeaf(currentActiveLeaf), [currentActiveLeaf]);

  return (
    <Grid rows="auto auto 1fr" gap="4">
      {tabList}
    </Grid>
  );
}
