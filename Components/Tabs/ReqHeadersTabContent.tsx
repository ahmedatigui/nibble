// Components
import { Box } from "@radix-ui/themes";

// Utils
import { keyValueAtomType, APIRequestDataMapType } from "@/utils/types";

export default function ReqHeadersTabContent({
  renderedHeadersKeyValueList,
  renderKeyValueLists,
  APIRequestDataMap,
  tab,
}: {
  renderedHeadersKeyValueList: JSX.Element[] | null;
  renderKeyValueLists: Function;
  APIRequestDataMap: APIRequestDataMapType;
  tab: string;
}) {
  return (
    <Box className="keyValueListContainer">
      {renderedHeadersKeyValueList ??
        renderKeyValueLists(
          "headers",
          APIRequestDataMap[`${tab}`].request.headers,
        )}
    </Box>
  );
}
