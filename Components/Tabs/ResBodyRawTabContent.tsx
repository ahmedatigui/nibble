import { useAtom } from "jotai";

// Components
import { Editor } from "@/Components/ResponseEditor";
import { Grid } from "@radix-ui/themes";

// Utils
import { APIRequestDataMapAtom } from "@/utils/atoms";

export default function ResBodyRawTabContent({ tab }: { tab: string }) {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  return (
    <Grid columns="1" rows="1">
      {APIRequestDataMap[tab].response.httpResponse.status === "hasData" ? (
        <Editor tab={tab} />
      ) : (
        `${APIRequestDataMap[tab].response.httpResponse.error}` ??
        `${APIRequestDataMap[tab].response.httpResponse.status}`
      )}
    </Grid>
  );
}
