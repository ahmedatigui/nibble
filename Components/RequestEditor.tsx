import { useState, useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { produce } from "immer";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { yaml } from "@codemirror/lang-yaml";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";

// Utils
import {
  httpRequestConfigAtom,
  configHeadersAtom,
  APIRequestDataMapAtom,
} from "@/utils/atoms";
import { keyValueAtomType } from "@/utils/types";
import { getLanguageFromMimeType } from "@/utils/helpers";

export function Editor({ tab }: { tab: string }) {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const [value, setValue] = useState(APIRequestDataMap[tab].request.body);
  const [lang, setLang] = useState<string>();

  const isLight = APIRequestDataMap[tab].style.theme === "light";

  useEffect((): void => {
    const ind = APIRequestDataMap[tab].request.headers.findIndex(
      (item: keyValueAtomType, i: number) => item.key === "Content-Type",
    );
    console.log("INDE", ind);
    if (ind >= 0) {
      setLang(
        getLanguageFromMimeType(
          APIRequestDataMap[tab].request.headers[ind].value,
        ),
      );
    } else {
      setLang("json");
    }
  }, [APIRequestDataMap[tab].request.headers]);

  const onChange = useCallback((val: string) => {
    setValue(val);

    setAPIRequestDataMap(
      produce((draft) => {
        draft[tab].request.body = val;
      }),
    );
  }, []);

  const getMode = (lang: string) => {
    switch (lang) {
      case "json":
        return json();
      case "yaml":
        return yaml();
      case "html":
        return html();
      case "xml":
        return xml();
      case "text":
        return [];
      default:
        return json();
    }
  };

  return (
    <div className="playground-panel">
      <CodeMirror
        className="cm-outer-container"
        value={value}
        readOnly={false}
        //height="100%"
        theme={isLight ? solarizedLight : solarizedDark}
        extensions={[getMode(lang!)]}
        onChange={onChange}
      />
    </div>
  );
}
