// Components
import { Box } from "@radix-ui/themes";

// Utils
import { keyValueAtomType } from "@/utils/types";

export default function ReqHeadersTabContent({
  renderedHeadersKeyValueList,
  renderKeyValueLists,
  configHeaders,
}: {
  renderedHeadersKeyValueList: JSX.Element[] | null;
  renderKeyValueLists: Function;
  configHeaders: keyValueAtomType[];
}) {
  return (
    <Box className="keyValueListContainer">
      {renderedHeadersKeyValueList ??
        renderKeyValueLists("headers", configHeaders)}
    </Box>
  );
}
