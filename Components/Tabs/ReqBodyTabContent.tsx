import { useAtom } from "jotai";
import { produce } from "immer";
import { v4 as uuidV4 } from "uuid";

// Components
import { Editor } from "@/Components/RequestEditor";
import { Select, Box } from "@radix-ui/themes";

// Utils
import { APIRequestDataMapAtom } from "@/utils/atoms";
import { keyValueAtomType } from "@/utils/types";
import { getContentType, getLanguageFromMimeType } from "@/utils/helpers";

export default function ReqBodyTabContent({ tab }: { tab: string }) {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );

  const HTTP_verbs = ["json", "yaml", "html", "xml", "text"];
  const options = HTTP_verbs.map((verb) => {
    return { label: verb, value: verb };
  });
  const contentType = APIRequestDataMap[tab].request.headers.findIndex(
    (item: keyValueAtomType, i: number) => item.key === "Content-Type",
  );

  const handleOnValueChange = (lang: string) => {
    setAPIRequestDataMap(
      produce(APIRequestDataMap, (draftState) => {
        const ind = draftState[tab].request.headers.findIndex(
          (item: keyValueAtomType, i: number) => item.key === "Content-Type",
        );
        console.info("IND: ", ind);

        if (ind >= 0) {
          draftState[tab].request.headers[ind].value = getContentType(lang);
        } else {
          draftState[tab].request.headers.push({
            id: uuidV4(),
            key: "Content-Type",
            value: getContentType(lang),
            checked: true,
          });
        }
      }),
    );
  };

  return (
    <Box className="req-body-container">
      <Select.Root
        defaultValue={getLanguageFromMimeType(
          APIRequestDataMap[tab].request.headers[contentType]?.value ??
            "application/json",
        )}
        onValueChange={(value: string) => handleOnValueChange(value)}
      >
        <Select.Trigger
          className="select-component SelectTrigger toggle"
          aria-label="Food"
        />

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
      <Box className="playground-container keyValueListContainer">
        <Editor tab={tab} />
      </Box>
    </Box>
  );
}
