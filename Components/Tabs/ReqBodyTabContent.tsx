import { useState } from "react";
import { useAtom } from "jotai";

// Components
import Editor from "../Editor";
import { Select, Grid } from "@radix-ui/themes";

// Utils
import { httpRequestConfigAtom, configHeadersAtom } from "@/utils/atoms";

export default function ReqBodyTabContent({ tab }: { tab: string }) {
  const [isLight, setLight] = useState(true);
  const [lang, setLang] = useState("json");
  const [editorValue, setEditorValue] = useState(null);

  const HTTP_verbs = ["json", "yaml", "html", "xml", "text"];
  const options = HTTP_verbs.map((verb) => {
    return { label: verb, value: verb };
  });

  return (
    <>
      {/* <button onClick={() => setLight(!isLight)}>Toggle theme</button> */}
      <Select.Root
        defaultValue="json"
        onValueChange={(value: string) => setLang(value)}
      >
        <Select.Trigger className="SelectTrigger toggle" aria-label="Food" />

        <Select.Content className="SelectContent listbox">
          {options.map((verb) => (
            <Select.Item
              className="SelectItem"
              value={verb.value}
              key={verb.value}
            >
              {verb.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Grid columns="1" rows="1" className="editors w-full">
        <Editor
          lang={lang}
          isReadOnly={false}
          isLight={isLight}
          setEditorValue={setEditorValue}
          tab={tab}
        />
      </Grid>
    </>
  );
}
