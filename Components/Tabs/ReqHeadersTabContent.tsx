// Components
import { Box } from "@radix-ui/themes";

// Utils
import { APIRequestDataMapType } from "@/utils/types";

export default function ReqHeadersTabContent({
  renderKeyValueLists,
  APIRequestDataMap,
  tab,
}: {
  renderKeyValueLists: Function;
  APIRequestDataMap: APIRequestDataMapType;
  tab: string;
}) {
  return (
    <Box className="keyValueListContainer">
      {renderKeyValueLists(
        "headers",
        APIRequestDataMap[`${tab}`].request.headers,
      )}
    </Box>
  );
}
