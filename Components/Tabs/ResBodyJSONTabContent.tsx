import { useAtom } from "jotai";

// Components
import Editor from "@/Components/Editor";
import { Grid } from "@radix-ui/themes";

// Utils
import { httpResponseConfigAtom } from "@/utils/atoms";

export default function ResBodyJSONTabContent() {
  const [httpResponseConfig, setHttpResponseConfig] = useAtom(
    httpResponseConfigAtom,
  );
  return (
    <Grid columns="1" rows="1">
      {httpResponseConfig.status === "hasData" ? (
        <Editor
          lang="json"
          isLight={true}
          isReadOnly={true}
          initValue={`${JSON.stringify(httpResponseConfig.data, null, "\n")}`}
        />
      ) : (
        `${httpResponseConfig.error}` ?? `${httpResponseConfig.status}`
      )}
    </Grid>
  );
}
