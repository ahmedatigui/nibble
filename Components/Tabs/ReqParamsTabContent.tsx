// Components
import { Box } from "@radix-ui/themes";

// Utils
import { keyValueAtomType } from "@/utils/types";

export default function ReqParamsTabContent({
  renderedParamsKeyValueList,
  renderKeyValueLists,
  configParams,
}: {
  renderedParamsKeyValueList: JSX.Element[] | null;
  renderKeyValueLists: Function;
  configParams: keyValueAtomType[];
}) {
  return (
    <Box className="keyValueListContainer">
      {renderedParamsKeyValueList ??
        renderKeyValueLists("params", configParams)}
    </Box>
  );
}
