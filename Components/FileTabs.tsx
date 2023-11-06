import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";

// Components
import ApiRequestPanel from "./ApiRequestPanel";
import { Grid, Tabs } from "@radix-ui/themes";

// Utils
import { currentActiveLeafAtom, currentLeafsAtom } from "../utils/atoms";
import { data } from "../utils/data";
import { FileManagerDataType } from "../utils/types";

export default function FileTabs() {
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );

  const [currentFocusedLeaf, setCurrentFocusedLeaf] = useAtom(currentLeafsAtom);

  const [tab, setTab] = useState(currentActiveLeaf);
  const [tabList, setTabList] = useState<React.JSX.Element[]>();

  const renderFocusedTabsTrigger = () =>
    currentFocusedLeaf.map((leaf: FileManagerDataType) => (
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
    ));

  const renderFocusedTabsContent = () =>
    currentFocusedLeaf.map((leaf) => (
      <Tabs.Content className="TabsContent" value={leaf.id} key={leaf.id}>
        Content: {leaf.name}
      </Tabs.Content>
    ));

  useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    setTabList(trigger);
    console.log("TABS_FOCUSED: ", currentFocusedLeaf);
  }, [currentFocusedLeaf]);

  // useEffect(() => setActiveLeaf(currentActiveLeaf), [currentActiveLeaf]);

  return (
    <Grid rows="auto auto 1fr" gap="4">
      <Tabs.Root
        className="TabsRoot"
        value={currentActiveLeaf}
        onValueChange={(value) => {
          setTab(value);
          console.info("TABTRIGGER: ", value);
        }}
      >
        <Tabs.List className="TabsList" aria-label="Manage your account">
          {tabList}
        </Tabs.List>
        <Tabs.Content className="TabsContent" value={tab}>
          <ApiRequestPanel tab={tab} />
        </Tabs.Content>
      </Tabs.Root>
    </Grid>
  );
}
