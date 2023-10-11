import React, { use } from "react";
import { useAtom } from "jotai";
import { httpRequestConfigAtom } from "@/utils/atoms";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectDemo = () => {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom
  );
  return (
    <Select.Root
      defaultValue="GET"
      onValueChange={(value: string) =>
        setHttpRequestConfig((prev) => ({ ...prev, httpMethod: value }))
      }
    >
      <Select.Trigger className="SelectTrigger toggle" aria-label="Food">
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport listbox">
            {/* <Select.Group> */}
            {/* <Select.Label className="SelectLabel">Fruits</Select.Label> */}
            {options.map((verb) => (
              <Select.Item
                className="SelectItem"
                value={verb.value}
                key={verb.value}
              >
                <Select.ItemText>{verb.label}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
            {/* </Select.Group> */}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectDemo;

const HTTP_verbs = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
const options = HTTP_verbs.map((verb) => {
  return { label: verb, value: verb };
});