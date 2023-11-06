// Components
import { Box } from "@radix-ui/themes";

// Utils
import { keyValueAtomType, APIRequestDataMapType } from "@/utils/types";

export default function ReqParamsTabContent({
  renderedParamsKeyValueList,
  renderKeyValueLists,
  APIRequestDataMap,
  tab,
}: {
  renderedParamsKeyValueList: JSX.Element[] | null;
  renderKeyValueLists: Function;
  APIRequestDataMap: APIRequestDataMapType;
  tab: string;
}) {
  return (
    <Box className="keyValueListContainer">
      {renderedParamsKeyValueList ??
        renderKeyValueLists(
          "params",
          APIRequestDataMap[`${tab}`].request.params,
        )}
    </Box>
  );
}
