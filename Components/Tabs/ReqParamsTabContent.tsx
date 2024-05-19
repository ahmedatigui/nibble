// Components
import { Box } from "@radix-ui/themes";

// Utils
import { keyValueAtomType, APIRequestDataMapType } from "@/utils/types";

export default function ReqParamsTabContent({
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
        "params",
        APIRequestDataMap[`${tab}`].request.params,
      )}
    </Box>
  );
}
