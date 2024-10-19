// Components
import { Editor } from "@/Components/ResponseEditor";
import { Box } from "@radix-ui/themes";

export default function ResBodyJSONTabContent({ tab }: { tab: string }) {
  return (
    <Box className="playground-container keyValueListContainer">
      <Editor tab={tab} />
    </Box>
  );
}
