import React from "react";
import { useAtom } from "jotai";

// Components
import ApiRequestPanel from "./ApiRequestPanel";
import * as Tabs from "@radix-ui/react-tabs";
import { Grid } from "@radix-ui/themes";

// Utils
import { currentActiveLeafAtom, currentFocusedLeafAtom } from "../utils/atoms";
import { data } from "../utils/data";

const TabsDemo = () => {
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom
  );

  const [currentFocusedLeaf, setCurrentFocusedLeaf] = useAtom(
    currentFocusedLeafAtom
  );
  const [activeLeaf, setActiveLeaf] = React.useState();
  const [focusedLeaf, setFocusedLeaf] = React.useState(currentFocusedLeaf);

  const renderFocusedTabsTrigger = () =>
    currentFocusedLeaf.map((leaf) => (
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

  React.useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    const content = renderFocusedTabsContent();
    setFocusedLeaf({
      trigger: trigger,
      content: content
    });
    setActiveLeaf(currentActiveLeaf);
  }, []);

  React.useEffect(() => {
    const trigger = renderFocusedTabsTrigger();
    const content = renderFocusedTabsContent();
    setFocusedLeaf({
      trigger: trigger,
      content: content
    });
    console.log("TABS_FOCUSED: ", currentFocusedLeaf);
  }, [currentFocusedLeaf]);

  React.useEffect(() => setActiveLeaf(currentActiveLeaf), [currentActiveLeaf]);

  return (
    <Grid rows="auto auto 1fr" gap="4">
      <Tabs.Root className="TabsRoot" value={activeLeaf}>
        <Tabs.List className="TabsList" aria-label="Manage your account">
          {focusedLeaf.trigger}
        </Tabs.List>
        <ApiRequestPanel tab={tab} />
      </Tabs.Root>
    </Grid>
  );
};

export default TabsDemo;

