import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";

// Components
import ApiRequestPanel from "./ApiRequestPanel";
import { Grid, Tabs } from "@radix-ui/themes";

// Utils
import { currentActiveLeafAtom, currentFocusedLeafAtom } from "../utils/atoms";
import { data } from "../utils/data";
import { FileManagerDataType } from "../utils/types";

export default function FileTabs() {
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );

  const [currentFocusedLeaf, setCurrentFocusedLeaf] = useAtom(
    currentFocusedLeafAtom,
  );
  const [activeLeaf, setActiveLeaf] = useState<string>();
  const [focusedLeaf, setFocusedLeaf] = useState(currentFocusedLeaf);
  const [tab, setTab] = useState(activeLeaf);

  const renderFocusedTabsTrigger = () =>
    currentFocusedLeaf.map((leaf: FileManagerDataType) => (
      <Tabs.Trigger
        className="TabsTrigger"
        value={`tab-${leaf.id}`}
        key={leaf.id}
        onClick={() => {
          setActiveLeaf(`tab-${leaf.id}`);
          setCurrentActiveLeaf(`tab-${leaf.id}`);
        }}
      >
        {leaf.name}
      </Tabs.Trigger>
    ));

  const renderFocusedTabsContent = () =>
    currentFocusedLeaf.map((leaf) => (
      <Tabs.Content
        className="TabsContent"
        value={`tab-${leaf.id}`}
        key={leaf.id}
      >
        Content: {leaf.name}
      </Tabs.Content>
    ));

  useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    const content = renderFocusedTabsContent();
    setFocusedLeaf({
      trigger: trigger,
      content: content,
    });
    setActiveLeaf(currentActiveLeaf);
  }, []);

  useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    const content = renderFocusedTabsContent();
    setFocusedLeaf({
      trigger: trigger,
      content: content,
    });
    console.log("TABS_FOCUSED: ", currentFocusedLeaf);
  }, [currentFocusedLeaf]);

  useEffect(() => setActiveLeaf(currentActiveLeaf), [currentActiveLeaf]);

  return (
    <Grid rows="auto auto 1fr" gap="4">
      <Tabs.Root
        className="TabsRoot"
        value={activeLeaf}
        onValueChange={(value) => setTab(value)}
      >
        <Tabs.List className="TabsList" aria-label="Manage your account">
          {focusedLeaf.trigger}
        </Tabs.List>
        <ApiRequestPanel tab={tab} />
      </Tabs.Root>
    </Grid>
  );
}
