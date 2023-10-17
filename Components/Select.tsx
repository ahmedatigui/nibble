import { useAtom } from "jotai";
import { httpRequestConfigAtom } from "@/utils/atoms";

import { Select } from "@radix-ui/themes";

const SelectDemo = () => {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom,
  );
  return (
    <Select.Root
      defaultValue="GET"
      onValueChange={(value: string) =>
        setHttpRequestConfig((prev) => ({ ...prev, httpMethod: value }))
      }
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
  );
};

export default SelectDemo;

const HTTP_verbs = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
const options = HTTP_verbs.map((verb) => {
  return { label: verb, value: verb };
});
