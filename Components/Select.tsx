import { useAtom } from "jotai";
import { produce } from "immer";

// Components
import { Select } from "@radix-ui/themes";

// Utils
import { httpRequestConfigAtom, APIRequestDataMapAtom } from "@/utils/atoms";

const SelectDemo = ({ tab }: { tab: string }) => {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom,
  );
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );

  return (
    <Select.Root
      size="3"
      defaultValue="GET"
      onValueChange={(value: string) =>
        setAPIRequestDataMap(
          produce((draft) => {
            draft[tab].method = value;
          }),
        )
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
